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

  // Check if content looks like HTML
  const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str)

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
                <p className="text-xs font-medium text-gray-900">壹龙</p>
                <p className="text-xs text-gray-400">
                  {new Date(record.date).toLocaleDateString('zh-CN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
            {isHtml(record.content) ? (
              <div
                className="prose prose-sm max-w-none text-gray-700 leading-relaxed
                  [&_img]:rounded-xl [&_img]:max-w-full [&_img]:h-auto [&_img]:my-4
                  [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h2]:mt-6 [&_h2]:mb-3
                  [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-gray-900 [&_h3]:mt-4 [&_h3]:mb-2
                  [&_p]:mb-3 [&_p]:leading-relaxed
                  [&_blockquote]:border-l-4 [&_blockquote]:border-gray-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-500
                  [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                  [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                  [&_li]:mb-1
                  [&_strong]:font-semibold [&_strong]:text-gray-900
                "
                dangerouslySetInnerHTML={{ __html: record.content }}
              />
            ) : (
              <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">
                {record.content}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
