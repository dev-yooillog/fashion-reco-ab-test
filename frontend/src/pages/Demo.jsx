import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchRecommendations, fetchRandomUser } from "../api/client"
import ItemCard from "../components/ItemCard"

export default function Demo() {
  const [userId, setUserId] = useState("")
  const [submittedId, setSubmittedId] = useState("")

  const { data: popularData, isLoading: popularLoading } = useQuery({
    queryKey: ["recommend", submittedId, "popular"],
    queryFn: () => fetchRecommendations(submittedId, "popular"),
    enabled: !!submittedId,
  })

  const { data: hybridData, isLoading: hybridLoading } = useQuery({
    queryKey: ["recommend", submittedId, "hybrid"],
    queryFn: () => fetchRecommendations(submittedId, "hybrid"),
    enabled: !!submittedId,
  })

  const { refetch: fetchRandom, isFetching: randomFetching } = useQuery({
    queryKey: ["random-user"],
    queryFn: fetchRandomUser,
    enabled: false,
  })

  const handleRandom = async () => {
    const result = await fetchRandom()
    if (result.data?.user_id) {
      setUserId(result.data.user_id)
      setSubmittedId(result.data.user_id)
    }
  }

  const handleSubmit = () => {
    if (userId.trim()) setSubmittedId(userId.trim())
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">실시간 추천 비교</h2>

      <div className="flex gap-3 mb-10">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="유저 ID 입력"
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
        >
          추천 보기
        </button>
        <button
          onClick={handleRandom}
          disabled={randomFetching}
          className="px-5 py-2 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50 disabled:opacity-50"
        >
          랜덤 유저
        </button>
      </div>

      {submittedId && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-4">Control — 인기 추천</p>
            {popularLoading ? (
              <p className="text-sm text-gray-400">불러오는 중...</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {popularData?.items?.slice(0, 6).map((item) => (
                  <ItemCard key={item.article_id} item={item} />
                ))}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm font-medium text-blue-600 mb-4">Hybrid α=0.1 — 개인화 추천</p>
            {hybridLoading ? (
              <p className="text-sm text-gray-400">불러오는 중...</p>
            ) : (
              <div className="grid grid-cols-3 gap-3">
                {hybridData?.items?.slice(0, 6).map((item) => (
                  <ItemCard key={item.article_id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  )
}