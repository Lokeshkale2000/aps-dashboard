# APS Dashboard - Application Flow

## 1. Authentication Flow

### Sign Up Page (/)
- User lands on Sign Up page with gradient background
- Left side: Hero section with branding and features
- Right side: Sign up form
- **Form Fields:**
  - First Name (required)
  - Last Name (required)
  - Email (required)
  - Password (required with show/hide toggle)
  - Terms & Privacy checkbox
- **Social Login Options:** Apple, Google, Meta
- **Validation:** All fields must be filled before submission
- **On Success:** Redirects to Login page

### Login Page (/login)
- Same layout as Sign Up page
- **Form Fields:**
  - Email (required)
  - Password (required with show/hide toggle)
- **Social Login Options:** Apple, Google, Meta
- **Validation:** Email and password must be filled
- **On Success:** 
  - Stores user email in localStorage
  - Redirects to Dashboard

## 2. Dashboard Flow (/dashboard)

### Layout
- **Sidebar (Left):**
  - APS logo
  - Navigation: Dashboard, Projects, Scans, Schedule
  - Notifications, Settings, Support
  - Theme toggle (Dark/Light mode)
  - User profile (shows logged-in user email and avatar)

- **Main Content:**
  - **Breadcrumb:** Scan / Private Assets / New Scan
  - **Action Buttons:** Export Report, Stop Scan, Theme Toggle
  
  - **Organization Meta Bar:**
    - Org name
    - Owner (logged-in user email)
    - Total Scans, Scheduled, Rescans, Failed Scans
    - Last refresh time
  
  - **Severity Cards (4 cards):**
    - Critical Severity (count + change %)
    - High Severity (count + change %)
    - Medium Severity (count + change %)
    - Low Severity (count + change %)
  
  - **Scans Table:**
    - Search functionality
    - Filter and Column options
    - New Scan button
    - **Columns:** Scan Name, Type, Status, Progress, Vulnerability, Last Scan
    - **Sortable:** Scan Name, Status, Last Scan
    - **Click Row:** Navigate to Scan Detail page

## 3. Scan Detail Flow (/scan)

### Layout
- **Breadcrumb:** Scan 🏠 / Private Assets / New Scan
- **Action Buttons:** Export Report, Stop Scan, Theme Toggle

### Progress Card
- **Left:** Circular progress indicator (86x86px black circle)
  - Shows percentage (e.g., 18%)
  - Status: "In Progress"
  
- **Right:** 
  - **Stages (5 stages):**
    - Spidering → Mapping → Testing → Validating → Reporting
    - Visual indicators for active/completed stages
  
  - **Scan Metadata (6 items):**
    - Scan Type, Targets, Started At
    - Credentials, Files, Checklists

### Live Scan Console
- **Header:** 
  - Live indicator (green dot)
  - "Running..." status
  - Minimize/Close buttons
  
- **Tabs:**
  - Activity Log (default)
  - Verification Loops
  
- **Console Body:**
  - Real-time log entries with timestamps
  - Syntax highlighting for URLs, paths, code, keywords
  - Auto-scroll to bottom
  
- **Status Bar:**
  - Sub-Agents count
  - Parallel operations
  - Total operations
  - Severity counts (Critical, High, Medium, Low)

### Finding Log
- **Header:** "Finding Log"
- **Findings List:**
  - Severity badge (Critical/High/Medium/Low)
  - Timestamp
  - Finding title
  - File path
  - Description
  
- **Footer:** Summary counts by severity

## 4. Theme System

### Dark Mode (Default)
- Background: `#141414`
- Text: `#f5f5f5`
- Accent: `#0cc8a8`
- Borders: `#2a2a2a`

### Light Mode
- Background: `#ffffff`
- Text: `#111111`
- Accent: `#0aa88c`
- Borders: `#e5e5e5`

### Toggle Behavior
- Click theme toggle button in sidebar or topbar
- Theme preference saved in localStorage
- Applied via `data-theme` attribute on document root
- Smooth transitions between themes

## 5. Data Persistence

### localStorage Keys
- `aps-theme`: Stores theme preference (dark/light)
- `userEmail`: Stores logged-in user email

### Usage
- **Theme:** Persists across sessions
- **User Email:** 
  - Displayed in sidebar user profile
  - Shown as "Owner" in dashboard meta bar
  - Used for personalization

## 6. Navigation Flow

```
Sign Up (/) 
  ↓ (on submit)
Login (/login)
  ↓ (on submit)
Dashboard (/dashboard)
  ↓ (click scan row or "New scan" button)
Scan Detail (/scan)
```

## 7. Key Components (Reusable)

- **AuthHero:** Left side hero section for auth pages
- **SocialButtons:** Apple, Google, Meta login buttons
- **Breadcrumb:** Navigation breadcrumb with separators
- **VulnerabilityBadges:** Colored badges for vulnerability counts
- **SeverityCounts:** Severity statistics display
- **ThemeToggle:** Dark/Light mode switcher
- **Sidebar:** Main navigation sidebar
- **AppShell:** Layout wrapper with sidebar

## 8. Responsive Design

### Breakpoints
- **Desktop:** Full layout with sidebar
- **Tablet (< 1024px):** Adjusted severity grid (2 columns)
- **Mobile (< 768px):** 
  - Collapsed sidebar (icon only)
  - Stacked layout
  - Hidden text labels
  - Single column forms

## 9. Color-Coded Severity System

- **Critical:** Red - Highest priority issues
- **High:** Orange - Important vulnerabilities
- **Medium:** Yellow - Moderate concerns
- **Low:** Green - Minor issues

Used consistently across:
- Severity cards
- Vulnerability badges
- Finding log badges
- Status bar indicators
