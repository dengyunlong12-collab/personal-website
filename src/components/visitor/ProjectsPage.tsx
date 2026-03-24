export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center justify-center py-32 animate-fade-in-up">
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-8">
        <span className="text-4xl">🚀</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        敬请期待
      </h2>
      <p className="text-gray-500 text-center max-w-sm leading-relaxed">
        我的项目正在整理中，很快就会和大家见面。
      </p>
      <div className="mt-8 flex items-center gap-2 text-sm text-gray-400">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        Coming Soon
      </div>
    </div>
  )
}
