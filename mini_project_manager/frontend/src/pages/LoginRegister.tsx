import React, { useState } from 'react'
import API from '../api'

const USERNAME_MIN = 3
const USERNAME_MAX = 100
const PASSWORD_MIN = 6

export default function LoginRegister() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function validate() {
    const errors: string[] = []
    if (!username || username.length < USERNAME_MIN || username.length > USERNAME_MAX) errors.push(`Username must be ${USERNAME_MIN}-${USERNAME_MAX} characters.`)
    if (!password || password.length < PASSWORD_MIN) errors.push(`Password must be at least ${PASSWORD_MIN} characters.`)
    return errors
  }

  async function register() {
    setError(null)
    const errs = validate()
    if (errs.length) return setError(errs.join(' '))
    setLoading(true)
    try {
      await API.post('/api/auth/register', { username, password })
      // for clarity store username locally so user sees it on dashboard after login
      localStorage.setItem('username', username)
      alert('Registered. Now you can login.')
    } catch (e: any) {
      setError(e?.response?.data?.error || e?.response?.data || e.message || 'Registration failed')
    } finally { setLoading(false) }
  }

  async function login() {
    setError(null)
    const errs = validate()
    if (errs.length) return setError(errs.join(' '))
    setLoading(true)
    try {
      const r = await API.post('/api/auth/login', { username, password })
      localStorage.setItem('token', r.data.token)
      localStorage.setItem('username', username)
      window.location.href = '/'
    } catch (e: any) {
      setError(e?.response?.data?.error || e?.response?.data || e.message || 'Login failed')
    } finally { setLoading(false) }
  }

  const errs = validate()
  const disabled = loading || errs.length > 0
  const token = localStorage.getItem('token')

  return (
    <div style={{ maxWidth: 520 }}>
      <h2>Login / Register</h2>

      <div style={{ marginBottom: 8 }}>
        <strong>Field rules</strong>
        <ul>
          <li>Username: required, {USERNAME_MIN}–{USERNAME_MAX} characters</li>
          <li>Password: required, minimum {PASSWORD_MIN} characters</li>
        </ul>
      </div>

      <div style={{ marginBottom: 8 }}>
        <label>Username</label>
        <input value={username} onChange={e => setUsername(e.target.value)} style={{ display: 'block', width: '100%' }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label>Password</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ display: 'block', width: '100%' }} />
      </div>

      {errs.length > 0 && (
        <div style={{ color: 'darkorange', marginBottom: 8 }}>
          {errs.map((x,i) => <div key={i}>{x}</div>)}
        </div>
      )}

      {error && <div style={{ color: 'red', marginBottom: 8 }}>{String(error)}</div>}

      <div style={{ marginTop: 10 }}>
        <button onClick={login} disabled={disabled}>Login</button>
        <button onClick={register} disabled={disabled} style={{ marginLeft: 8 }}>Register</button>
        {loading && <span style={{ marginLeft: 10 }}>Working…</span>}
      </div>
    </div>
  )
}
