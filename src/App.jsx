import { useRef, useState } from 'react'
import { Inbox, Plus } from 'lucide-react'
import TodoItem from './components/TodoItem'
import { PRIORITY, PRIORITY_ORDER } from './constants'

const TABS = [
  ['all', 'ทั้งหมด'],
  ['active', 'ยังไม่เสร็จ'],
  ['done', 'เสร็จแล้ว'],
]

const INITIAL = [
  { id: 1, text: 'ส่งรายงานประจำสัปดาห์', done: false, priority: 'high' },
  { id: 2, text: 'ซื้อของเข้าบ้าน', done: false, priority: 'medium' },
  { id: 3, text: 'อ่านหนังสือ 20 หน้า', done: true, priority: 'low' },
]

export default function App() {
  const [todos, setTodos] = useState(INITIAL)
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [filter, setFilter] = useState('all')
  const nextId = useRef(4)

  const add = () => {
    const t = input.trim()
    if (!t) return
    setTodos((ts) => [{ id: nextId.current++, text: t, done: false, priority }, ...ts])
    setInput('')
  }

  const toggle = (id) =>
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))

  const edit = (id, text) =>
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, text } : t)))

  const cyclePriority = (id) =>
    setTodos((ts) =>
      ts.map((t) =>
        t.id === id
          ? { ...t, priority: PRIORITY_ORDER[(PRIORITY_ORDER.indexOf(t.priority) + 1) % 3] }
          : t
      )
    )

  const remove = (id) => {
    setTodos((ts) => ts.map((t) => (t.id === id ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((ts) => ts.filter((t) => t.id !== id)), 250)
  }

  const clearDone = () => {
    setTodos((ts) => ts.map((t) => (t.done ? { ...t, removing: true } : t)))
    setTimeout(() => setTodos((ts) => ts.filter((t) => !t.done)), 250)
  }

  const remaining = todos.filter((t) => !t.done).length
  const doneCount = todos.filter((t) => t.done).length
  const shown = todos.filter((t) =>
    filter === 'all' ? true : filter === 'active' ? !t.done : t.done
  )
  const emptyText =
    filter === 'done'
      ? 'ยังไม่มีงานที่เสร็จ'
      : filter === 'active'
      ? 'ไม่มีงานค้าง เยี่ยมมาก!'
      : 'ยังไม่มีงาน เพิ่มงานแรกได้เลย'

  return (
    <main className="max-w-xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">รายการงานของฉัน</h1>
      <p className="text-gray-500 mb-6 text-sm">จัดการงานประจำวันให้เป็นระเบียบ</p>

      <div className="bg-white rounded-2xl shadow-md p-4 mb-5 border border-gray-100">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && add()}
            placeholder="เพิ่มงานใหม่..."
            className="flex-1 min-w-0 rounded-xl border border-gray-200 px-3.5 py-2.5 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
          <button
            onClick={add}
            aria-label="เพิ่มงาน"
            className="shrink-0 inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-medium rounded-xl px-4 transition"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">เพิ่ม</span>
          </button>
        </div>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <span className="text-xs text-gray-500">ความสำคัญ:</span>
          {PRIORITY_ORDER.map((k) => (
            <button
              key={k}
              onClick={() => setPriority(k)}
              className={`text-xs font-medium px-3 py-1 rounded-full ring-1 ring-inset transition ${
                priority === k
                  ? `${PRIORITY[k].cls} shadow-sm`
                  : 'bg-white text-gray-400 ring-gray-200 hover:text-gray-600'
              }`}
            >
              {PRIORITY[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex bg-gray-200/70 rounded-xl p-1 mb-5">
        {TABS.map(([k, label]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`flex-1 text-sm py-2 rounded-lg font-medium transition ${
              filter === k ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12 text-center text-gray-400">
          <Inbox size={36} className="mx-auto mb-2" />
          <p>{emptyText}</p>
        </div>
      ) : (
        <ul>
          {shown.map((t) => (
            <TodoItem
              key={t.id}
              todo={t}
              onToggle={toggle}
              onDelete={remove}
              onEdit={edit}
              onCyclePriority={cyclePriority}
            />
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between mt-4 text-sm">
        <span className="text-gray-500">
          เหลืออีก <b className="text-gray-800">{remaining}</b> งาน
        </span>
        <button
          onClick={clearDone}
          disabled={doneCount === 0}
          className={`px-3 py-1.5 rounded-lg font-medium transition ${
            doneCount === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-rose-600 hover:bg-rose-50'
          }`}
        >
          ล้างงานที่เสร็จแล้ว ({doneCount})
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-8">
        ดับเบิลคลิกที่ข้อความเพื่อแก้ไข · คลิกป้ายความสำคัญเพื่อเปลี่ยนระดับ
      </p>
    </main>
  )
}
