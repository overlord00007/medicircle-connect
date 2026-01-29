# Medicircle Connect

## Project Overview
Medicircle Connect is an AI-powered Pharmacovigilance platform designed to bridge the gap between patients, doctors, and pharmacists. It features a modern, accessible interface and a robust backend for real-time data processing.

## Tech Stack
-   **Frontend**: React + Vite + TypeScript + Tailwind CSS
-   **Backend**: Python FastAPI
-   **Database**: Neon DB (PostgreSQL)

## 🚀 How to Run the Project

### Prerequisites
1.  **Node.js** installed.
2.  **Python** installed.
3.  **Neon DB Connection String** configured in `backend/.env`.

### Option 1: The Easy Way (Windows)
We have provided a script to handle the backend startup for you.

1.  **Start Backend**:
    Double-click the `start_backend.bat` file in the root folder.
    *This will install Python dependencies and start the server at `http://localhost:8000`.*

2.  **Start Frontend**:
    Open a terminal in the root folder and run:
    ```bash
    npm run dev
    ```
    *This will start the UI at `http://localhost:8080` (or similar).*

### Option 2: Manual Setup

**Backend**:
```bash
cd backend
# Create virtual env (optional but recommended)
python -m venv venv
.\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Server
uvicorn main:app --reload
```

**Frontend**:
```bash
# In the root folder
npm install
npm run dev
```

## Features
-   **Patients**: Report side effects via a WhatsApp-style chat interface.
-   **Doctors**: View prioritized cases with AI severity analysis.
-   **Pharmacists**: Manage stock and view SOP guidelines.
-   **Admins**: Enlist new medicines and view analytic heatmaps.

## License
Private Property of Medicova.
