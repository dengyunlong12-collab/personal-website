import { useState } from 'react'
import type { DanceRecord } from '../../types'

interface Props {
  onSubmit: (record: Omit<DanceRecord, 'id' | 'created_at'>) => Promise<void>
  initialData?: DanceRecord
  onCancel?: () => void
}

export default function DanceForm({ onSubmit, initialData, onCancel }: Props) {
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0])
  const [danceStyle, setDanceStyle] = useState(initialData?.dance_style || '')
  const [duration, setDuration] = useState(initialData?.duration?.toString() || '')
  const [notes, setNotes] = useState(initialData?.notes || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!danceStyle.trim() || !duration) return
    setLoading(true)
    try {
      await onSubmit({
        date,
        dance_style: danceStyle.trim(),
        duration: Number(duration),
        notes: notes.trim(),
      })
      if (!initialData) {
        setDanceStyle('')
        setDuration('')
        setNotes('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200/60 p-6 mb-8 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        {initialData ? 'Edit Dance Record' : 'New Dance Record'}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Dance Style</label>
          <input
            type="text"
            value={danceStyle}
            onChange={(e) => setDanceStyle(e.target.value)}
            placeholder="e.g. Hip-hop, Jazz, Ballet"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Duration (min)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="60"
            min="1"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all placeholder:text-gray-400"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Notes</label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional notes..."
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : initialData ? 'Update' : 'Add Record'}
        </button>
      </div>
    </form>
  )
}
