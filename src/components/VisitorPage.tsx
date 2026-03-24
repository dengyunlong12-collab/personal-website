import { useState, useEffect, useCallback } from 'react'
import type { RecordType, LifePost, DailyThought } from '../types'
import AboutPage from './visitor/AboutPage'
import LifeCards from './visitor/LifeCards'
import ThoughtCards from './visitor/ThoughtCards'
import ProjectsPage from './visitor/ProjectsPage'
import * as api from '../lib/api'

interface Props {
  activeTab: RecordType
}

export default function VisitorPage({ activeTab }: Props) {
  const [lifePosts, setLifePosts] = useState<LifePost[]>([])
  const [thoughts, setThoughts] = useState<DailyThought[]>([])
  const [loading, setLoading] = useState(true)

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
      <div className="max-w-4xl mx-auto px-6 pb-20 pt-8">
        {activeTab === 'about' && <AboutPage />}
        {activeTab === 'life' && <LifeCards records={lifePosts} />}
        {activeTab === 'thoughts' && <ThoughtCards records={thoughts} />}
        {activeTab === 'projects' && <ProjectsPage />}
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
