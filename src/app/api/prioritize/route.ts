import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(request: Request) {
  try {
    const { tasks } = await request.json()

    if (!tasks || tasks.length === 0) {
      return NextResponse.json({ error: 'No hay tareas' }, { status: 400 })
    }

    const prompt = `Sos un asistente de productividad. Analizá estas tareas y asignale una prioridad a cada una (high, medium o low) con una razón breve en español.

Tareas:
${tasks.map((t: { id: string; title: string; description?: string; due_date?: string }, i: number) =>
  `${i + 1}. ID: ${t.id} | Título: ${t.title} | Descripción: ${t.description || 'ninguna'} | Fecha límite: ${t.due_date || 'ninguna'}`
).join('\n')}

Responde ÚNICAMENTE con un JSON válido con este formato exacto, sin texto adicional, sin markdown, sin backticks:
{"priorities":[{"id":"id-de-la-tarea","priority":"high","reason":"razón breve"}]}`

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      response_format: { type: 'json_object' },
    })

    const text = completion.choices[0]?.message?.content || ''
    const parsed = JSON.parse(text)

    const priorities = parsed.priorities || parsed.Priorities || Object.values(parsed)[0]

    return NextResponse.json({ priorities })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al procesar con IA' }, { status: 500 })
  }
}