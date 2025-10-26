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

  async function fetchUsers() {
    setLoading(true)
    const res = await fetch('/api/users')
    const data = await res.json()
    setUsers(data.users || [])
    setLoading(false)
  }

  async function addUser(e: React.FormEvent) {
    e.preventDefault()
    await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, preferences, password_hash: 'demo123' })
    })
    setName('')
    setEmail('')
    setPreferences('')
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Household Users</h1>

      {/*  FORM SECTION */}
      <form onSubmit={addUser} className="mb-6 space-y-4">
        {/*  Added label and reduced width */}
        <div>
          <label className="block font-medium mb-1">Name:</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="border p-2 rounded w-1/2" // changed from w-full
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email:</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border p-2 rounded w-1/2" // changed from w-full
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Preferences:</label>
          <input
            type="text"
            placeholder="Enter preferences"
            value={preferences}
            onChange={e => setPreferences(e.target.value)}
            className="border p-2 rounded w-1/2" // changed from w-full
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Add User
        </button>
      </form>

      {/*  TABLE SECTION */}
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
