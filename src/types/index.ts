export interface FitnessRecord {
  id?: string
  date: string
  exercise_type: string
  duration: number
  notes: string
  created_at?: string
}

export interface DanceRecord {
  id?: string
  date: string
  dance_style: string
  duration: number
  notes: string
  created_at?: string
}

export interface DailyThought {
  id?: string
  date: string
  content: string
  created_at?: string
}

export type RecordType = 'fitness' | 'dance' | 'thoughts'
