import React from 'react'
import { TaskItem } from '../types'

type Props = {
  tasks: TaskItem[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TaskList({ tasks, onToggle, onDelete }: Props) {
  if (!tasks.length) return <p>No tasks yet.</p>
  return (
    <ul className="task-list">
      {tasks.map(t => (
        <li key={t.id} className={t.isCompleted ? 'completed' : ''}>
          <label>
            <input type="checkbox" checked={t.isCompleted} onChange={() => onToggle(t.id)} />
            <span className="desc">{t.description}</span>
          </label>
          <button className="delete" onClick={() => onDelete(t.id)}>Delete</button>
        </li>
      ))}
    </ul>
  )
}
