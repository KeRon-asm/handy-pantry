import { supabase } from '@/lib/supabaseClient'

export async function GET() {
  try {
    const { data, error } = await supabase.from('users').select('*')
    if (error) {
      console.error('Supabase error:', error.message)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ users: data || [] }), { status: 200 })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Unexpected GET error:', err.message)
      return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
    console.error('Unexpected non-Error thrown in GET:', err)
    return new Response(JSON.stringify({ error: 'Unknown error' }), { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { data, error } = await supabase.from('users').insert([body])
    if (error) {
      console.error('Insert error:', error.message)
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ user: data }), { status: 201 })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Unexpected POST error:', err.message)
      return new Response(JSON.stringify({ error: err.message }), { status: 500 })
    }
    console.error('Unexpected non-Error thrown in POST:', err)
    return new Response(JSON.stringify({ error: 'Unknown error' }), { status: 500 })
  }
}
