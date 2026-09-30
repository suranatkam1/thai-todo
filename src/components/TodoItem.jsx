import { useEffect, useRef, useState } from 'react'
import { CalendarDays, Check, Trash2, X } from 'lucide-react'
import { CATEGORIES, PRIORITY } from '../constants'
import { dueStatus, formatDue } from '../utils/date'

const DUE_CLS = {
  overdue: 'bg-red-50 text-red-700 ring-red-300',
  today: 'bg-yellow-50 text-yellow-800 ring-yellow-300',
  upcoming: 'bg-gray-50 text-gray-600 ring-gray-200',
  none: 'bg-white text-gray-400 ring-gray-200 ring-dashed',
}

export default function TodoItem({
  todo, onToggle, onDelete, onEdit, onCyclePriority, onCycleCategory, onSetDue,
}) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const inputRef = useRef(null)
  const dateRef = useRef(null)

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editing])

  const save = () => {
    const t = text.trim()
    if (t) onEdit(todo.id, t)
    else setText(todo.text)
    setEditing(false)
  }

  const p = PRIORITY[todo.priority]
  const c = CATEGORIES[todo.category]
  // completed tasks are never flagged as overdue / due today
  const status = todo.done && todo.due ? 'upcoming' : dueStatus(todo.due)
  const rawStatus = dueStatus(todo.due)
  const dueLabel = !todo.due
    ? 'กำหนดวัน'
    : todo.done ? formatDue(todo.due)
    : rawStatus === 'overdue' ? `เลยกำหนด · ${formatDue(todo.due)}`
    : rawStatus === 'today' ? 'วันนี้'
    : formatDue(todo.due)

  return (
    <li className={`todo todo-in mb-3 ${todo.removing ? 'removing' : ''}`}>
      <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow px-4 py-3 border border-gray-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggle(todo.id)}
            aria-label="ทำเครื่องหมายเสร็จ"
            className={`shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
              todo.done
                ? 'bg-indigo-600 border-indigo-600 text-white'
                : 'border-gray-300 hover:border-indigo-400 text-transparent'
            }`}
          >
            <Check size={14} strokeWidth={3} />
          </button>

          <div className="flex-1 min-w-0">
            {editing ? (
              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={save}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') save()
                  if (e.key === 'Escape') { setText(todo.text); setEditing(false) }
                }}
                className="w-full border-b-2 border-indigo-400 outline-none bg-transparent text-gray-800 py-0.5"
              />
            ) : (
              <span
                onDoubleClick={() => { setText(todo.text); setEditing(true) }}
                title="ดับเบิลคลิกเพื่อแก้ไข"
                className={`block break-words cursor-text select-none transition-colors ${
                  todo.done ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {todo.text}
              </span>
            )}
          </div>

          <button
            onClick={() => onDelete(todo.id)}
            aria-label="ลบ"
            className="shrink-0 p-2 -mr-1 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-2 pl-9 flex-wrap">
          <button
            onClick={() => onCyclePriority(todo.id)}
            title="คลิกเพื่อเปลี่ยนความสำคัญ"
            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset ${p.cls}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
            {p.label}
          </button>

          <button
            onClick={() => onCycleCategory(todo.id)}
            title="คลิกเพื่อเปลี่ยนหมวดหมู่"
            className={`text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset ${c.cls}`}
          >
            # {c.label}
          </button>

          <span className="relative inline-flex items-center">
            <button
              onClick={() => dateRef.current?.showPicker?.() ?? dateRef.current?.click()}
              title="เลือกวันกำหนดส่ง"
              className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset ${DUE_CLS[status]}`}
            >
              <CalendarDays size={12} />
              {dueLabel}
            </button>
            <input
              ref={dateRef}
              type="date"
              value={todo.due || ''}
              onChange={(e) => onSetDue(todo.id, e.target.value)}
              tabIndex={-1}
              className="absolute inset-0 w-full h-full opacity-0 pointer-events-none"
            />
            {todo.due && (
              <button
                onClick={() => onSetDue(todo.id, '')}
                aria-label="ล้างวันกำหนด"
                className="ml-1 p-0.5 rounded-full text-gray-300 hover:text-gray-600"
              >
                <X size={12} />
              </button>
            )}
          </span>
        </div>
      </div>
    </li>
  )
}
