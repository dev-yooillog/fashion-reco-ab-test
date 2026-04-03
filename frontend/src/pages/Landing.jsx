const steps = [
  { label: "문제 정의", desc: "인기 상품 위주 노출로 CVR이 낮고 롱테일 상품이 소외됨" },
  { label: "가설", desc: "유저 취향 기반 개인화 추천이 다양성과 적합도를 동시에 개선한다" },
  { label: "실험 설계", desc: "Control(인기 추천) vs Test(ALS 협업 필터링) — Hit Rate, Coverage 측정" },
  { label: "결과", desc: "Hybrid α=0.1: Hit Rate 35.90% (인기 추천 수준 유지) + Coverage 109배 확장" },
  { label: "액션 아이템", desc: "Hybrid 모델 홈 피드 도입 / Cold Start 대응 / 실시간 A/B 테스트 설계" },
]

export default function Landing() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">
        패션 커머스 개인화 추천 A/B 테스트
      </h1>
      <p className="text-gray-500 mb-12">H&M 데이터셋 기반 추천 시스템 실험</p>
      <div className="flex flex-col gap-6">
        {steps.map((s, i) => (
          <div key={s.label} className="flex gap-5">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-sm flex items-center justify-center font-medium shrink-0">
                {i + 1}
              </div>
              {i < steps.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-2" />}
            </div>
            <div className="pb-6">
              <p className="text-sm font-medium text-gray-900 mb-1">{s.label}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}