import React, { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [username, setUsername] = useState<string | null>(null)

  useEffect(() => {
    const u = localStorage.getItem('username')
    setUsername(u)
    if (!localStorage.getItem('token')) {
      window.location.href = '/auth'
    }
  }, [])

  async function load() {
    const r = await API.get('/api/projects')
    setProjects(r.data)
  }

  useEffect(() => { load().catch(console.error) }, [])

  async function create() {
    if (title.length < 3 || title.length > 100) {
      alert('Title must be between 3 and 100 characters.')
      return
    }
    if (description.length > 500) {
      alert('Description must be up to 500 characters.')
      return
    }
    await API.post('/api/projects', { title, description })
    setTitle('')
    setDescription('')
    load()
  }

  async function remove(id: number) {
    await API.delete(`/api/projects/${id}`)
    load()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Projects</h2>
        <div></div>
      </div>
      <div className="mb-3">
        <input
          className="form-control mb-2"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Project title (3-100 chars, required)"
          maxLength={100}
        />
        <textarea
          className="form-control mb-2"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description (optional, up to 500 chars)"
          maxLength={500}
        />
        <button className="btn btn-primary" onClick={create} disabled={title.length < 3 || title.length > 100}>Create Project</button>
      </div>
      <ul className="list-group">
        {projects.map(p => (
          <li key={p.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <Link to={`/projects/${p.id}`} className="fw-bold">{p.title}</Link>
                {p.description && (
                  <div className="text-muted small">{p.description}</div>
                )}
                {p.createdAt && (
                  <div className="badge bg-light text-dark mt-1">Created: {new Date(p.createdAt).toLocaleString()}</div>
                )}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => remove(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
