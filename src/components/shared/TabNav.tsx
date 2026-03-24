import type { RecordType } from '../../types'

interface Props {
  activeTab: RecordType
  onTabChange: (tab: RecordType) => void
}

const tabs: { key: RecordType; label: string }[] = [
  { key: 'about', label: '关于我' },
  { key: 'life', label: '我的生活' },
  { key: 'thoughts', label: '我的想法' },
  { key: 'projects', label: '我的项目' },
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
            <span className="relative z-10">
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
