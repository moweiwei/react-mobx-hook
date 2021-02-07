import React, { useState } from 'react'
import classNames from 'classnames'
import { TodoTextInput } from 'app/components/TodoTextInput'
import { TodoModel } from 'app/models/TodoModel'
import style from './style.css'

export interface TodoActions {
  editTodo: (id: number, data: Partial<TodoModel>) => any
  deleteTodo: (id: number) => any
}

export interface TodoProps extends TodoActions {
  todo: TodoModel
}

export function TodoItem(props: TodoProps) {
  const [editing, setEditing] = useState(false)

  const { todo, deleteTodo, editTodo } = props

  const updateTodo = (data: Partial<TodoModel>) => {
    if (data.text !== undefined && data.text.trim().length === 0) {
      deleteTodo(todo.id)
    } else {
      editTodo(todo.id, data)
    }
    setEditing(false)
  }

  const handleToggleCheckbox = (e: React.SyntheticEvent<any>) => {
    const target = e.target as any
    if (
      target &&
      target.checked !== undefined &&
      target.checked !== todo.completed
    ) {
      updateTodo({ completed: target.checked })
    }
  }

  const handleDoubleClick = () => {
    setEditing(true)
  }

  const handleClickDeleteButton = () => {
    deleteTodo(todo.id)
  }

  const element = editing ? (
    <TodoTextInput
      text={todo.text}
      editing={editing}
      onSave={(text) => updateTodo({ text })}
    />
  ) : (
    <div className={style.view}>
      <input
        className={style.toggle}
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleCheckbox}
      />

      <label onDoubleClick={handleDoubleClick}>{todo.text}</label>

      <button className={style.destroy} onClick={handleClickDeleteButton} />
    </div>
  )

  const classes = classNames({
    [style.completed]: todo.completed,
    [style.editing]: editing,
    [style.normal]: !editing,
  })

  return <li className={classes}>{element}</li>
}
