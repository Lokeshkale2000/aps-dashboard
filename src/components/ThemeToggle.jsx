import { useTheme } from '../context/ThemeContext'
import { Ic } from './Icons'
import s from './ThemeToggle.module.css'

export default function ThemeToggle({ compact }) {
  const { isDark, toggle } = useTheme()
  return (
    <button className={`${s.btn} ${compact ? s.compact : ''}`} onClick={toggle} title={`Switch to ${isDark ? 'light' : 'dark'} mode`}>
      <Ic n={isDark ? 'sun' : 'moon'} size={13} />
      {!compact && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
    </button>
  )
}
