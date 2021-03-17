// import { lazy } from 'react'
import Todo from 'pages/TodoList/App.tsx'

// const Todo = lazy(
//   () => import(/* webpackChunkName: "todo" */ 'pages/TodoList/App.tsx'),
// )

export default [
  { path: `/todo`, component: Todo, exact: true },
  // {
  //   component: BaseLayout,
  //   routes: [
  //     {
  //       path: '*',
  //       component: Todo,
  //     },
  //   ],
  // },
  {
    path: '*',
    component: Todo,
  },
]
