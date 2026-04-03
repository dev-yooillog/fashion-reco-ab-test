export default function ItemCard({ item }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col gap-2">
      <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center px-2">
        {item.article_id}
      </div>
      <p className="text-sm font-medium text-gray-800 truncate">
        {item.product_type_name || "-"}
      </p>
      <p className="text-xs text-gray-400">
        {item.colour_group_name || ""}
        {item.price_tier ? ` · ${item.price_tier}` : ""}
      </p>
    </div>
  )
}
