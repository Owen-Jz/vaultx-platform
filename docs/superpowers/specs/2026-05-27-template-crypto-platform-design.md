# Template: Crypto Investment Platform — Design Spec

**Date:** 2026-05-27  
**Source reference:** `C:\Users\owen\Downloads\Projects\tescryptvest2`  
**Target:** `C:\Users\owen\Downloads\Projects\sites\template`

---

## 1. Project Overview

A full-featured cryptocurrency investment platform duplicated from `tescryptvest2` into the `template` folder, migrated to TypeScript and upgraded with the parent sites project's design system and component patterns. The platform simulates a crypto investment product: users register, receive a starting balance, can request deposits/withdrawals, and view their portfolio. Admins approve transactions and manage users.

---

## 2. Technology Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15.1.0, App Router | Same as source |
| Language | TypeScript (strict) | Upgrade from JS |
| Styling | Tailwind CSS 3.4 | Parent's config with dark/gold design tokens |
| Database | MongoDB + Mongoose 8.x | Same as source |
| Auth | JWT via `jose`, bcrypt, httpOnly cookies | Same pattern as source |
| Animation | GSAP 3.x | Replace Framer Motion |
| State | Zustand 5.x | Replace ad-hoc state |
| Charts | TradingView widget + Chart.js | Same as source |
| Validation | Zod 3.x | Same as source |
| Smooth scroll | Lenis | From parent project |
| Icons | Lucide React | Replace react-icons |
| HTTP client | Axios | Same as source |

---

## 3. Design System

Adopted from the parent sites project's `tailwind.config.js`:

**Colors:**
- Background: Primary `#0A0C10`, Secondary `#111318`, Elevated `#181B22`
- Accent: Gold `#C9A85C`
- Text: Primary `#F8F7F4`, Secondary `#A8A5A0`, Muted `#6B6860`
- Status: Success `#4ADE80`, Warning `#FBBF24`, Danger `#F87171`

**Typography:**
- Display: Sora
- Body: DM Sans
- Code/mono: JetBrains Mono

**Animations:** Fade-in, fade-in-up, slide-in, glow-pulse, float (all via Tailwind custom keyframes)

---

## 4. Route Architecture

### Public Routes (no auth required)
| Route | Page | Notes |
|---|---|---|
| `/` | Landing/Home | Hero, stats, pricing, reviews, trust, CTA |
| `/auth/login` | Login | Email + password form |
| `/auth/signup` | Registration | fname, lname, email, password |
| `/auth/forgotpassword` | Password recovery | Email-based reset |
| `/trading` | Trading page | TradingView + Binance real-time data |
| `/about` | About | Company info |
| `/contact` | Contact | Contact form |

### Protected Routes (JWT session required)
| Route | Page |
|---|---|
| `/dashboard` | Portfolio overview |
| `/dashboard/deposit` | Deposit history + request |
| `/dashboard/chart` | Portfolio charts |
| `/dashboard/settings` | Profile management |
| `/dashboard/support` | Support chat |
| `/dashboard/withdraw` | Withdrawal request |

### Admin Routes (admin cookie required)
| Route | Page |
|---|---|
| `/admin` | Admin dashboard (users, deposits, withdrawals) |

---

## 5. Database Schema (MongoDB)

### Collection: `users`
```ts
{
  _id: ObjectId
  fname: string
  lname: string
  email: string       // unique
  password: string    // bcrypt hashed
  date_joined: Date
  role?: string
}
```

### Collection: `stats`
```ts
{
  _id: ObjectId
  userId: ObjectId
  profit: number
  btc: number
  total: number       // USD balance
  createdAt: Date
}
```

### Collection: `deposits`
```ts
{
  _id: ObjectId
  userId: ObjectId
  crypto: string
  amount: number
  total: number
  status: 'pending' | 'approved' | 'rejected'
  date: Date
  type: string
}
```

### Collection: `withdrawals`
```ts
{
  _id: ObjectId
  userId: ObjectId
  crypto: string
  amount: number
  total: number
  status: 'pending' | 'approved' | 'rejected'
  date: Date
  walletAddress: string
}
```

---

## 6. Authentication Architecture

1. **Registration:** Zod validates → bcrypt hashes password → user saved to MongoDB → auto-create stats record with $100 starting balance → JWT session created (7-day) → redirect to dashboard
2. **Login:** Zod validates → password compared with bcrypt → JWT created → stored as httpOnly cookie → redirect to dashboard
3. **Session:** `jose` signs/verifies JWT; `createSession()` / `deleteSession()` utilities in `lib/sessions.ts`
4. **Middleware:** `/dashboard` and `/dashboard/*` require valid session cookie; redirect to `/auth/login` if missing; redirect to `/dashboard` if already logged in and hitting auth routes
5. **Admin auth:** Cookie-based with hardcoded credentials; `adminLoggedIn` cookie; 1-hour expiry

