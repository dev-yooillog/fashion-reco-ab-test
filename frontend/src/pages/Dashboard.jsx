import { useQuery } from "@tanstack/react-query"
import { fetchAbResults } from "../api/client"
import StatCard from "../components/StatCard"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts"

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["ab-results"],
    queryFn: fetchAbResults,
  })

  if (isLoading) return <div className="p-12 text-gray-400 text-sm">불러오는 중...</div>
  if (isError) return <div className="p-12 text-red-400 text-sm">데이터를 불러올 수 없습니다.</div>

  const s = data.summary
  const chartData = [
    { name: "인기 추천\n(Control)", value: +(s.control_cvr * 100).toFixed(2) },
    { name: "Hybrid α=0.1\n(최종)", value: +(s.test_cvr * 100).toFixed(2) },
  ]

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-xl font-semibold text-gray-900 mb-8">A/B 테스트 결과</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Control Hit Rate" value={`${(s.control_cvr * 100).toFixed(2)}%`} sub="인기 추천" />
        <StatCard label="Hybrid Hit Rate" value={`${(s.test_cvr * 100).toFixed(2)}%`} sub="α=0.1" highlight />
        <StatCard label="Coverage 개선" value="109배" sub="인기 대비" highlight />
        <StatCard
          label="P-value"
          value={s.p_value?.toFixed(4) ?? "-"}
          sub={s.significant ? "유의미" : "비유의미"}
          highlight={s.significant}
        />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 mb-8">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Hit Rate 비교</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis unit="%" tick={{ fontSize: 12 }} domain={[0, 50]} />
            <Tooltip formatter={(v) => [`${v}%`, "Hit Rate"]} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={80}>
              <Cell fill="#B4B2A9" />
              <Cell fill="#1D9E75" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {data.segments && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-sm font-medium text-gray-700 mb-4">세그먼트별 결과</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 text-gray-500 font-normal">세그먼트</th>
                <th className="text-right py-2 px-4 text-gray-500 font-normal">Control</th>
                <th className="text-right py-2 px-4 text-gray-500 font-normal">Hybrid</th>
                <th className="text-right py-2 pl-4 text-gray-500 font-normal">Lift</th>
              </tr>
            </thead>
            <tbody>
              {data.segments.map((s) => (
                <tr key={s.segment} className="border-b border-gray-100">
                  <td className="py-3 pr-4 text-gray-700">{s.segment}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{(s.control_cvr * 100).toFixed(2)}%</td>
                  <td className="py-3 px-4 text-right text-gray-600">{(s.test_cvr * 100).toFixed(2)}%</td>
                  <td className="py-3 pl-4 text-right">
                    <span className="text-xs font-medium text-blue-600">
                      {s.lift > 0 ? "+" : ""}{s.lift.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}