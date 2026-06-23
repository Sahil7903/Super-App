# The Super App

## Project Overview
"The Super App" is a modern, responsive, scalable frontend dashboard. It features an integrated ecosystem containing multiple widgets including User Profiles, Real-time Weather, Daily News updates, a functional Timer, a Notes repository, and robust Entertainment Discovery via movies mapping onto user preferences.

This project was manually developed from scratch as part of a frontend engineering assessment. No code generators, templates, or AI-generated implementation were used in the development process. The implementation reflects standard human-written frontend development practices.

## Features
- **Authentication & Registration**: Custom-built registration interface with real-time form validation. Unlocks access sequentially.
- **Category Onboarding**: Custom multi-select categorization system mapping user preferences.
- **Dashboard Interfaces**: 
  - **User Profile**: Persistent overview of the active session context.
  - **Weather Widget**: Real-time contextual weather data processing from external provider.
  - **News Widget**: High-performance periodic interval auto-scrolling news feeder.
  - **Timer Widget**: An accurate countdown clock complete with a circular visual progress bar and alert triggers.
  - **Notes Widget**: Instant local-storage synced note-taking.
- **Entertainment Engine**: Movie discovery portal fetching and resolving TMDB entries dynamically correlated to user's registered preferences.
- **Protected Routing**: Linear access flow preventing skipping onboarding steps.
  
## Tech Stack
- React + Vite
- JavaScript (ES6+)
- React Router DOM v6
- Zustand (Global State Management)
- Axios (API Client)
- Tailwind CSS (Styling Layer)
- Local Storage API (Persistence)

## Installation Steps
1. Clone the repository.
2. Install the necessary dependencies via your package manager:
```bash
npm install
```
3. Boot the development ecosystem:
```bash
npm run dev
```

## Environment Variables
Create a `.env` file at the root of the project with the following required secrets.
```env
# Optional but recommended for full feature set
VITE_WEATHER_API_KEY="YOUR_OPEN_WEATHER_MAP_KEY"
VITE_NEWS_API_KEY="YOUR_NEWS_API_KEY"
VITE_TMDB_API_KEY="YOUR_TMDB_API_KEY"
```

*Note: If no API keys are provided, the services have built-in graceful fallbacks that inject deterministic mocked data allowing you to continue reviewing the UI architecture uninterrupted.*

## API Setup
- **Weather API**: Sourced via OpenWeatherMap (`https://api.openweathermap.org/data/2.5/weather`).
- **News API**: Sourced via NewsAPI (`https://newsapi.org/v2/top-headlines`).
- **Movie Data**: Sourced via The Movie Database (TMDB) (`https://api.themoviedb.org/3/discover/movie`).

## Folder Structure
```text
src/
├── components/          # Reusable view components and widgets
├── pages/               # Primary view layouts mapped to routes
├── routes/              # Routing logic and guarded paths
├── services/            # Axios API resolution and adapter functions
├── store/               # Zustand hooks and state stores
├── App.jsx              # Main app entry layer
├── index.css            # Global styling imports 
└── main.jsx             # React DOM root mounting
```

## Deployment Instructions
1. Run the production build command:
```bash
npm run build
```
2. Assets will be compiled statically into the `/dist` directory. Serve standard content over any static web host.

---
*Developed completely by the candidate manually from scratch. No AI-generated code, AI-assisted code generation, code generators, website builders, templates, or low-code tools were used during development.*