---

## 7. Component Architecture

### UI primitives (`components/ui/`)
Reusable, unstyled-then-themed components:
- `Button` — variants: primary, secondary, ghost, danger
- `Card` — elevated, default variants
- `Input` — with label, error state, helper text
- `Modal` — portal-based overlay with backdrop
- `Badge` — status, info, warning, danger variants
- `Skeleton` — loading placeholder
- `Toast` — success/error notifications

### Feature components (`components/features/`)
Domain-specific components:
- `WelcomeSection` — balance, profit, BTC display
- `ActivityTable` — deposits/withdrawals history
- `DepositModal` — deposit request form
- `WithdrawModal` — withdrawal request form
- `Sidebar` — left nav for dashboard
- `AdminUserTable` — user list with edit
- `AdminDepositQueue` — pending deposits with approve action
- `AdminWithdrawQueue` — pending withdrawals with approve action
- `CryptoMarquee` — scrolling live price ticker
- `TradingChart` — TradingView widget wrapper
- `SupportChat` — floating support widget

### Layout components (`components/layouts/`)
- `DashboardLayout` — sidebar + main content
- `AdminLayout` — admin sidebar + main
- `AuthLayout` — centered card layout for auth pages
- `PublicLayout` — navbar + footer wrapper

---

## 8. Server Actions (App Router)

### `lib/actions/auth.ts`
- `register(formData)` — validate, hash, insert user, create session
- `login(formData)` — validate, verify, create session
- `logout()` — delete session cookie

### `lib/actions/dashboard.ts`
- `getUserStats()` — fetch stats for current session user
- `getUserDeposits()` — fetch deposit history
- `getUserWithdrawals()` — fetch withdrawal history
- `requestDeposit(data)` — insert pending deposit
- `requestWithdrawal(data)` — insert pending withdrawal
- `getFullName()` — get user name
- `updateSettings(data)` — update fname, email, password

### `lib/actions/admin.ts`
- `adminLogin(data)` — set admin cookie
- `adminLogout()` — clear admin cookie
- `getAllUsers()` — list users with stats
- `getAllDeposits()` — all deposit records
- `getAllWithdrawals()` — all withdrawal records
- `approveDeposit(id)` — mark approved, credit user balance
- `approveWithdrawal(id)` — mark approved
- `updateUserStats(userId, data)` — edit user stats

---

## 9. UI Improvements Over tescryptvest2

| Area | tescryptvest2 | Template (improved) |
|---|---|---|
| Language | JavaScript | TypeScript strict |
| Colours | Ad-hoc hex values | Design token system |
| Animations | Framer Motion + vanilla-tilt | GSAP with scroll triggers |
| Loading states | None/spinner | Skeleton components |
| Form UX | Submit-only errors | Inline real-time Zod errors |
| Icons | react-icons (large bundle) | Lucide React (tree-shakeable) |
| State mgmt | useState scattered | Zustand stores |
| Scroll | Default browser | Lenis smooth scroll |
| Mobile sidebar | Basic fixed pos | Slide-in with overlay |
| Admin auth | Hardcoded in actions | Env-var credentials |

---

## 10. Environment Variables

```env
MONGODB_URI=         # MongoDB Atlas connection string
SESSION_SECRET=      # JWT signing secret (32+ chars)
ADMIN_USERNAME=      # Admin login username
ADMIN_PASSWORD=      # Admin login password (hashed at runtime)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

---

## 11. File Structure

```
template/
├── app/
│   ├── (public)/
│   │   ├── page.tsx              # Landing
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── trading/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   └── forgotpassword/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── dashboard/deposit/page.tsx
│   │   ├── dashboard/chart/page.tsx
│   │   ├── dashboard/settings/page.tsx
│   │   ├── dashboard/support/page.tsx
│   │   └── dashboard/withdraw/page.tsx
│   ├── (admin)/
│   │   ├── layout.tsx
│   │   └── admin/page.tsx
│   ├── layout.tsx                # Root layout
│   └── globals.css
├── components/
│   ├── ui/                       # Primitives
│   └── features/                 # Domain components
├── lib/
│   ├── actions/                  # Server actions
│   ├── db.ts                     # MongoDB connection
│   ├── sessions.ts               # JWT utilities
│   ├── getAuthUser.ts            # Session helper
│   ├── validations.ts            # Zod schemas
│   └── gsap.ts                   # GSAP config
├── hooks/
│   └── useScrollAnimation.ts
├── types/
│   └── index.ts                  # Shared TypeScript types
├── public/
├── middleware.ts
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 12. Out of Scope

- Real payment processing
- Real crypto trading execution
- Email-based password reset (UI only, no actual email send required)
- Clerk auth integration (use custom JWT only)
- Real-time WebSocket price updates (polling via Binance REST API is sufficient)
