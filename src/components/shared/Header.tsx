import type { RecordType } from '../../types'

interface Props {
  isAdmin: boolean
  activeTab: RecordType
  onTabChange: (tab: RecordType) => void
}

const tabs: { key: RecordType; label: string }[] = [
  { key: 'about', label: '关于我' },
  { key: 'life', label: '我的生活' },
  { key: 'thoughts', label: '我的想法' },
  { key: 'projects', label: '我的项目' },
]

export default function Header({ isAdmin, activeTab, onTabChange }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold tracking-tight text-gray-900">
            壹龙的空间
          </span>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden sm:flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`
                relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-out
                ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Admin Badge */}
        <div className="flex items-center gap-4">
          {isAdmin ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              主人模式
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              访客
            </span>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden border-t border-gray-100">
        <div className="flex overflow-x-auto px-4 py-2 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className={`
                flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
