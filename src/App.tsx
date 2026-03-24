import { useState } from 'react'
import Header from './components/shared/Header'
import AdminPage from './components/AdminPage'
import VisitorPage from './components/VisitorPage'
import { useAdminMode } from './hooks/useAdminMode'
import type { RecordType } from './types'

export default function App() {
  const isAdmin = useAdminMode()
  const [activeTab, setActiveTab] = useState<RecordType>('about')

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header isAdmin={isAdmin} activeTab={activeTab} onTabChange={setActiveTab} />
      <main>
        {isAdmin ? <AdminPage activeTab={activeTab} /> : <VisitorPage activeTab={activeTab} />}
      </main>
    </div>
  )
}
