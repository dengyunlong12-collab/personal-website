import { useState, useEffect, useCallback } from 'react'
import type { RecordType, FitnessRecord, DanceRecord, DailyThought } from '../types'
import TabNav from './shared/TabNav'
import FitnessCards from './visitor/FitnessCards'
import DanceCards from './visitor/DanceCards'
import ThoughtCards from './visitor/ThoughtCards'
import * as api from '../lib/api'

export default function VisitorPage() {
  const [activeTab, setActiveTab] = useState<RecordType>('fitness')
  const [fitnessRecords, setFitnessRecords] = useState<FitnessRecord[]>([])
  const [danceRecords, setDanceRecords] = useState<DanceRecord[]>([])
  const [thoughts, setThoughts] = useState<DailyThought[]>([])
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

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
      {/* Hero section */}
      <div className="text-center pt-20 pb-16 animate-fade-in-up">
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-xs font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            生活，学习，成长
          </div>
        </div>
        <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-6">
          壹龙的生活
        </h1>
        <p className="text-xl text-gray-500 max-w-lg mx-auto leading-relaxed">
          记录我的健身、舞蹈和日常思考
        </p>
      </div>

      <TabNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-4xl mx-auto px-6 pb-20">
        {activeTab === 'fitness' && <FitnessCards records={fitnessRecords} />}
        {activeTab === 'dance' && <DanceCards records={danceRecords} />}
        {activeTab === 'thoughts' && <ThoughtCards records={thoughts} />}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <p className="text-xs text-gray-400">
          用心记录，因好奇而前行
        </p>
      </footer>
    </div>
  )
}
