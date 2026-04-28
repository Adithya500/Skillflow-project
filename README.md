# SkillFlow Visualizer: A Full-Stack Web Implementation

## Project Architecture
This application utilizes a **Decoupled Full-Stack Architecture**. By separating the data layer from the presentation layer, the app achieves better scalability and modularity.

* **Backend:** Node.js & Express.js. Serves a RESTful API at `/api/skills`.
* **Frontend:** React (Vite) & D3.js. Handles state management and complex SVG rendering.
* **Layout:** Modern CSS Flexbox for a responsive, centered dashboard.

## Key Web Development Features
- **Asynchronous Data Fetching:** Uses the Fetch API within React hooks to retrieve data from the Express backend.
- **RESTful Design:** The backend serves structured JSON, mimicking real-world data-driven applications.
- **Interactive SVG Manipulation:** Uses the D3 library to manipulate the DOM dynamically, creating a physics-based simulation.
- **Physics Constraints:** Includes custom Bounding Box logic to keep elements within the viewport, ensuring a professional User Experience.

## How to Run Locally

## Setup
1. Backend: `cd backend && npm install && node server.js`
2. Frontend: `cd frontend && npm install && npm start`
