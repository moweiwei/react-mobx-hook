import { TodoContainer } from 'pages/TodoList/containers'

export default [
  {
    path: '/',
    redirect: { from: '/', to: '/todo', exact: true },
  },
  { path: '/todo', component: TodoContainer, exact: true },
]
