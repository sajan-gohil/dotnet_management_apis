import React, { useEffect, useState } from 'react'
import { TaskItem } from './types'
import api from './api'
import TaskList from './components/TaskList'

type Filter = 'all' | 'active' | 'completed'

const STORAGE_KEY = 'tasks_v1'

export default function App() {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const res = await api.get<TaskItem[]>('/tasks')
      const serverTasks = res.data
      // merge or fallback to local storage
      const local = localStorage.getItem(STORAGE_KEY)
      if (local) {
        try {
          const parsed: TaskItem[] = JSON.parse(local)
          // prefer server tasks if available, otherwise local
          setTasks(serverTasks.length ? serverTasks : parsed)
        } catch {
          setTasks(serverTasks)
        }
      } else {
        setTasks(serverTasks)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const add = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!description.trim()) return
    const newItem = { description, isCompleted: false }
    const res = await api.post<TaskItem>('/tasks', newItem)
    setTasks(prev => {
      const next = [...prev, res.data]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
    setDescription('')
  }

  const toggle = async (id: string) => {
    const t = tasks.find(x => x.id === id)
    if (!t) return
    const updated = { ...t, isCompleted: !t.isCompleted }
    await api.put(`/tasks/${id}`, updated)
    setTasks(prev => {
      const next = prev.map(p => p.id === id ? updated : p)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const remove = async (id: string) => {
    await api.delete(`/tasks/${id}`)
    setTasks(prev => {
      const next = prev.filter(p => p.id !== id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      return next
    })
  }

  const [filter, setFilter] = useState<Filter>('all')
  const filtered = tasks.filter(t => {
    if (filter === 'active') return !t.isCompleted
    if (filter === 'completed') return t.isCompleted
    return true
  })

  return (
    <div className="container">
      <h1>Tasks</h1>
      <form onSubmit={add} className="add-form">
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="New task description"
        />
        <button type="submit">Add</button>
      </form>

      <div className="filters">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'active' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'active' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'active' : ''}>Completed</button>
      </div>
      {loading ? <p>Loading...</p> : <TaskList tasks={filtered} onToggle={toggle} onDelete={remove} />}
    </div>
  )
}
