import type { FitnessRecord } from '../../types'

interface Props {
  records: FitnessRecord[]
}

export default function FitnessCards({ records }: Props) {
  if (records.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🏋️</div>
        <p className="text-gray-400 text-sm">还没有健身记录，开始记录你的运动吧！</p>
      </div>
    )
  }

  // Group by month
  const grouped = records.reduce((acc, record) => {
    const month = record.date.substring(0, 7) // YYYY-MM
    if (!acc[month]) acc[month] = []
    acc[month].push(record)
    return acc
  }, {} as Record<string, FitnessRecord[]>)

  const totalMinutes = records.reduce((sum, r) => sum + r.duration, 0)
  const totalSessions = records.length
  const uniqueTypes = new Set(records.map(r => r.exercise_type)).size

  return (
    <div>
      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-4 mb-12 animate-fade-in-up">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{totalSessions}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">训练次数</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{totalMinutes}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">总时长</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 text-center">
          <p className="text-3xl font-bold text-gray-900 tracking-tight">{uniqueTypes}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide font-medium">运动类型</p>
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
                  <span className="text-lg font-semibold text-gray-900">{record.exercise_type}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(record.date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium">
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
