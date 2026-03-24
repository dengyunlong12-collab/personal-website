import type { LifePost } from '../../types'

interface Props {
  records: LifePost[]
  onEdit: (record: LifePost) => void
  onDelete: (id: string) => void
}

export default function LifeRecordList({ records, onEdit, onDelete }: Props) {
  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">暂无生活记录</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
        已发布的记录
      </h3>
      {records.map((record) => (
        <div
          key={record.id}
          className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="font-medium text-gray-900 truncate">{record.title}</h4>
                <span className="flex-shrink-0 text-xs text-gray-400">
                  {new Date(record.date).toLocaleDateString('zh-CN')}
                </span>
              </div>
              <div
                className="text-sm text-gray-500 line-clamp-2 [&_img]:hidden [&_h2]:inline [&_h3]:inline [&_p]:inline"
                dangerouslySetInnerHTML={{ __html: record.content }}
              />
            </div>
            <div className="flex gap-2 ml-4 flex-shrink-0">
              <button
                onClick={() => onEdit(record)}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                编辑
              </button>
              <button
                onClick={() => record.id && onDelete(record.id)}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
