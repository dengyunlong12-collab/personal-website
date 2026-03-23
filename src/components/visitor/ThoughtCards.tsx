import type { DailyThought } from '../../types'

interface Props {
  records: DailyThought[]
}

export default function ThoughtCards({ records }: Props) {
  if (records.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">💭</div>
        <p className="text-gray-400 text-sm">还没有分享任何想法，记录下你的思考吧！</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {records.map((record, index) => (
        <div
          key={record.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className="relative bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-sm">✨</span>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-900">Elon</p>
                <p className="text-xs text-gray-400">
                  {new Date(record.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
              {record.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
