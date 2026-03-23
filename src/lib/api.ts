import { supabase } from './supabase'
import type { FitnessRecord, DanceRecord, DailyThought } from '../types'

// ==================== Fitness Records ====================

export async function getFitnessRecords(): Promise<FitnessRecord[]> {
  const { data, error } = await supabase
    .from('fitness_records')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createFitnessRecord(record: Omit<FitnessRecord, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('fitness_records')
    .insert(record)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateFitnessRecord(id: string, record: Partial<FitnessRecord>) {
  const { data, error } = await supabase
    .from('fitness_records')
    .update(record)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteFitnessRecord(id: string) {
  const { error } = await supabase.from('fitness_records').delete().eq('id', id)
  if (error) throw error
}

// ==================== Dance Records ====================

export async function getDanceRecords(): Promise<DanceRecord[]> {
  const { data, error } = await supabase
    .from('dance_records')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createDanceRecord(record: Omit<DanceRecord, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('dance_records')
    .insert(record)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateDanceRecord(id: string, record: Partial<DanceRecord>) {
  const { data, error } = await supabase
    .from('dance_records')
    .update(record)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteDanceRecord(id: string) {
  const { error } = await supabase.from('dance_records').delete().eq('id', id)
  if (error) throw error
}

// ==================== Daily Thoughts ====================

export async function getDailyThoughts(): Promise<DailyThought[]> {
  const { data, error } = await supabase
    .from('daily_thoughts')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createDailyThought(record: Omit<DailyThought, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('daily_thoughts')
    .insert(record)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateDailyThought(id: string, record: Partial<DailyThought>) {
  const { data, error } = await supabase
    .from('daily_thoughts')
    .update(record)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteDailyThought(id: string) {
  const { error } = await supabase.from('daily_thoughts').delete().eq('id', id)
  if (error) throw error
}
