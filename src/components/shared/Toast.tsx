interface Props {
  message: string
  type: 'success' | 'error'
  show: boolean
}

export default function Toast({ message, type, show }: Props) {
  if (!show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-slide-down">
      <div
        className={`
          px-5 py-3 rounded-2xl shadow-lg text-sm font-medium backdrop-blur-xl
          ${type === 'success' ? 'bg-green-50/90 text-green-800 border border-green-200/50' : 'bg-red-50/90 text-red-800 border border-red-200/50'}
        `}
      >
        {type === 'success' ? '✓' : '✕'} {message}
      </div>
    </div>
  )
}
