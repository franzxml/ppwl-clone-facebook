export const routePaths = {
  login: '/auth',
  register: '/auth/register',
  home: '/',
  postDetail: '/posts/:postId',
  notifications: '/notifications',
  profile: '/profile',
  users: '/users',
} as const

export { LoginPage, RegisterPage } from './auth'
export { HomePage } from './home'
export { NotificationsPage } from './notifications'
export { PostDetailPage } from './posts'
export { ProfilePage } from './profile'
export { UsersPage } from './users'
