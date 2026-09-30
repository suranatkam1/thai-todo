import { useEffect, useRef, useState } from 'react'
import { Check, Trash2 } from 'lucide-react'
import { PRIORITY } from '../constants'

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onCyclePriority }) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(todo.text)
  const inputRef = useRef(null)

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

  return (
    <li className={`todo todo-in mb-3 ${todo.removing ? 'removing' : ''}`}>
      <div className="flex items-center gap-3 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow px-4 py-3 border border-gray-100">
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
          onClick={() => onCyclePriority(todo.id)}
          title="คลิกเพื่อเปลี่ยนความสำคัญ"
          className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ring-1 ring-inset ${p.cls}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
          {p.label}
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          aria-label="ลบ"
          className="shrink-0 p-2 -mr-1 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  )
}
