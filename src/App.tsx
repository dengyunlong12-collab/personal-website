import Header from './components/shared/Header'
import AdminPage from './components/AdminPage'
import VisitorPage from './components/VisitorPage'
import { useAdminMode } from './hooks/useAdminMode'

export default function App() {
  const isAdmin = useAdminMode()

  return (
    <div className="min-h-screen bg-[#fbfbfd]">
      <Header isAdmin={isAdmin} />
      <main>
        {isAdmin ? <AdminPage /> : <VisitorPage />}
      </main>
    </div>
  )
}
