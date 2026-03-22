export type Priority = 'high' | 'medium' | 'low'

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  priority: Priority
  priority_reason: string | null
  due_date: string | null
  completed: boolean
  created_at: string
}