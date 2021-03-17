import { TodoContainer } from 'pages/TodoList/containers/TodoContainer'

export default [
  {
    path: '/',
    redirect: { from: '/', to: '/todo', exact: true },
  },
  { path: '/todo', component: TodoContainer, exact: true },
]
