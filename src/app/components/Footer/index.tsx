import React from 'react'
import classNames from 'classnames'
import style from './style.css'
import {
  TodoFilter,
  TODO_FILTER_TITLES,
  TODO_FILTER_TYPES,
} from 'app/constants'

export interface FooterProps {
  filter: TodoFilter
  activeCount: number
  completedCount: number
  onChangeFilter: (filter: TodoFilter) => any
  onClearCompleted: () => any
}

export default function Footer(props: FooterProps) {
  const TodoCount = () => {
    const { activeCount } = props
    const itemWord = activeCount === 1 ? 'item' : 'items'
    return (
      <span className={style.count}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  const FilterLink = ({ filter }) => {
    const title = TODO_FILTER_TITLES[filter]
    const { filter: selectedFilter, onChangeFilter } = props
    const className = classNames({
      [style.selected]: filter === selectedFilter,
    })

    return (
      <a
        className={className}
        style={{ cursor: 'pointer' }}
        onClick={() => onChangeFilter(filter)}
      >
        {title}
      </a>
    )
  }

  const ClearButton = () => {
    const { completedCount, onClearCompleted } = props
    if (completedCount > 0) {
      return (
        <button className={style.clearCompleted} onClick={onClearCompleted} />
      )
    } else {
      return null
    }
  }

  return (
    <footer className={style.normal}>
      <TodoCount />
      <ul className={style.filters}>
        {TODO_FILTER_TYPES.map((filter) => (
          <li key={filter}>
            <FilterLink filter={filter} />
          </li>
        ))}
      </ul>
      <ClearButton />
    </footer>
  )
}
