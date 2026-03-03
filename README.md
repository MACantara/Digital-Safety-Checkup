# 🛡️ Digital Safety Checkup

A free, privacy-first web app that guides users through a personal cybersecurity checklist. Work through 37 practical security checks across 8 categories, learn why each one matters, and get a prioritized action plan to close any gaps.

**Everything runs entirely in the browser — no account, no server, no data collection.**

---

## Features

- **37 weighted checklist items** across 8 security categories
- **Weighted scoring system** — Critical items count 4×, High 3×, Medium 2×, Low 1×
- **Educational tip panels** — every item has a plain-English explanation and a concrete action step
- **Results & action plan** — see a prioritized list of what to fix, with full guidance for each gap
- **Per-category progress** — collapsible category cards with progress bars and a sticky sidebar
- **Persistent progress** — checked items are saved to `localStorage` and survive page refreshes
- **Responsive layout** — works on desktop and mobile

### Categories covered

| # | Category | Items |
|---|---|---|
| 1 | 🔑 Passwords & Authentication | 5 |
| 2 | 📱 Two-Factor Authentication | 5 |
| 3 | 🔄 Software & Device Updates | 4 |
| 4 | 🎣 Email & Phishing Awareness | 5 |
| 5 | 💻 Device & Network Security | 6 |
| 6 | 🔒 Social Media & Privacy | 4 |
| 7 | 💾 Data Backups | 4 |
| 8 | 🌐 Safe Browsing | 5 |

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 19 | UI framework |
| [Vite](https://vite.dev) | 7 | Build tool & dev server |
| [React Router](https://reactrouter.com) | 7 | Client-side routing |

No other runtime dependencies. All styling is plain CSS (no CSS framework).

---

## Project Structure

```
src/
├── data/
│   └── checklistData.js       # All 37 items, categories, scoring logic
├── components/
│   ├── Header.jsx / .css      # Sticky top nav with progress counter
│   ├── CategoryCard.jsx / .css # Collapsible category with progress bar
│   ├── CheckItem.jsx / .css   # Individual checklist row with severity badge
│   ├── TipPanel.jsx / .css    # Modal overlay with why/action for each item
│   └── ScoreGauge.jsx / .css  # Animated SVG arc gauge
├── pages/
│   ├── Welcome.jsx / .css     # Landing page with category overview
│   ├── Checklist.jsx / .css   # Main checklist page with sidebar
│   └── Results.jsx / .css     # Score, breakdown, and action plan
├── App.jsx                    # Root component, routing, shared state
├── index.css                  # Global styles and button system
└── main.jsx                   # App entry point
```

### Routes

| Path | Page |
|---|---|
| `/` | Welcome / landing |
| `/checklist` | Interactive checklist |
| `/results` | Score, category breakdown, action plan |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (included with Node.js)

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other Commands

```bash
# Type-check and lint
npm run lint

# Build for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

---

## How the Scoring Works

Each checklist item has a severity level that determines how much it contributes to the overall score:

| Severity | Weight | Example |
|---|---|---|
| Critical | 4 | Using unique passwords, enabling 2FA on email |
| High | 3 | Using a password manager, disk encryption |
| Medium | 2 | Ad blocker, social media privacy settings |
| Low | 1 | Privacy-respecting search engine |

**Score = (sum of weights for completed items) / (sum of all weights) × 100**

This means fixing a single *Critical* item raises your score more than fixing four *Low* items.
