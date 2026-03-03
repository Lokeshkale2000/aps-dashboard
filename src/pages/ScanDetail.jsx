import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell'
import ThemeToggle from '../components/ThemeToggle'
import Breadcrumb from '../components/Breadcrumb'
import SeverityCounts from '../components/SeverityCounts'
import { Ic } from '../components/Icons'
import { SCAN_DETAIL } from '../data/data'
import s from './ScanDetail.module.css'

const STAGE_ICONS = ['radar','mapPin','scans','zap','fileText']

const SEV = {
  critical: { cls:'sev-badge-critical', label:'Critical' },
  high:     { cls:'sev-badge-high',     label:'High'     },
  medium:   { cls:'sev-badge-medium',   label:'Medium'   },
  low:      { cls:'sev-badge-low',       label:'Low'      },
}

function LogLine({ parts }) {
  return (
    <span className={s.logLine}>
      {parts.map((p, i) => {
        if (p.t === 'url')     return <a key={i} href="#" className={s.tokUrl}     onClick={e=>e.preventDefault()}>{p.v}</a>
        if (p.t === 'path')    return <span key={i} className={s.tokPath}>{p.v}</span>
        if (p.t === 'code')    return <code key={i} className={s.tokCode}>{p.v}</code>
        if (p.t === 'header')  return <span key={i} className={s.tokHeader}>{p.v}</span>
        if (p.t === 'keyword') return <mark key={i} className={s.tokKw}>{p.v.replace(/\+\+/g,'')}</mark>
        return <span key={i}>{p.v}</span>
      })}
    </span>
  )
}

