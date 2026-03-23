import { useState } from 'react'
import type { DailyThought } from '../../types'

interface Props {
  onSubmit: (record: Omit<DailyThought, 'id' | 'created_at'>) => Promise<void>
  initialData?: DailyThought
  onCancel?: () => void
}

export default function ThoughtForm({ onSubmit, initialData, onCancel }: Props) {
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0])
  const [content, setContent] = useState(initialData?.content || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    setLoading(true)
    try {
      await onSubmit({
        date,
        content: content.trim(),
      })
      if (!initialData) {
        setContent('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200/60 p-6 mb-8 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        {initialData ? 'Edit Thought' : 'New Daily Thought'}
      </h3>
      <div className="space-y-4 mb-4">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full sm:w-48 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">What's on your mind?</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your thoughts here..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all placeholder:text-gray-400 resize-none"
            required
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
          {loading ? 'Saving...' : initialData ? 'Update' : 'Add Thought'}
        </button>
      </div>
    </form>
  )
}
