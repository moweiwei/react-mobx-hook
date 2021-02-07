import React, { useState } from 'react'
import classNames from 'classnames'
import style from './style.css'

export interface TodoTextInputProps {
  text?: string
  placeholder?: string
  newTodo?: boolean
  editing?: boolean
  onSave: (text: string) => any
}

export function TodoTextInput(props: TodoTextInputProps) {
  const { onSave, text, editing, newTodo, placeholder } = props

  const [text, setText] = useState(text || '')

  const handleSubmit = (e) => {
    const text = e.target.value.trim()

    if (e.which === 13) {
      onSave(text)
      if (props.newTodo) {
        setText('')
      }
    }
  }

  const handleChange = (e) => {
    setText(e.target.value)
  }

  const handleBlur = (e) => {
    const text = e.target.value.trim()
    if (!props.newTodo) {
      onSave(text)
    }
  }

  const classes = classNames(
    {
      [style.edit]: editing,
      [style.new]: newTodo,
    },
    style.normal,
  )

  return (
    <input
      className={classes}
      type="text"
      autoFocus
      placeholder={placeholder}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  )
}
