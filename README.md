# Campus Notifications Priority Inbox

A complete, production-ready React + TypeScript frontend application built with Material UI (MUI). It features a real-time Priority Engine that sorts notifications based on category weights, temporal recency, and read/unread status, and links with a central logging middleware system.

## Setup Instructions

### Prerequisites
Make sure you have Node.js (version 18+ recommended) and npm installed.

### 1. Install Dependencies
Navigate to the application folder and install the node packages:
```bash
cd notification_app_fe
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the `notification_app_fe/` root directory (or set them directly in your environment):
```env
VITE_API_BASE_URL=http://4.244.186.213/evaluation-service
VITE_ACCESS_TOKEN=your_bearer_token_here
```
*Note: The application will automatically fallback to default URLs if the variables are not set.*

### 3. Run Development Server
Start the local Vite server:
```bash
npm run dev
```
The application will launch on your default browser at `http://localhost:3000`.

### 4. Build for Production
To bundle the project for production:
```bash
npm run build
```

---

## Directory Structure

```
ROLL_NUMBER/
├── logging_middleware/
│   └── logger.ts              # Reusable log sender POSTing to evaluation logs
│
├── notification_app_fe/       # Frontend React Application root
│   ├── src/
│   │   ├── components/        # Functional layout elements
│   │   │   ├── Header.tsx           # Page banner & live status
│   │   │   ├── TopNSelector.tsx     # Limit selection dropdown
│   │   │   ├── NotificationCard.tsx # Detailed card view + priorities
│   │   │   └── NotificationList.tsx # Grid controller + skeletons + errors
│   │   │
│   │   ├── pages/             # View controllers
│   │   │   └── Dashboard.tsx        # Centered desktop & single column mobile view
│   │   │
│   │   ├── services/          # API layer
│   │   │   └── notificationApi.ts   # Fetch client with Auth headers
│   │   │
│   │   ├── utils/             # Helpers
│   │   │   ├── priorityCalculator.ts# Scoring algorithm and filters
│   │   │   └── constants.ts         # Global app constants and weights
│   │   │
│   │   ├── types/             # TypeScript definitions
│   │   │   └── notification.ts      # Strictly typed models
│   │   │
│   │   ├── App.tsx            # Main state controller
│   │   ├── main.tsx           # Application renderer
│   │   └── theme.ts           # MUI Theme overrides (Indigo & Teal)
│   │
│   ├── package.json           # Scripts and dependencies definitions
│   └── tsconfig.json          # Strict TypeScript compiler options
│
├── notification_system_design.md # Stage 1 Architecture & Algorithm specifications
└── README.md                  # Setup & guidelines documentation
```

---

## Core Implementations

### Priority Engine
Priority is calculated dynamically in the frontend client:
$$\text{Score} = \text{Weight} + \text{RecencyScore} + \text{UnreadBonus}$$
- **Weights**: Placement (`100`), Result (`80`), Event (`60`), Default (`40`).
- **Recency Score**: Linear decay of `1` point per hour from `100` down to `0`.
- **Unread Bonus**: Unread items receive a `+50` score boost to float to the top.

### Reusable Logging Middleware
The app routes lifecycle logs to `http://4.244.186.213/evaluation-service/logs`:
- Logs page view render events on load.
- Logs API transactions (success count, error states).
- Logs internal updates (priority calculations, count adjustments).
- Outputs to browser console in local developer builds.
