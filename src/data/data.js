// ─── APS Platform — Static Data ──────────────────────────────────────────

export const ORG = {
  name: 'Project X', owner: 'Nammgiri',
  totalScans: 100, scheduled: 1000, rescans: 100, failedScans: 100,
}

export const SEVERITY_STATS = [
  { key: 'critical', label: 'Critical Severity', count: 86, change: '+2.5%', up: true  },
  { key: 'high',     label: 'High Severity',     count: 16, change: '+0.9%', up: true  },
  { key: 'medium',   label: 'Medium Severity',   count: 26, change: '-0.9%', up: false },
  { key: 'low',      label: 'Low Severity',      count: 16, change: '+0.9%', up: true  },
]

export const SCANS = [
  { id:1,  name:'Web App Servers', type:'Greybox',  status:'Completed', progress:100, vuln:{c:1,h:2,m:3,l:1}, ago:'4d ago' },
  { id:2,  name:'Web App Servers', type:'Greybox',  status:'Completed', progress:100, vuln:{c:2,h:1,m:2,l:2}, ago:'4d ago' },
  { id:3,  name:'Web App Servers', type:'Greybox',  status:'Completed', progress:100, vuln:{c:1,h:3,m:1,l:1}, ago:'4d ago' },
  { id:4,  name:'Web App Servers', type:'Greybox',  status:'Completed', progress:100, vuln:{c:3,h:2,m:2,l:1}, ago:'4d ago' },
  { id:5,  name:'Web App Servers', type:'Greybox',  status:'Completed', progress:100, vuln:{c:1,h:1,m:3,l:2}, ago:'4d ago' },
  { id:6,  name:'Web App Servers', type:'Greybox',  status:'Completed', progress:100, vuln:{c:2,h:2,m:1,l:3}, ago:'4d ago' },
  { id:7,  name:'Web App Servers', type:'Greybox',  status:'Completed', progress:100, vuln:{c:1,h:2,m:2,l:1}, ago:'4d ago' },
  { id:8,  name:'Web App Servers', type:'Greybox',  status:'Scheduled', progress:100, vuln:{c:1,h:5,m:0,l:0}, ago:'4d ago' },
  { id:9,  name:'Web App Servers', type:'Greybox',  status:'Scheduled', progress:100, vuln:{c:1,h:4,m:0,l:0}, ago:'4d ago' },
  { id:10, name:'IoT Devices',     type:'Blackbox', status:'Failed',    progress:10,  vuln:{c:2,h:1,m:2,l:3}, ago:'3d ago' },
  { id:11, name:'Temp Data',       type:'Blackbox', status:'Failed',    progress:10,  vuln:{c:1,h:2,m:3,l:2}, ago:'3d ago' },
  { id:12, name:'API Endpoints',   type:'Greybox',  status:'Completed', progress:100, vuln:{c:0,h:1,m:2,l:4}, ago:'2d ago' },
  { id:13, name:'Mobile Backend',  type:'Blackbox', status:'Scheduled', progress:60,  vuln:{c:1,h:2,m:0,l:0}, ago:'1d ago' },
  { id:14, name:'Cloud Infra',     type:'Greybox',  status:'Completed', progress:100, vuln:{c:4,h:3,m:5,l:2}, ago:'5d ago' },
]

export const SCAN_DETAIL = {
  scanType:'Grey Box', target:'google.com', startedAt:'Nov 22, 09:00AM',
  credentials:'2 Active', files:'Control.pdf', checklists:'40/350',
  stages:['Spidering','Mapping','Testing','Validating','Reporting'],
  activeStage: 0,
  activityLog: [
    { time:'09:00:00', parts:[{t:'plain',v:"I'll begin a systematic penetration test on "},{t:'url',v:'helpdesk.democorp.com'},{t:'plain',v:". Let me start with reconnaissance and enumeration."}] },
    { time:'09:01:00', parts:[{t:'plain',v:'Good! Target is online. Now let me perform port scanning to identify running services.'}] },
    { time:'09:02:00', parts:[{t:'plain',v:'Excellent reconnaissance results:\n  \u2022 '},{t:'url',v:'helpdesk.democorp.com'},{t:'plain',v:': Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure.'}] },
    { time:'09:03:00', parts:[{t:'plain',v:'Great! I found a login page for a Help Desk Platform. I can see a useful comment: "TODO: Delete the testing account ('},{t:'code',v:'test:test'},{t:'plain',v:'). Let me test this credential. The login redirects to '},{t:'path',v:'/password/test'},{t:'plain',v:'. Let me follow that path and explore it.'}] },
    { time:'09:04:00', parts:[{t:'plain',v:'The POST method is not allowed on '},{t:'path',v:'/password/test'},{t:'plain',v:'. Let me check what the JavaScript does — it posts to '},{t:'code',v:"'#'"},{t:'plain',v:' which means the current page. Let me try a different approach.'}] },
    { time:'09:05:00', parts:[{t:'plain',v:'It redirects back to '},{t:'path',v:'/password/test'},{t:'plain',v:". Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the "},{t:'code',v:'test:test'},{t:'plain',v:' password directly on other endpoints.'}] },
    { time:'09:06:00', parts:[{t:'plain',v:'Great! I can access the dashboard using the '},{t:'header',v:'"X-UserId: 10032"'},{t:'plain',v:' header. The dashboard shows "Welcome, John Doe". This suggests an '},{t:'keyword',v:'++IDOR vulnerability++'},{t:'plain',v:" — I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application..."}] },
  ],
  verificationLoops: [
    { time:'09:10:00', parts:[{t:'plain',v:'Running verification loop on '},{t:'path',v:'/api/users/profile'},{t:'plain',v:' endpoint...'}] },
    { time:'09:11:00', parts:[{t:'plain',v:'SQL injection payload confirmed. Extracting database schema via '},{t:'code',v:"' OR 1=1--"},{t:'plain',v:' payload...'}] },
    { time:'09:12:00', parts:[{t:'plain',v:'Verification complete. Vulnerability validated with '},{t:'keyword',v:'3 different payloads'},{t:'plain',v:'. Confidence: HIGH.'}] },
  ],
  findings: [
    { id:'f1', severity:'critical', title:'SQL Injection in Authentication Endpoint', path:'/api/users/profile', desc:'We found blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.', time:'18:40:05' },
    { id:'f2', severity:'high',     title:'Unauthorized Access to User Metadata',     path:'/api/auth/login',   desc:'Non-privileged user was able to access metadata of other users. Access control checks were missing.', time:'18:45:23' },
    { id:'f3', severity:'medium',   title:'Broken Authentication Rate Limiting',       path:'/api/search',       desc:'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',    time:'19:10:22' },
  ],
  statusBar: { subAgents:0, parallel:0, operations:3, counts:{critical:0,high:0,medium:0,low:0} },
}

export const NAV_MAIN   = [{id:'dashboard',label:'Dashboard'},{id:'projects',label:'Projects'},{id:'scans',label:'Scans'},{id:'schedule',label:'Schedule'}]
export const NAV_BOTTOM = [{id:'notifications',label:'Notifications'},{id:'settings',label:'Settings'},{id:'support',label:'Support'}]
