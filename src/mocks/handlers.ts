import { http, HttpResponse } from 'msw'
import meJSON from './data/me.json'
import post from './data/posts.json'


export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://raw.githubusercontent.com/hidaytrahman/hidaytrahman/main/me.json', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(meJSON)
  }),
  
  http.get('/api/posts' , () => {
    return HttpResponse.json(post)
  }),

  http.delete('/api/posts/:id', ({params}) => {
    const idParam = Array.isArray(params.id) ? params.id[0] : params.id
    if (typeof idParam !== 'string') {
      return HttpResponse.json({ error: 'Invalid post id' }, { status: 400 })
    }
    const postId = parseInt(idParam, 10)
    const postIndex = post.findIndex(p => p.id == postId)
    if (postIndex === -1) {
      return HttpResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    post.splice(postIndex, 1)
    return HttpResponse.json({ message: 'Post deleted successfully' })
  }),

  http.put('/api/posts/:id', async ({params, request}) => {
    const idParam = Array.isArray(params.id) ? params.id[0] : params.id
    if (typeof idParam !== 'string') {
      return HttpResponse.json({ error: 'Invalid post id' }, { status: 400 })
    }
    const postId = parseInt(idParam, 10)
    const postIndex = post.findIndex(p => p.id == postId)
    if (postIndex === -1) {
      return HttpResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    const body = await request.json() as Record<string, any>
    post[postIndex] = { ...post[postIndex], ...body }
    return HttpResponse.json(post[postIndex])
  }),

  http.post('/api/posts', async ({request}) => {
    const body = await request.json() as Record<string, any>
    post.push({
      ...body, id: post.length + 1,
      title: '',
      content: ''
    })
    return HttpResponse.json(body)
  }),
]