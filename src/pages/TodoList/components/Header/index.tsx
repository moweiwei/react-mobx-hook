import React from 'react'
import { TodoTextInput } from 'pages/TodoList/components/TodoTextInput'
import { TodoModel } from 'pages/TodoList/models/TodoModel'

export interface HeaderProps {
  addTodo: (todo: Partial<TodoModel>) => any
}

export default function Header({ addTodo }: HeaderProps) {
  const handleSave = (text) => {
    if (text.length) {
      addTodo({ text })
    }
  }
  return (
    <header>
      <h1>Todos</h1>
      <TodoTextInput
        newTodo
        onSave={handleSave}
        placeholder="What needs to be done?"
      />
    </header>
  )
}
