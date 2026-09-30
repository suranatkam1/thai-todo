export const PRIORITY = {
  low:    { label: 'ต่ำ',     cls: 'bg-emerald-50 text-emerald-700 ring-emerald-200', dot: 'bg-emerald-500' },
  medium: { label: 'ปานกลาง', cls: 'bg-amber-50 text-amber-700 ring-amber-200',       dot: 'bg-amber-500' },
  high:   { label: 'สูง',     cls: 'bg-rose-50 text-rose-700 ring-rose-200',          dot: 'bg-rose-500' },
}
export const PRIORITY_ORDER = ['low', 'medium', 'high']

export const CATEGORIES = {
  work:     { label: 'งาน',       cls: 'bg-blue-50 text-blue-700 ring-blue-200',       dot: 'bg-blue-500' },
  personal: { label: 'ส่วนตัว',   cls: 'bg-violet-50 text-violet-700 ring-violet-200', dot: 'bg-violet-500' },
  shopping: { label: 'ช้อปปิ้ง',  cls: 'bg-pink-50 text-pink-700 ring-pink-200',       dot: 'bg-pink-500' },
  health:   { label: 'สุขภาพ',    cls: 'bg-teal-50 text-teal-700 ring-teal-200',       dot: 'bg-teal-500' },
}
export const CATEGORY_ORDER = ['work', 'personal', 'shopping', 'health']
