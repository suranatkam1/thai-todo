import { Layers } from 'lucide-react'
import { CATEGORIES, CATEGORY_ORDER } from '../constants'

export default function Sidebar({ todos, category, onSelect }) {
  const count = (k) => todos.filter((t) => t.category === k).length
  const items = [
    { key: 'all', label: 'ทุกหมวดหมู่', n: todos.length, dot: null },
    ...CATEGORY_ORDER.map((k) => ({ key: k, label: CATEGORIES[k].label, n: count(k), dot: CATEGORIES[k].dot })),
  ]

  return (
    <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2" aria-label="หมวดหมู่">
      <p className="hidden md:block text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 pt-2 pb-1">หมวดหมู่</p>
      <ul className="flex md:flex-col gap-1 overflow-x-auto">
        {items.map((it) => (
          <li key={it.key} className="shrink-0 md:shrink">
            <button
              onClick={() => onSelect(it.key)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition whitespace-nowrap ${
                category === it.key ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {it.dot ? <span className={`w-2 h-2 rounded-full ${it.dot}`} /> : <Layers size={14} />}
              <span className="flex-1 text-left">{it.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-md ${category === it.key ? 'bg-indigo-100' : 'bg-gray-100 text-gray-500'}`}>
                {it.n}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
