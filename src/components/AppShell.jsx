import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Ic } from './Icons'
import s from './AppShell.module.css'

export default function AppShell({ active, children }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const onNav = id => {
    setOpen(false)
    if (id === 'dashboard') navigate('/dashboard')
    else if (id === 'scans') navigate('/scan')
    else navigate('/dashboard')
  }

  return (
    <div className={s.shell}>
      <button className={s.ham} onClick={() => setOpen(o => !o)} aria-label="Menu">
        <Ic n="menu" size={19} />
      </button>
      {open && <div className={s.overlay} onClick={() => setOpen(false)} />}
      <div className={`${s.sidebarWrap} ${open ? s.open : ''}`}>
        <Sidebar active={active} onNav={onNav} />
      </div>
      <main className={s.main}>{children}</main>
    </div>
  )
}
