# TawernaMTB (tawernamtb.pl) 🚵‍♂️🌲

A digital guide to bike parks and enduro trails featuring a review system, media galleries, POV videos, a public bike garage, and a carpooling module to easily arrange trips to the mountains.

---

## 🛠 Tech Stack

- **Backend:** Kotlin (Ktor/Spring Boot) + PostgreSQL
- **Frontend:** Angular (Signals, Leaflet.js / OpenStreetMap)

---

## 🚀 Roadmap

### ⏹ PHASE 1: Weekend MVP (In Progress)

- **Trail Database:** Comprehensive info on locations (`BIKE_PARK` / `MOUNTAIN_TRAIL`), geo-coordinates, and difficulty levels.
- **Media & Links:** YouTube POV video integration and photo galleries.
- **Interactive Dashboard:** Two-panel layout with dynamic filtering (Angular Signals) and an OpenStreetMap pinboard (Leaflet).
- **Admin Garage:** A public showcase of the founder's personal bikes and specs.

### 🔐 PHASE 2: Auth & User Features

- Secure authentication via **JWT** and Role-Based Access Control (`ROLE_ADMIN` / `ROLE_USER`).
- Community reviews and ratings (1-5 stars).
- **"Ridden on..." Feature:** Users can tag which bike from their virtual garage they used to tackle a specific trail.

### 🚗 PHASE 3: Community & Logistics

- **Bike Carpooling:** A trip planner to share rides, specifying available seats in the car and slots on the bike rack.
- **Live Trail Alerts:** Quick crowd-sourced reports on trail conditions (e.g., fallen trees) that auto-expire after 48 hours.
- **Bike Passport:** Check-in at locations, track riding stats, and earn community ranks.

---

## ⚡ Quick Start

### Backend

1. Configure your PostgreSQL database credentials.
2. Run the application via your IDE or `./gradlew bootRun`.

### Frontend

1. Navigate to the frontend directory: `cd apps/tawerna-mtb-ui`
2. Install dependencies: `pnpm install`
3. Start the dev server: `pnpm start` (available at `http://localhost:4200`)
