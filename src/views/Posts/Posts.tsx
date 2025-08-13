import { Button, Card, CardContent, Container, Stack, TableCell, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editPostId, setEditPostId] = useState<number | null>(null)

  useEffect(() => {
    axios.get('/api/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  const handleAddPost = () => {
    if (!title || !content) {
      alert('Title and content cannot be empty');
      return;
    }

    const newPost: Post = {
      id: posts.length + 1, // Simple ID generation
      title,
      content
    }

    axios.post('/api/posts', newPost)
      .then(response => {
        setPosts(prevPosts => [...prevPosts, response.data]);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error('Error adding post:', error);
      });
  }

  const handleDeletePost = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }
    axios.delete(`/api/posts/${id}`)
      .then(() => {
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  }

  const handleEditPost = async (id: number) => {

   const postToEdit = posts.find((p) => p.id === id);
    if (!postToEdit) return;
    setEditPostId(id);
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
  }

    const handleUpdatePost = () => {
    if (!title || !content || editPostId === null) {
      alert('Title and content cannot be empty');
      return;
    }

    const updatedPost: Post = {
      id: editPostId,
      title,
      content
    }

    axios.put(`/api/posts/${editPostId}`, updatedPost)
      .then(response => {
        setPosts(prevPosts => prevPosts.map(post => post.id === editPostId ? response.data : post));
        setEditPostId(null);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Posts
      </Typography>
      <Stack spacing={2} sx={{ mb: 4 }}>
        <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          label="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <Button variant="contained" onClick={handleAddPost}>
          Add Post
        </Button>
      </Stack>

      {
        editPostId && (
          <form>
            <TextField
              label="Edit Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              fullWidth
            />
            <TextField
              label="Edit Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
            <Button variant="contained" onClick={() => handleUpdatePost()}>
              Save Changes
            </Button>
          </form>
        )
      }

      <Stack spacing={2}>
        {posts.map(post => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.content}</Typography>

              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant='outlined' onClick={() => handleEditPost(post.id)}>
                    Edit
                  </Button>
                  <Button variant='outlined' onClick={() => handleDeletePost(post.id)}>
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default Posts;

function setItems(arg0: any) {
  throw new Error('Function not implemented.');
}
