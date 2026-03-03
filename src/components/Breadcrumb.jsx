import { Ic } from './Icons'
import s from './Breadcrumb.module.css'

export default function Breadcrumb({ items, onNavigate }) {
  return (
    <div className={s.breadcrumb}>
      {items.map((item, i) => (
        <span key={i}>
          {item.type === 'button' ? (
            <button className={s.btn} onClick={() => onNavigate?.(item.path)}>{item.label}</button>
          ) : item.type === 'icon' ? (
            <span className={s.btn}><Ic n={item.icon} size={14} /></span>
          ) : item.type === 'separator' ? (
            <span className={s.sep}>{item.label}</span>
          ) : (
            <span className={s.active}>{item.label}</span>
          )}
        </span>
      ))}
    </div>
  )
}
