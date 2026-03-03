# APS Dashboard - Cybersecurity Scanning Platform

A modern, professional B2B SaaS dashboard for automated penetration testing and vulnerability scanning. Built with React + Vite.

## Features

- 🔐 **Authentication System** - Sign up and login with form validation
- 📊 **Dashboard** - Real-time scan monitoring with severity statistics
- 🔍 **Scan Management** - View, filter, and sort security scans
- 📈 **Live Scan Console** - Real-time activity logs and verification loops
- 🎨 **Dark/Light Mode** - Seamless theme switching with localStorage persistence
- 📱 **Responsive Design** - Mobile-friendly interface
- 🚀 **Optimized Performance** - Reusable components and minimal bundle size

## Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: CSS Modules
- **Icons**: Custom SVG icon system
- **Deployment**: Vercel

## Project Structure

```
src/
├── assets/          # Images and static files
├── components/      # Reusable UI components
│   ├── AppShell.jsx
│   ├── AuthHero.jsx
│   ├── Breadcrumb.jsx
│   ├── Icons.jsx
│   ├── SeverityCounts.jsx
│   ├── Sidebar.jsx
│   ├── SocialButtons.jsx
│   ├── ThemeToggle.jsx
│   └── VulnerabilityBadges.jsx
├── context/         # React context providers
│   └── ThemeContext.jsx
├── data/           # Static data and constants
│   └── data.js
├── pages/          # Page components
│   ├── Dashboard.jsx
│   ├── Login.jsx
│   ├── ScanDetail.jsx
│   └── SignUp.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd aps-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

Or connect your Git repository to Vercel Dashboard for automatic deployments.

## Features Overview

### Authentication
- Sign up with first name, last name, email, and password
- Login with email and password
- Form validation on all fields
- User session persistence with localStorage

### Dashboard
- Organization metadata display
- Severity statistics (Critical, High, Medium, Low)
- Scan table with sorting and filtering
- Search functionality
- Progress tracking
- Vulnerability badges

### Scan Detail
- Live scan progress with circular indicator
- Stage-based workflow visualization
- Real-time console logs
- Activity log and verification loops
- Finding log with severity badges
- Status bar with metrics

### Theme System
- Dark and light mode support
- Persistent theme selection
- Smooth transitions
- Professional color schemes

## Color Palette

### Dark Theme
- Background: `#141414`
- Text: `#f5f5f5`
- Accent: `#0cc8a8` (Teal)
- Border: `#2a2a2a`

### Light Theme
- Background: `#ffffff`
- Text: `#111111`
- Accent: `#0aa88c` (Teal)
- Border: `#e5e5e5`

### Severity Colors
- Critical: Red (`#ef4444` / `#dc2626`)
- High: Orange (`#f97316` / `#ea6f0c`)
- Medium: Yellow (`#f59e0b` / `#d97706`)
- Low: Green (`#22c55e` / `#16a34a`)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Built with ❤️ for cybersecurity professionals
