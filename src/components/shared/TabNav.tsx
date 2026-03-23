import type { RecordType } from '../../types'

interface Props {
  activeTab: RecordType
  onTabChange: (tab: RecordType) => void
}

const tabs: { key: RecordType; label: string; icon: string }[] = [
  { key: 'fitness', label: 'Fitness', icon: '💪' },
  { key: 'dance', label: 'Dance', icon: '💃' },
  { key: 'thoughts', label: 'Thoughts', icon: '💭' },
]

export default function TabNav({ activeTab, onTabChange }: Props) {
  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex bg-gray-100/80 rounded-full p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`
              relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ease-out
              ${
                activeTab === tab.key
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            <span className="relative z-10 flex items-center gap-2">
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
