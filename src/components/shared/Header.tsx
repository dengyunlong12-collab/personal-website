import { type ReactNode } from 'react'

interface Props {
  isAdmin: boolean
  children: ReactNode
}

export default function Header({ isAdmin }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold tracking-tight text-gray-900">
            Elon's Space
          </span>
        </div>
        <div className="flex items-center gap-4">
          {isAdmin ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-900 text-white text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Owner Mode
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Visitor
            </span>
          )}
        </div>
      </div>
    </header>
  )
}
