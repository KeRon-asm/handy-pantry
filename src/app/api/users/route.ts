import { supabase } from '@/lib/supabaseClient'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const user_id = url.searchParams.get('user_id') // optional filter

    let query = supabase.from('users').select('*')
    if (user_id) query = query.eq('user_id', user_id)

    const { data, error } = await query
    if (error) {
      console.error('GET /api/users error:', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ users: data }), { status: 200 })
  } catch (err: any) {
    console.error('GET /api/users exception:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Ensure required fields are present
    if (!body.name || !body.email || !body.password_hash) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 })
    }

    const { data, error } = await supabase.from('users').insert([body])
    if (error) {
      console.error('POST /api/users error:', error)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ user: data }), { status: 201 })
  } catch (err: any) {
    console.error('POST /api/users exception:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
