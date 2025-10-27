import { supabase } from '@/lib/supabase/supabaseClient'

// GET all shopping list items for a user
export async function GET(req: Request) {
  const url = new URL(req.url)
  const user_id = url.searchParams.get('user_id')

  const { data, error } = await supabase.from('shopping_list')
    .select('*')
    .eq('user_id', user_id)

  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify({ shopping: data }), { status: 200 })
}

// POST a new shopping item
export async function POST(req: Request) {
  const body = await req.json()
  const { data, error } = await supabase.from('shopping_list').insert([body])
  if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  return new Response(JSON.stringify({ shopping: data }), { status: 201 })
}
