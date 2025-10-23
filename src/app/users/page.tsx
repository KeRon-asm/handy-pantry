'use client'

import { useEffect, useState } from 'react'

interface User {
  user_id: number
  name: string
  email: string
  preferences: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [preferences, setPreferences] = useState('')
  const [error, setError] = useState('')

  // Fetch users
  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        setUsers([])
      } else {
        setUsers(data.users || [])
      }
    } catch (err) {
      console.error(err)
      setError('Failed to load users')
      setUsers([])
    }
    setLoading(false)
  }

  // Add new user
  async function addUser(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name || !email) {
      setError('Name and Email are required')
      return
    }

    const newUser = { name, email, password_hash: 'demo123', preferences }

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      })
      const data = await res.json()
      if (data.error) {
        setError(data.error)
        return
      }

      setName('')
      setEmail('')
      setPreferences('')
      fetchUsers() // refresh list
    } catch (err) {
      console.error(err)
      setError('Failed to add user')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      <form onSubmit={addUser} className="mb-6 space-y-2">
        {error && <p className="text-red-600">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Preferences"
          value={preferences}
          onChange={e => setPreferences(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add User
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Preferences</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.user_id}>
                <td className="border px-2 py-1">{u.user_id}</td>
                <td className="border px-2 py-1">{u.name}</td>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">{u.preferences}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
