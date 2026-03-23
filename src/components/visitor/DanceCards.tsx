import type { DanceRecord } from '../../types'

interface Props {
  records: DanceRecord[]
}

export default function DanceCards({ records }: Props) {
  if (records.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">💃</div>
        <p className="text-gray-400 text-sm">还没有舞蹈记录，让音乐带动你的节奏吧！</p>
      </div>
    )
  }

  const grouped = records.reduce((acc, record) => {
    const month = record.date.substring(0, 7)
    if (!acc[month]) acc[month] = []
    acc[month].push(record)
    return acc
  }, {} as Record<string, DanceRecord[]>)

  const totalMinutes = records.reduce((sum, r) => sum + r.duration, 0)
  const totalSessions = records.length
  const uniqueStyles = new Set(records.map(r => r.dance_style)).size

  const styleColors: Record<string, string> = {
    'Hip-hop': 'bg-rose-50 text-rose-600',
    'Jazz': 'bg-amber-50 text-amber-600',
    'Ballet': 'bg-pink-50 text-pink-600',
    'Contemporary': 'bg-violet-50 text-violet-600',
    'Latin': 'bg-orange-50 text-orange-600',
  }

  const getStyleColor = (style: string) => {
    return styleColors[style] || 'bg-purple-50 text-purple-600'
  }

  return (
    <div>
      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-4 mb-12 animate-fade-in-up">
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{totalSessions}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">练习次数</p>
        </div>
        <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{totalMinutes}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">总时长</p>
        </div>
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{uniqueStyles}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">舞蹈风格</p>
        </div>
      </div>

      {/* Timeline */}
      {Object.entries(grouped).map(([month, monthRecords], groupIndex) => (
        <div key={month} className="mb-10 animate-fade-in-up" style={{ animationDelay: `${groupIndex * 0.1}s` }}>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            {new Date(month + '-01').toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {monthRecords.map((record, index) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-500 cursor-default"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStyleColor(record.dance_style)}`}>
                    {record.dance_style}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(record.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gray-50 text-gray-600 text-xs font-medium">
                    ⏱ {record.duration} 分钟
                  </span>
                </div>
                {record.notes && (
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed">{record.notes}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
