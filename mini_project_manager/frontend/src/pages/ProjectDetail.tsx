import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'

type ScheduleTaskInput = {
  title: string;
  estimatedHours: number;
  dueDate: string;
  dependencies: string[];
};

type ScheduleResponse = {
  recommendedOrder: string[];
};

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState<any>(null)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDueDate, setTaskDueDate] = useState<string | null>(null)

  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null)
  const [loadingSchedule, setLoadingSchedule] = useState(false)
  const [scheduleError, setScheduleError] = useState<string | null>(null)

  async function load() {
    const r = await API.get(`/api/projects/${id}`)
    setProject(r.data)
  }

  useEffect(() => { if (id) load().catch(console.error) }, [id])

  async function addTask() {
  await API.post(`/api/projects/${id}/tasks`, { title: taskTitle, dueDate: taskDueDate || null })
  setTaskTitle('')
  setTaskDueDate(null)
  load()
  }

  async function toggle(t: any) {
    await API.put(`/api/tasks/${t.id}`, { id: t.id, title: t.title, dueDate: t.dueDate, isCompleted: !t.isCompleted })
    load()
  }

  async function removeTask(t: any) {
    await API.delete(`/api/tasks/${t.id}`)
    load()
  }

  if (!project) return <div>Loading...</div>

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      <hr />
      <h3>Schedule</h3>
      <button className="btn btn-outline-success mb-2" onClick={async () => {
        setLoadingSchedule(true)
        setScheduleError(null)
        try {
          // Prepare input for scheduler
          const tasks: ScheduleTaskInput[] = project.tasks.map((t: any) => ({
            title: t.title,
            estimatedHours: 1, // Placeholder, you may want to allow editing
            dueDate: t.dueDate || new Date().toISOString().slice(0, 10),
            dependencies: [] // Placeholder, you may want to allow editing
          }))
          const res = await API.post(`/api/projects/${id}/schedule`, { tasks })
          setSchedule(res.data)
        } catch (e: any) {
          setScheduleError(e?.response?.data?.message || 'Failed to fetch schedule')
        }
        setLoadingSchedule(false)
      }}>Get Recommended Schedule</button>
      {loadingSchedule && <div>Loading schedule...</div>}
      {scheduleError && <div className="text-danger">{scheduleError}</div>}
      {schedule && (
        <ul className="list-group mb-3">
          {schedule.recommendedOrder.map((title, i) => (
            <li key={i} className="list-group-item">{title}</li>
          ))}
        </ul>
      )}
      <h3>Tasks</h3>
      <div className="mb-3">
        <input
          className="form-control mb-2"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          placeholder="Task title (required)"
        />
        <input
          className="form-control mb-2"
          type="date"
          value={taskDueDate || ''}
          onChange={e => setTaskDueDate(e.target.value || null)}
          placeholder="Due date (optional)"
        />
        <button className="btn btn-primary" onClick={addTask} disabled={!taskTitle}>Add Task</button>
      </div>
      <ul className="list-group">
        {project.tasks.map((t: any) => (
          <li key={t.id} className="list-group-item d-flex align-items-center justify-content-between">
            <div>
              <input
                type="checkbox"
                checked={t.isCompleted}
                onChange={() => toggle(t)}
                className="form-check-input me-2"
                style={{ borderWidth: '3px', borderColor: '#333' }}
              />
              <span className={t.isCompleted ? "text-decoration-line-through" : ""}>{t.title}</span>
              {t.dueDate && (
                <span className="badge bg-secondary ms-2">Due: {t.dueDate}</span>
              )}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => removeTask(t)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
