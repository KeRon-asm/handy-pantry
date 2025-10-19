'use client'

import { useEffect, useState } from 'react'

interface PantryItem {
  pantry_id: number
  item_name: string
  quantity: number
  unit: string
  category: string
  expiration_date: string
}

export default function PantryPage() {
  const [items, setItems] = useState<PantryItem[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchItems() {
    setLoading(true)
    const res = await fetch('/api/pantry')
    const data = await res.json()
    setItems(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pantry</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">ID</th>
              <th className="border px-2 py-1">Item</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Unit</th>
              <th className="border px-2 py-1">Category</th>
              <th className="border px-2 py-1">Expiration</th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.pantry_id}>
                <td className="border px-2 py-1">{i.pantry_id}</td>
                <td className="border px-2 py-1">{i.item_name}</td>
                <td className="border px-2 py-1">{i.quantity}</td>
                <td className="border px-2 py-1">{i.unit}</td>
                <td className="border px-2 py-1">{i.category}</td>
                <td className="border px-2 py-1">{i.expiration_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
