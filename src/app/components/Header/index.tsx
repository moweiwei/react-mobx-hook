import React from 'react'
import { TodoTextInput } from 'app/components/TodoTextInput'
import { TodoModel } from 'app/models/TodoModel'

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
