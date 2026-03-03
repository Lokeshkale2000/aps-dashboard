import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import ThemeToggle from '../components/ThemeToggle'
import Breadcrumb from '../components/Breadcrumb'
import VulnerabilityBadges from '../components/VulnerabilityBadges'
import { Ic } from '../components/Icons'
import { ORG, SEVERITY_STATS, SCANS } from '../data/data'
import s from './Dashboard.module.css'

const STATUS_CLASS = { Completed:'chip-done', Scheduled:'chip-sched', Failed:'chip-fail' }
const PROG_CLASS   = { Completed:'progTeal',  Scheduled:'progAmber',  Failed:'progRed'   }

export default function Dashboard() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const userEmail = localStorage.getItem('userEmail') || 'Nammgiri'

  const filtered = SCANS.filter(sc =>
    sc.name.toLowerCase().includes(search.toLowerCase()) ||
    sc.type.toLowerCase().includes(search.toLowerCase()) ||
    sc.status.toLowerCase().includes(search.toLowerCase())
  )

  const sorted = sortKey
    ? [...filtered].sort((a,b) => {
        const av = a[sortKey], bv = b[sortKey]
        const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))
        return sortDir === 'asc' ? cmp : -cmp
      })
    : filtered

  const toggleSort = key => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const SortTh = ({ col, children }) => (
    <th className={s.th} onClick={() => toggleSort(col)} style={{cursor:'pointer',userSelect:'none'}}>
      <span style={{display:'flex',alignItems:'center',gap:4}}>
        {children}
        {sortKey === col && <Ic n='chevronRight' size={11} color="var(--teal)" style={{transform:sortDir==='asc'?'rotate(-90deg)':'rotate(90deg)'}}/>}
      </span>
    </th>
  )

  const metaItems = [
    ['Org', ORG.name],
    ['Owner', userEmail],
    ['Total Scans', ORG.totalScans],
    ['Scheduled', ORG.scheduled],
    ['Rescans', ORG.rescans],
    ['Failed Scans', ORG.failedScans],
  ]

  return (
    <AppShell active="dashboard">
      <div className={s.page}>
        <header className={s.topbar}>
          <Breadcrumb items={[
            {type:'button',label:'Scan'},
            {type:'separator',label:'/'},
            {type:'button',label:'Private Assets'},
            {type:'separator',label:'/'},
            {type:'text',label:'New Scan'}
          ]} />
          <div className={s.topbarRight}>
            <ThemeToggle />
            <button className="btn btn-outline">Export Report</button>
            <button className="btn btn-danger">Stop Scan</button>
          </div>
        </header>

        <div className={s.metaSevContainer}>
          <div className={s.metaBar}>
            <div className={s.metaItems}>
              {metaItems.map(([k,v], i, arr) => (
                <>
                  <span key={k} className={s.metaPair}><span className={s.metaK}>{k}</span><strong className={s.metaV}>{v}</strong></span>
                  {i < arr.length-1 && <span key={k+'d'} className={s.metaDot} />}
                </>
              ))}
            </div>
            <div className={s.metaRefresh}>
              <Ic n="refresh" size={12} color="var(--t3)" />
              <span>10 mins ago</span>
            </div>
          </div>

          <div className={s.sevGrid}>
            {SEVERITY_STATS.map(sv => (
              <div key={sv.key} className={s.sevCard}>
                <div className={s.sevTop}>
                  <span className={`${s.sevDot} ${s['sevDot_'+sv.key]}`} />
                  <span className={s.sevLabel}>{sv.label}</span>
                </div>
                <div className={s.sevCountChange}>
                  <div className={`${s.sevCount} ${s['sevCount_'+sv.key]}`}>{sv.count}</div>
                  <div className={`${s.sevChange} ${sv.up ? s.changeUp : s.changeDn}`}>
                    {sv.up ? '↑' : '↓'} {sv.change} from yesterday
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={s.tableSection}>
          <div className={s.toolbar}>
            <div className={s.searchWrap}>
              <Ic n="search" size={13} color="var(--t3)" style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)',pointerEvents:'none'}} />
              <input className={s.searchInput} placeholder="Search scans by name or type..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className={s.toolbarBtns}>
              <button className="btn btn-ghost"><Ic n="filter" size={12} />Filter</button>
              <button className="btn btn-ghost"><Ic n="columns" size={12} />Column</button>
              <button className="btn btn-teal" onClick={() => navigate('/scan')}><Ic n="plus" size={12} />New scan</button>
            </div>
          </div>

          <div className={s.tableWrap}>
            <table className={s.table}>
              <thead>
                <tr>
                  <SortTh col="name">Scan Name</SortTh>
                  <th className={s.th}>Type</th>
                  <SortTh col="status">Status</SortTh>
                  <th className={s.th}>Progress</th>
                  <th className={s.th}>Vulnerability</th>
                  <SortTh col="ago">Last Scan</SortTh>
                </tr>
              </thead>
              <tbody>
                {sorted.map(sc => (
                  <tr key={sc.id} className={s.row} onClick={() => navigate('/scan')}>
                    <td className={s.tdName}>{sc.name}</td>
                    <td><span className={s.typeBadge}>{sc.type}</span></td>
                    <td><span className={`chip ${STATUS_CLASS[sc.status]}`}>{sc.status}</span></td>
                    <td>
                      <div className={s.progWrap}>
                        <div className={s.progTrack}>
                          <div className={`${s.progFill} ${s[PROG_CLASS[sc.status]]}`} style={{width:`${sc.progress}%`}} />
                        </div>
                        <span className={s.progPct}>{sc.progress}%</span>
                      </div>
                    </td>
                    <td>
                      <VulnerabilityBadges counts={sc.vuln} className={s.vulnRow} />
                    </td>
                    <td className={s.tdTime}>{sc.ago}</td>
                  </tr>
                ))}
                {sorted.length === 0 && (
                  <tr><td colSpan={6} className={s.empty}>No scans match your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
