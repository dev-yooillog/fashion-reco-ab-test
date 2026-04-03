import { Link, useLocation } from "react-router-dom"

const links = [
  { to: "/", label: "소개" },
  { to: "/dashboard", label: "A/B 결과" },
  { to: "/demo", label: "추천 데모" },
]

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <nav className="border-b border-gray-200 bg-white px-6 py-4 flex items-center gap-8">
      <span className="font-semibold text-gray-900">Fashion Reco</span>
      <div className="flex gap-6">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`text-sm ${
              pathname === l.to
                ? "text-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}