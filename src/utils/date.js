const pad = (n) => String(n).padStart(2, '0')

export const toISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
export const todayISO = () => toISO(new Date())
export const addDaysISO = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return toISO(d)
}

// 'none' | 'overdue' | 'today' | 'upcoming'  (ISO strings compare correctly as text)
export function dueStatus(due) {
  if (!due) return 'none'
  const t = todayISO()
  if (due < t) return 'overdue'
  if (due === t) return 'today'
  return 'upcoming'
}

export function formatDue(due) {
  const [y, m, d] = due.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })
}
