import { useNavigate } from 'react-router-dom'
import { Ic } from './Icons'
import ThemeToggle from './ThemeToggle'
import { NAV_MAIN, NAV_BOTTOM } from '../data/data'
import s from './Sidebar.module.css'

export default function Sidebar({ active, onNav }) {
  const navigate = useNavigate()
  const userEmail = localStorage.getItem('userEmail') || 'adminedu.com'
  const userInitial = userEmail.charAt(0).toUpperCase()
  
  const Item = ({ item }) => (
    <li>
      <button className={`${s.item} ${active === item.id ? s.active : ''}`} onClick={() => onNav(item.id)}>
        <span className={s.icon}><Ic n={item.id} size={15} /></span>
        <span className={s.label}>{item.label}</span>
      </button>
    </li>
  )
  return (
    <aside className={s.sidebar}>
      <button className={s.logo} onClick={() => navigate('/dashboard')}>
        <span className={s.logoDot} />
        <span className={s.logoText}>aps</span>
      </button>
      <nav className={s.nav}>
        <ul className={s.list}>{NAV_MAIN.map(i => <Item key={i.id} item={i} />)}</ul>
        <div className={s.darkSection}>
          <ul className={s.list}>{NAV_BOTTOM.map(i => <Item key={i.id} item={i} />)}</ul>
          <div className={s.themeRow}><ThemeToggle /></div>
        </div>
      </nav>
      <div className={s.bottom}>
        <div className={s.user}>
          <span className={s.avatar}>{userInitial}</span>
          <div className={s.userInfo}>
            <p className={s.userName}>{userEmail}</p>
            <p className={s.userRole}>Security Lead</p>
          </div>
          <Ic n="chevronRight" size={13} color="var(--t3)" />
        </div>
      </div>
    </aside>
  )
}
