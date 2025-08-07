import { http, HttpResponse } from 'msw'
 
import meJSON from './data/me.json'


export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('https://raw.githubusercontent.com/hidaytrahman/hidaytrahman/main/me.json', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.json(meJSON)
  }),

  // http.get('/api/auth/profile', () => {
  //   return HttpResponse.json(meJSON)
  // }),
  // http.get('/api/users' , () => {
  //   return HttpResponse.json({
  //     users: [
  //       {
  //         id: 1,
  //         username: 'john_doe',
  //         bloodGroup: 'A+',
  //         age: 30,
  //         email: 'john_doe@example.com',
  //       },
  //     ],
  //   })
  // })
]