# TaskWise 🧠

Gestor de tareas inteligente que usa IA para priorizar automáticamente tus pendientes.

## Demo

🔗 https://taskwise-blond.vercel.app/dashboard

## ¿Qué hace?

Cargás tus tareas con título, descripción y fecha límite. Con un clic, la IA analiza todas tus tareas y las ordena por prioridad (alta, media o baja) explicando el motivo de cada decisión.

## Stack

- **Next.js 15** — framework fullstack con App Router
- **TypeScript** — tipado estático
- **Supabase** — base de datos PostgreSQL + autenticación
- **Groq + Llama 3.3** — modelo de IA para priorización
- **Tailwind CSS + shadcn/ui** — estilos y componentes
- **Vercel** — deploy y hosting

## Features

- Registro e inicio de sesión con email
- Crear, completar y eliminar tareas
- Priorización automática con IA
- Explicación de cada prioridad generada
- Dashboard organizado por nivel de prioridad

## Correr localmente

```bash
git clone https://github.com/Imerly/taskwise.git
cd taskwise
npm install
```

Creá un archivo `.env.local` con:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
GROQ_API_KEY=
```

```bash
npm run dev
```
