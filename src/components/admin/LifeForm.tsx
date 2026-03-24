import { useState } from 'react'
import type { LifePost } from '../../types'
import RichTextEditor from '../shared/RichTextEditor'

interface Props {
  onSubmit: (record: Omit<LifePost, 'id' | 'created_at'>) => Promise<void>
  initialData?: LifePost
  onCancel?: () => void
}

export default function LifeForm({ onSubmit, initialData, onCancel }: Props) {
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0])
  const [title, setTitle] = useState(initialData?.title || '')
  const [content, setContent] = useState(initialData?.content || '')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return
    setLoading(true)
    try {
      await onSubmit({
        date,
        title: title.trim(),
        content,
      })
      if (!initialData) {
        setTitle('')
        setContent('')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200/60 p-6 mb-8 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-900 mb-5">
        {initialData ? '编辑生活记录' : '新增生活记录'}
      </h3>
      <div className="space-y-4 mb-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">标题</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="今天发生了什么..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all placeholder:text-gray-400"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">日期</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full sm:w-48 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5 uppercase tracking-wide">内容</label>
          <RichTextEditor
            content={content}
            onChange={setContent}
            placeholder="写下你的生活，支持插入图片..."
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
            取消
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-full hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '保存中...' : initialData ? '更新' : '发布'}
        </button>
      </div>
    </form>
  )
}
