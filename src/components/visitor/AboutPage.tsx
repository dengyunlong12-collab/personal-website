export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      {/* Profile Section */}
      <div className="text-center mb-16 animate-fade-in-up">
        <div className="mb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mx-auto flex items-center justify-center text-6xl">
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          你好,我是壹龙
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
          一个热爱生活、持续学习成长的人。在这里记录我的运动生活、思考感悟和成长轨迹。
        </p>
      </div>

      {/* About Sections */}
      <div className="space-y-12">
        {/* Current Status */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">当前状态</h2>
          <div className="text-gray-600 leading-relaxed space-y-3">
            <p>
              我目前专注于个人成长和技能提升,通过持续的运动和思考来保持身心健康。
            </p>
            <p>
              这个网站是我记录生活、分享思考的地方,希望能让你更了解我。
            </p>
          </div>
        </section>

        {/* Interests */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">我的热爱</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-gray-900 mb-1">健身</h3>
              <p className="text-sm text-gray-500">
                坚持力量训练和有氧运动,保持身体健康和活力
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-medium text-gray-900 mb-1">跳舞</h3>
              <p className="text-sm text-gray-500">
                享受音乐和舞蹈带来的快乐,释放压力
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">我的价值观</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>持续学习,保持好奇心</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>健康生活,身心平衡</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>思考总结,不断精进</span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">联系我</h2>
          <p className="text-gray-600 leading-relaxed">
            如果你想了解更多关于我的信息,或者想和我交流,欢迎通过以下方式联系我。
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="#"
              className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              微信
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              邮箱
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
