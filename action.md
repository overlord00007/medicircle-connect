# Repository Analysis & Action Plan

## Current State Analysis
**Tech Stack**: Vite + React + TypeScript + Tailwind + Shadcn UI
**Backend**: FastAPI (Integrated via Proxy) / Mock Data fallback

## Component Inventory
- **Pages**:
    - `Login.tsx`: Recent overhaul (2x2 Grid + OTP). Needs refactor for Tabs (Login/Signup).
    - `admin/AdminDashboard.tsx`
    - `doctor/DoctorDashboard.tsx`: Needs flow fixes.
    - `patient/PatientDashboard.tsx`: Needs complete Chat-First redesign.
    - `pharmacist/PharmacistDashboard.tsx`: Needs expansion.
- **Components**:
    - `ui/*`: Full Shadcn suite available (49 components).
    - `layout/`: Dashboard layouts.

## Findings
- **Tech Stack Match**: The current stack (Vite + React) is robust. Migrating to Next.js would be high-risk/low-reward for this refactor.
- **Authentication**: `Login.tsx` is already advanced but needs to be split into a Tabbed view to support the new "Sign Up" wizard.
- **Styling**: Tailwind is already configured (`tailwind.config.ts` exists).
- **State**: `AuthContext` exists. Will likely need a `PatientContext` for the chat flow.
- **Routing**: `App.tsx` handles routing. Will need to add the new Sign Up routes or handle it within the Auth wrapper.
