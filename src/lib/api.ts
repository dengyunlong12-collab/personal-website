import { supabase } from './supabase'
import type { FitnessRecord, DanceRecord, DailyThought, LifePost } from '../types'

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

// ==================== Life Posts ====================

export async function getLifePosts(): Promise<LifePost[]> {
  const { data, error } = await supabase
    .from('life_posts')
    .select('*')
    .order('date', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createLifePost(record: Omit<LifePost, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('life_posts')
    .insert(record)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateLifePost(id: string, record: Partial<LifePost>) {
  const { data, error } = await supabase
    .from('life_posts')
    .update(record)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteLifePost(id: string) {
  const { error } = await supabase.from('life_posts').delete().eq('id', id)
  if (error) throw error
}

// ==================== Image Upload ====================

export async function uploadImage(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `uploads/${fileName}`

  const { error } = await supabase.storage
    .from('images')
    .upload(filePath, file)

  if (error) throw error

  const { data } = supabase.storage
    .from('images')
    .getPublicUrl(filePath)

  return data.publicUrl
}
