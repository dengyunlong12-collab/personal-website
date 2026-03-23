import type { FitnessRecord } from '../../types'

interface Props {
  records: FitnessRecord[]
  onEdit: (record: FitnessRecord) => void
  onDelete: (id: string) => void
}

export default function FitnessRecordList({ records, onEdit, onDelete }: Props) {
  if (records.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-sm">No fitness records yet. Start tracking your workouts!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {records.map((record, index) => (
        <div
          key={record.id}
          className="group bg-white rounded-2xl border border-gray-200/60 p-5 hover:shadow-md hover:border-gray-200 transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">💪</span>
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{record.exercise_type}</h4>
                  <p className="text-xs text-gray-400">{record.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                  {record.duration} min
                </span>
                {record.notes && (
                  <span className="text-sm text-gray-500">{record.notes}</span>
                )}
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(record)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                </svg>
              </button>
              <button
                onClick={() => record.id && onDelete(record.id)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
