import { supabase } from '@/lib/supabaseClient'

// GET all users or a specific user by id
export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const user_id = url.searchParams.get('user_id') // optional

    let query = supabase.from('users').select('*')
    if (user_id) {
      query = query.eq('user_id', user_id)
    }

    const { data, error } = await query
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

    return new Response(JSON.stringify({ users: data }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// POST a new user
export async function POST(req: Request) {
  try {
    const body = await req.json()
    // body should include: name, email, password_hash, preferences
    const { data, error } = await supabase.from('users').insert([body])
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

    return new Response(JSON.stringify({ user: data }), { status: 201 })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

// PATCH to update user information
export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { user_id, ...updates } = body
    if (!user_id) {
      return new Response(JSON.stringify({ error: 'user_id is required' }), { status: 400 })
    }

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('user_id', user_id)

    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 })

    return new Response(JSON.stringify({ user: data }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
