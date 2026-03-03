import { createContext, useContext, useState, useEffect } from 'react'
const Ctx = createContext()
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('aps-theme') || 'dark')
  const isDark = theme === 'dark'
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('aps-theme', theme)
  }, [theme])
  const toggle = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return <Ctx.Provider value={{ theme, isDark, toggle }}>{children}</Ctx.Provider>
}
export const useTheme = () => useContext(Ctx)
