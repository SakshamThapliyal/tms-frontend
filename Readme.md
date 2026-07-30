# Task Management System — Frontend

The Angular frontend for the Task Management System (TMS), a full-stack app for managing projects, tasks, and users with role-based access and a productivity dashboard.

This is the client application. It talks to the [TMS backend API](https://github.com/SakshamThapliyal/tms-backend) (ASP.NET Core 8 + PostgreSQL) for all data.

## Tech Stack

- **Framework:** Angular 16
- **UI:** Angular Material
- **Language:** TypeScript
- **Auth:** JWT-based, with route guards and an HTTP interceptor for token attachment
- **Styling:** SCSS

## Features

- 🔐 User authentication (login/register) with JWT
- 📁 Project management — create, search, paginate
- ✅ Task management — create, update status/priority, filter by project/assignee
- 📊 Dashboard with project stats and user productivity metrics
- 👥 User management (admin)
- 🛡️ Route guards for authenticated and admin-only routes

## Project Structure

```
src/app/
├── core/                # Guards, interceptors, core singleton services
├── modules/
│   ├── auth/             # Login, register
│   ├── dashboard/         # Dashboard + stats
│   ├── project/           # Project list, project form
│   ├── task/              # Task list, task form
│   └── user/              # User management
└── shared/               # Shared components (navbar, sidebar, dialogs), pipes
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- The [TMS backend API](https://github.com/SakshamThapliyal/tms-backend) running locally or deployed

## Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/vv-saksham-thapliyal/frontend.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the API URL**

   Update `src/environments/environment.development.ts` to point at your backend:
   ```typescript
   export const environment = {
     production: false,
     apiBaseUrl: 'http://localhost:5213/api'
   };
   ```

4. **Run the development server**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/`. The app reloads automatically on file changes.

## Building for Production

```bash
ng build
```
Build artifacts are output to `dist/`. This project is configured for deployment on [Vercel](https://vercel.com) — see `vercel.json` for the SPA rewrite rule needed for Angular client-side routing.

Before building for production, make sure `src/environments/environment.ts` points to your deployed backend URL:
```typescript
export const environment = {
  production: true,
  apiBaseUrl: 'https://your-backend-url.onrender.com/api'
};
```

## Running Unit Tests

```bash
ng test
```
Runs the unit tests via [Karma](https://karma-runner.github.io).

## Related

- **Backend API:** [tms-backend](https://github.com/SakshamThapliyal/tms-backend) — ASP.NET Core 8, PostgreSQL (Supabase), deployed on Render
