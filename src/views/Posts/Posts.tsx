import { useAuth } from '@/store/AuthProvider';
import { UserProfileType } from '@/types';
import { Alert, Box, Button, Card, CardContent, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
}

const  Posts = () => {
  const [posts , setPosts] = useState<Post[]>([]);
   const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

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

    axios.post('/api/posts', { title, content })
      .then(response => {
        setPosts(prevPosts => [...prevPosts, response.data]);
        setTitle('');
        setContent('');
      })
      .catch(error => {
        console.error('Error adding post:', error);
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

      <Stack spacing={2}>
        {posts.map(post => (
          <Card key={post.id}>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography variant="body2">{post.content}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}

export default Posts;
 