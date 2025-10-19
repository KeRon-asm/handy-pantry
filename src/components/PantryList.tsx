'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface PantryItem {
  id: number
  item_name: string
  quantity: number
  unit: string
}

export default function PantryList() {
  const [items, setItems] = useState<PantryItem[]>([])
  const [newItem, setNewItem] = useState({ item_name: '', quantity: 1, unit: '' })

  // Fetch pantry items
  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('Pantry')
        .select('*')
        .order('id', { ascending: true })
      if (error) console.log(error)
      else setItems(data)
    }
    fetchItems()
  }, [])

  // Add new item
  const addItem = async () => {
    const { data, error } = await supabase
      .from('Pantry')
      .insert([newItem])
    if (error) console.log(error)
    else setItems(prev => [...prev, ...data])
    setNewItem({ item_name: '', quantity: 1, unit: '' })
  }

  return (
    <div>
      <h2>Pantry</h2>
      <input
        placeholder="Item Name"
        value={newItem.item_name}
        onChange={e => setNewItem({ ...newItem, item_name: e.target.value })}
      />
      <input
        type="number"
        value={newItem.quantity}
        onChange={e => setNewItem({ ...newItem, quantity: Number(e.target.value) })}
      />
      <input
        placeholder="Unit"
        value={newItem.unit}
        onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
      />
      <button onClick={addItem}>Add</button>

      <ul>
        {items.map(item => (
          <li key={item.id}>{item.item_name} — {item.quantity} {item.unit}</li>
        ))}
      </ul>
    </div>
  )
}
