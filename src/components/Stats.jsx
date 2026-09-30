import { dueStatus } from '../utils/date'

const R = 15.9155 // circumference = 100, so dash lengths are percentages

export default function Stats({ todos }) {
  const total = todos.length
  const done = todos.filter((t) => t.done).length
  const overdue = todos.filter((t) => !t.done && dueStatus(t.due) === 'overdue').length
  const active = total - done - overdue
  const pct = total ? Math.round((done / total) * 100) : 0

  const segments = [
    { label: 'เสร็จแล้ว', n: done, color: '#4f46e5' },
    { label: 'กำลังทำ', n: active, color: '#fbbf24' },
    { label: 'เลยกำหนด', n: overdue, color: '#ef4444' },
  ]
  let acc = 0

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4" aria-label="สถิติ">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">สถิติ</p>
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 shrink-0">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r={R} fill="none" stroke="#f3f4f6" strokeWidth="4.5" />
            {total > 0 &&
              segments.map((s) => {
                const len = (s.n / total) * 100
                const el = s.n > 0 && (
                  <circle
                    key={s.label}
                    cx="18" cy="18" r={R} fill="none"
                    stroke={s.color} strokeWidth="4.5"
                    strokeDasharray={`${len} ${100 - len}`}
                    strokeDashoffset={-acc}
                  />
                )
                acc += len
                return el
              })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-bold text-gray-800 leading-none">{pct}%</span>
            <span className="text-[10px] text-gray-400 mt-0.5">สำเร็จ</span>
          </div>
        </div>
        <ul className="text-sm space-y-1.5 flex-1">
          <li className="flex justify-between text-gray-700 font-medium">
            <span>ทั้งหมด</span><span>{total}</span>
          </li>
          {segments.map((s) => (
            <li key={s.label} className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 rounded-full" style={{ background: s.color }} />
              <span className="flex-1">{s.label}</span>
              <span>{s.n}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
