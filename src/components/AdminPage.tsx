import { useState, useEffect, useCallback } from 'react'
import type { RecordType, FitnessRecord, DanceRecord, DailyThought } from '../types'
import TabNav from './shared/TabNav'
import Toast from './shared/Toast'
import ConfirmDialog from './shared/ConfirmDialog'
import FitnessForm from './admin/FitnessForm'
import FitnessRecordList from './admin/FitnessRecordList'
import DanceForm from './admin/DanceForm'
import DanceRecordList from './admin/DanceRecordList'
import ThoughtForm from './admin/ThoughtForm'
import ThoughtList from './admin/ThoughtList'
import * as api from '../lib/api'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<RecordType>('fitness')
  const [fitnessRecords, setFitnessRecords] = useState<FitnessRecord[]>([])
  const [danceRecords, setDanceRecords] = useState<DanceRecord[]>([])
  const [thoughts, setThoughts] = useState<DailyThought[]>([])
  const [loading, setLoading] = useState(true)

  // Edit states
  const [editingFitness, setEditingFitness] = useState<FitnessRecord | null>(null)
  const [editingDance, setEditingDance] = useState<DanceRecord | null>(null)
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
    type: RecordType
  }>({ show: false, id: '', type: 'fitness' })

  const showToast = useCallback((message: string, type: 'success' | 'error') => {
    setToast({ message, type, show: true })
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 3000)
  }, [])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [fitness, dance, dailyThoughts] = await Promise.all([
        api.getFitnessRecords(),
        api.getDanceRecords(),
        api.getDailyThoughts(),
      ])
      setFitnessRecords(fitness)
      setDanceRecords(dance)
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

  // Fitness CRUD
  const handleCreateFitness = async (record: Omit<FitnessRecord, 'id' | 'created_at'>) => {
    try {
      await api.createFitnessRecord(record)
      showToast('健身记录已添加！', 'success')
      loadData()
    } catch {
      showToast('添加记录失败', 'error')
    }
  }

  const handleUpdateFitness = async (record: Omit<FitnessRecord, 'id' | 'created_at'>) => {
    if (!editingFitness?.id) return
    try {
      await api.updateFitnessRecord(editingFitness.id, record)
      setEditingFitness(null)
      showToast('记录已更新！', 'success')
      loadData()
    } catch {
      showToast('更新记录失败', 'error')
    }
  }

  // Dance CRUD
  const handleCreateDance = async (record: Omit<DanceRecord, 'id' | 'created_at'>) => {
    try {
      await api.createDanceRecord(record)
      showToast('跳舞记录已添加！', 'success')
      loadData()
    } catch {
      showToast('添加记录失败', 'error')
    }
  }

  const handleUpdateDance = async (record: Omit<DanceRecord, 'id' | 'created_at'>) => {
    if (!editingDance?.id) return
    try {
      await api.updateDanceRecord(editingDance.id, record)
      setEditingDance(null)
      showToast('记录已更新！', 'success')
      loadData()
    } catch {
      showToast('更新记录失败', 'error')
    }
  }

  // Thought CRUD
  const handleCreateThought = async (record: Omit<DailyThought, 'id' | 'created_at'>) => {
    try {
      await api.createDailyThought(record)
      showToast('随想已保存！', 'success')
      loadData()
    } catch {
      showToast('保存随想失败', 'error')
    }
  }

  const handleUpdateThought = async (record: Omit<DailyThought, 'id' | 'created_at'>) => {
    if (!editingThought?.id) return
    try {
      await api.updateDailyThought(editingThought.id, record)
      setEditingThought(null)
      showToast('随想已更新！', 'success')
      loadData()
    } catch {
      showToast('更新随想失败', 'error')
    }
  }

  // Delete
  const handleDelete = async () => {
    const { id, type } = confirmDialog
    try {
      if (type === 'fitness') await api.deleteFitnessRecord(id)
      else if (type === 'dance') await api.deleteDanceRecord(id)
      else await api.deleteDailyThought(id)
      showToast('删除成功', 'success')
      loadData()
    } catch {
      showToast('删除失败', 'error')
    }
    setConfirmDialog({ show: false, id: '', type: 'fitness' })
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
        onCancel={() => setConfirmDialog({ show: false, id: '', type: 'fitness' })}
      />

      {/* Hero section */}
      <div className="text-center pt-16 pb-12 animate-fade-in-up">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-4">
          管理后台
        </h1>
        <p className="text-lg text-gray-500 max-w-md mx-auto leading-relaxed">
          管理你的健身、舞蹈记录和日常随想
        </p>
      </div>

      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-3xl mx-auto px-6 pb-20">
        {activeTab === 'fitness' && (
          <div>
            {editingFitness ? (
              <FitnessForm
                initialData={editingFitness}
                onSubmit={handleUpdateFitness}
                onCancel={() => setEditingFitness(null)}
              />
            ) : (
              <FitnessForm onSubmit={handleCreateFitness} />
            )}
            <FitnessRecordList
              records={fitnessRecords}
              onEdit={setEditingFitness}
              onDelete={(id) => setConfirmDialog({ show: true, id, type: 'fitness' })}
            />
          </div>
        )}

        {activeTab === 'dance' && (
          <div>
            {editingDance ? (
              <DanceForm
                initialData={editingDance}
                onSubmit={handleUpdateDance}
                onCancel={() => setEditingDance(null)}
              />
            ) : (
              <DanceForm onSubmit={handleCreateDance} />
            )}
            <DanceRecordList
              records={danceRecords}
              onEdit={setEditingDance}
              onDelete={(id) => setConfirmDialog({ show: true, id, type: 'dance' })}
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
      </div>
    </div>
  )
}
