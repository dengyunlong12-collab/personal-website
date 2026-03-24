import { useState, useEffect, useCallback } from 'react'
import type { RecordType, LifePost, DailyThought } from '../types'
import Toast from './shared/Toast'
import ConfirmDialog from './shared/ConfirmDialog'
import LifeForm from './admin/LifeForm'
import LifeRecordList from './admin/LifeRecordList'
import ThoughtForm from './admin/ThoughtForm'
import ThoughtList from './admin/ThoughtList'
import ProjectsPage from './visitor/ProjectsPage'
import * as api from '../lib/api'

interface Props {
  activeTab: RecordType
}

export default function AdminPage({ activeTab }: Props) {
  const [lifePosts, setLifePosts] = useState<LifePost[]>([])
  const [thoughts, setThoughts] = useState<DailyThought[]>([])
  const [loading, setLoading] = useState(true)

  // Edit states
  const [editingLife, setEditingLife] = useState<LifePost | null>(null)
  const [editingThought, setEditingThought] = useState<DailyThought | null>(null)

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; show: boolean }>({
    message: '',
    type: 'success',
    show: false,
  })

  // Confirm dialog
  const [confirmDialog, setConfirmDialog] = useState<{
    show: boolean
    id: string
    type: 'life' | 'thoughts'
  }>({ show: false, id: '', type: 'life' })

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type, show: true })
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [life, dailyThoughts] = await Promise.all([
        api.getLifePosts().catch(() => [] as LifePost[]),
        api.getDailyThoughts(),
      ])
      setLifePosts(life)
      setThoughts(dailyThoughts)
    } catch (err) {
      console.error('Failed to load data:', err)
      showToast('加载数据失败，请检查 Supabase 配置', 'error')
    } finally {
      setLoading(false)
    }
  }, [showToast])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Life Post CRUD
  const handleCreateLife = async (record: Omit<LifePost, 'id' | 'created_at'>) => {
    try {
      await api.createLifePost(record)
      showToast('生活记录已发布！', 'success')
      loadData()
    } catch {
      showToast('发布失败', 'error')
    }
  }

  const handleUpdateLife = async (record: Omit<LifePost, 'id' | 'created_at'>) => {
    if (!editingLife?.id) return
    try {
      await api.updateLifePost(editingLife.id, record)
      setEditingLife(null)
      showToast('记录已更新！', 'success')
      loadData()
    } catch {
      showToast('更新失败', 'error')
    }
  }

  // Thought CRUD
  const handleCreateThought = async (record: Omit<DailyThought, 'id' | 'created_at'>) => {
    try {
      await api.createDailyThought(record)
      showToast('想法已发布！', 'success')
      loadData()
    } catch {
      showToast('发布失败', 'error')
    }
  }

  const handleUpdateThought = async (record: Omit<DailyThought, 'id' | 'created_at'>) => {
    if (!editingThought?.id) return
    try {
      await api.updateDailyThought(editingThought.id, record)
      setEditingThought(null)
      showToast('想法已更新！', 'success')
      loadData()
    } catch {
      showToast('更新失败', 'error')
    }
  }

  // Delete
  const handleDelete = async () => {
    const { id, type } = confirmDialog
    try {
      if (type === 'life') await api.deleteLifePost(id)
      else await api.deleteDailyThought(id)
      showToast('删除成功', 'success')
      loadData()
    } catch {
      showToast('删除失败', 'error')
    }
    setConfirmDialog({ show: false, id: '', type: 'life' })
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
        <p className="text-gray-500 text-sm">加载中...</p>
      </div>
    )
  }

  return (
    <div>
      <Toast {...toast} />
      <ConfirmDialog
        show={confirmDialog.show}
        title="删除记录"
        message="确定要删除这条记录吗？此操作无法撤销。"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDialog({ show: false, id: '', type: 'life' })}
      />

      <div className="max-w-3xl mx-auto px-6 pb-20 pt-8">
        {activeTab === 'about' && (
          <div className="text-center py-16 animate-fade-in-up">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              管理后台
            </h1>
            <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
              请通过顶部导航切换到「我的生活」或「我的想法」进行内容管理
            </p>
          </div>
        )}

        {activeTab === 'life' && (
          <div>
            {editingLife ? (
              <LifeForm
                initialData={editingLife}
                onSubmit={handleUpdateLife}
                onCancel={() => setEditingLife(null)}
              />
            ) : (
              <LifeForm onSubmit={handleCreateLife} />
            )}
            <LifeRecordList
              records={lifePosts}
              onEdit={setEditingLife}
              onDelete={(id) => setConfirmDialog({ show: true, id, type: 'life' })}
            />
          </div>
        )}

        {activeTab === 'thoughts' && (
          <div>
            {editingThought ? (
              <ThoughtForm
                initialData={editingThought}
                onSubmit={handleUpdateThought}
                onCancel={() => setEditingThought(null)}
              />
            ) : (
              <ThoughtForm onSubmit={handleCreateThought} />
            )}
            <ThoughtList
              records={thoughts}
              onEdit={setEditingThought}
              onDelete={(id) => setConfirmDialog({ show: true, id, type: 'thoughts' })}
            />
          </div>
        )}

        {activeTab === 'projects' && <ProjectsPage />}
      </div>
    </div>
  )
}
