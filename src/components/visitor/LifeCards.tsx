import type { LifePost } from '../../types'

interface Props {
  records: LifePost[]
}

export default function LifeCards({ records }: Props) {
  if (records.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-5xl mb-4">🌿</div>
        <p className="text-gray-400 text-sm">还没有生活记录，开始记录你的生活吧！</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {records.map((record, index) => (
        <article
          key={record.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 0.08}s` }}
        >
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-500">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                  <span className="text-sm">🌿</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{record.title}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(record.date).toLocaleDateString('zh-CN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
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
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
