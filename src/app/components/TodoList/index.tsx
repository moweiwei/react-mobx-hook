import React from 'react'
import { TodoItem, TodoActions } from 'app/components/TodoItem'
import { TodoModel } from 'app/models/TodoModel'
import style from './style.css'

export interface TodoListProps extends TodoActions {
  todos: TodoModel[]
  completeAll: () => any
}

export function TodoList(props: TodoListProps) {
  const { todos, ...actions } = props

  const handleToggleAll = (e: React.SyntheticEvent<any>) => {
    e.preventDefault()
    props.completeAll()
  }

  const completedCount = todos.length
  const renderToggleAll =
    todos.length > 0 ? (
      <input
        className={style.toggleAll}
        type="checkbox"
        checked={completedCount === todos.length}
        onChange={handleToggleAll}
      />
    ) : null

  return (
    <section className={style.main}>
      {renderToggleAll}
      <ul className={style.normal}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...actions} />
        ))}
      </ul>
    </section>
  )
}