export default function ScanDetail() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('activity')
  const [progress, setProgress] = useState(0)
  const [consoleMin, setConsoleMin] = useState(false)
  const logRef = useRef(null)
  const sd = SCAN_DETAIL

  useEffect(() => {
    const t = setTimeout(() => {
      let p = 0
      const iv = setInterval(() => {
        p++; setProgress(p)
        if (p >= 18) clearInterval(iv)
      }, 60)
      return () => clearInterval(iv)
    }, 350)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (logRef.current && !consoleMin) {
      logRef.current.scrollTop = logRef.current.scrollHeight
    }
  })

  const R = 34, circ = 2 * Math.PI * R
  const dashOff = circ * (1 - progress / 100)

  const log = tab === 'activity' ? sd.activityLog : sd.verificationLoops
  const fCounts = sd.findings.reduce((acc, f) => { acc[f.severity] = (acc[f.severity]||0)+1; return acc }, {})

  return (
    <AppShell active="scans">
      <div className={s.page}>

        <header className={s.topbar}>
          <Breadcrumb items={[
            {type:'button',label:'Scan',path:'/dashboard'},
            {type:'icon',icon:'home'},
            {type:'separator',label:'/'},
            {type:'button',label:'Private Assets',path:'/dashboard'},
            {type:'separator',label:'/'},
            {type:'text',label:'New Scan'}
          ]} onNavigate={navigate} />
          <div className={s.topRight}>
            <ThemeToggle />
            <button className="btn btn-outline">Export Report</button>
            <button className="btn btn-danger">Stop Scan</button>
          </div>
        </header>

        <div className={s.progressCard}>
          <div className={s.ringWrap}>
            <svg width="86" height="86" viewBox="0 0 86 86" className={s.ringsvg}>
              <circle cx="43" cy="43" r={R} fill="none" stroke="var(--border-2)" strokeWidth="4.5" />
              <circle
                cx="43" cy="43" r={R} fill="none"
                stroke="var(--teal)" strokeWidth="4.5" strokeLinecap="round"
                strokeDasharray={circ} strokeDashoffset={dashOff}
                transform="rotate(-90 43 43)"
                style={{transition:'stroke-dashoffset .3s ease'}}
              />
            </svg>
            <div className={s.ringLabel}>
              <span className={s.ringPct}>{progress}%</span>
              <span className={s.ringStatus}>In Progress</span>
            </div>
          </div>

          <div className={s.rightSection}>
            <div className={s.stages}>
              {sd.stages.map((stg, i) => (
                <div key={stg} className={s.stageGroup}>
                  <div className={`${s.stage} ${i === sd.activeStage ? s.stageActive : i < sd.activeStage ? s.stageDone : ''}`}>
                    <div className={s.stageCircle}>
                      <Ic n={STAGE_ICONS[i] || 'scans'} size={14} />
                    </div>
                    <span className={s.stageLabel}>{stg}</span>
                  </div>
                  {i < sd.stages.length - 1 && (
                    <div className={`${s.stageLine} ${i < sd.activeStage ? s.stageLineDone : ''}`} />
                  )}
                </div>
              ))}
            </div>

            <div className={s.metaGrid}>
              {[
                ['Scan Type',   sd.scanType,    false],
                ['Targets',     sd.target,      true ],
                ['Started At',  sd.startedAt,   false],
                ['Credentials', sd.credentials, true ],
                ['Files',       sd.files,       false],
                ['Checklists',  sd.checklists,  true ],
              ].map(([label, val, accent]) => (
                <div key={label} className={s.metaItem}>
                  <span className={s.metaLabel}>{label}</span>
                  <span className={`${s.metaValue} ${accent ? s.metaAccent : ''}`}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={s.bottom}>

          <div className={s.console}>
            <div className={s.consoleHeader}>
              <div className={s.consoleTitle}>
                <span className={s.consoleDot} />
                <span>Live Scan Console</span>
              </div>
              <div className={s.consoleRunning}>
                <span className={s.pulse} />
                Running...
              </div>
              <div className={s.winBtns}>
                <button className={s.winBtn} onClick={() => setConsoleMin(m => !m)} title={consoleMin ? 'Restore' : 'Minimise'}>
                  <Ic n="minus" size={10} />
                </button>
                <button className={s.winBtn} title="Close">
                  <Ic n="x" size={10} />
                </button>
              </div>
            </div>

            {!consoleMin && (
              <>
                <div className={s.consoleTabs}>
                  <button className={`${s.consoleTab} ${tab==='activity'?s.tabActive:''}`} onClick={() => setTab('activity')}>Activity Log</button>
                  <button className={`${s.consoleTab} ${tab==='loops'?s.tabActive:''}`} onClick={() => setTab('loops')}>Verification Loops</button>
                </div>
                <div className={s.consoleBody} ref={logRef}>
                  {log.map((entry, i) => (
                    <div key={i} className={s.logEntry}>
                      <span className={s.logTime}>[{entry.time}]</span>
                      <LogLine parts={entry.parts} />
                    </div>
                  ))}
                  <div className={s.cursor}><span className={s.caret}>▌</span></div>
                </div>
              </>
            )}

            <div className={s.statusBar}>
              <div className={s.statusLeft}>
                <span className={s.statusItem}>
                  <span className={s.statusDot} style={{background:'var(--t3)'}} />
                  Sub-Agents: <strong>{sd.statusBar.subAgents}</strong>
                </span>
                <span className={s.statusSep}>·</span>
                <span className={s.statusItem}>
                  <span className={s.statusDot} style={{background:'var(--t3)'}} />
                  Parallel: <strong>{sd.statusBar.parallel}</strong>
                </span>
                <span className={s.statusSep}>·</span>
                <span className={s.statusItem}>
                  <span className={s.statusDot} style={{background:'var(--teal)'}} />
                  Operations: <strong>{sd.statusBar.operations}</strong>
                </span>
              </div>
              <div className={s.statusRight}>
                <span className={s.sevCount} style={{color:'var(--critical)'}}>● {fCounts.critical||0}</span>
                <span className={s.sevCount} style={{color:'var(--high)'}}>● {fCounts.high||0}</span>
                <span className={s.sevCount} style={{color:'var(--medium)'}}>● {fCounts.medium||0}</span>
                <span className={s.sevCount} style={{color:'var(--low)'}}>● {fCounts.low||0}</span>
              </div>
            </div>
          </div>

          <div className={s.findings}>
            <div className={s.findingsHeader}>
              <span className={s.findingsTitle}>Finding Log</span>
            </div>
            <div className={s.findingsList}>
              {sd.findings.map(f => {
                const sev = SEV[f.severity]
                return (
                  <div key={f.id} className={s.finding}>
                    <div className={s.findingTop}>
                      <span className={`sev-badge ${sev.cls}`}>{sev.label}</span>
                      <span className={s.findingTime}>{f.time}</span>
                    </div>
                    <p className={s.findingTitle}>{f.title}</p>
                    <p className={s.findingPath}>{f.path}</p>
                    <p className={s.findingDesc}>{f.desc}</p>
                  </div>
                )
              })}
            </div>
            <div className={s.findingsFooter}>
              <SeverityCounts counts={fCounts} style={{fontSize:11,fontWeight:600}} />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
