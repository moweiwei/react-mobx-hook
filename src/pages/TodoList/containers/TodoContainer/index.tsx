import React, { useEffect, useCallback, useState } from 'react'
import { useObserver } from 'mobx-react'
import { useLocation, useHistory } from 'react-router'
import Header from 'pages/TodoList/components/Header'
import Footer from 'pages/TodoList/components/Footer'
import { TodoList } from 'pages/TodoList/components/TodoList'
import { TodoModel } from 'pages/TodoList/models'
import { useTodoStore } from 'stores/TodoStore'
import { TODO_FILTER_LOCATION_HASH, TodoFilter } from 'pages/TodoList/constants'
import style from './style.css'

export const TodoContainer = () => {
  const todoStore = useTodoStore([
    new TodoModel('Use MobX'),
    new TodoModel('Use React'),
  ])
  const history = useHistory()
  const location = useLocation()
  const [filter, setFilter] = useState(TodoFilter.ALL)

  // location change callback
  useEffect(() => {
    const nextFilter = Object.keys(TODO_FILTER_LOCATION_HASH)
      .map((key) => Number(key) as TodoFilter)
      .find((item) => TODO_FILTER_LOCATION_HASH[item] === location.hash)
    setFilter(nextFilter ?? TodoFilter.ALL)
  }, [location.hash, setFilter])

  // filter change callback
  const handleFilterChange = useCallback(
    (nextFilter: TodoFilter) => {
      setFilter(nextFilter)
      const nextHash = TODO_FILTER_LOCATION_HASH[nextFilter]
      history.replace(nextHash)
    },
    [history, setFilter],
  )

  const itemsToDisplay =
    // eslint-disable-next-line no-nested-ternary
    filter === TodoFilter.ALL
      ? todoStore.todos
      : filter === TodoFilter.ACTIVE
      ? todoStore.activeTodos
      : todoStore.completedTodos

  return useObserver(() => {
    return (
      <div className={style.normal}>
        <Header addTodo={todoStore.addTodo} />
        <TodoList
          todos={itemsToDisplay}
          completeAll={todoStore.completeAll}
          deleteTodo={todoStore.deleteTodo}
          editTodo={todoStore.editTodo}
        />
        <Footer
          filter={filter}
          activeCount={todoStore.activeTodos.length}
          completedCount={todoStore.completedTodos.length}
          onClearCompleted={todoStore.clearCompleted}
          onChangeFilter={handleFilterChange}
        />
        {/* <Button type="primary">Button</Button> */}
      </div>
    )
  })
}
