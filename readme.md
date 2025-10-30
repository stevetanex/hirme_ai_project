# 🚀 HireMe AI: Full-Stack Job Portal

A modern job board application designed for employers to post jobs and job seekers to browse, search, and manage applications, built using the MERN stack.

## 🌟 Core Features

* **Role-Based Authentication:** Separate login/registration for 'Employer' and 'Job Seeker'.
* **Employer Management:** Protected dashboard for creating, reading, updating, and deleting (CRUD) job posts.
* **Advanced Job Search:** Filtering by **Title, Location, Skills, and Salary Range**.
* **Server-Side Pagination:** Efficiently loads job listings.
* **Responsive UI:** Built with React and Tailwind CSS.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | **React.js** + **Tailwind CSS** (for responsive design) |
| **Backend** | **Node.js** + **Express.js** |
| **Database** | **MongoDB Atlas** (Cloud NoSQL) |
| **Authentication** | **JWT** (JSON Web Tokens) |
| **Deployment** | Vercel (Frontend) / Render (Backend) |

## ⚙️ Setup and Installation

### A. Backend Setup (`hireme-ai/backend`)

1.  **Install dependencies:** `npm install`
2.  **Create `.env`:** Create a `.env` file and add your MongoDB Atlas URI and JWT Secret:
    ```
    PORT=5000
    MONGO_URI="YOUR_ATLAS_URI"
    JWT_SECRET="YOUR_SECRET"
    ```
3.  **Run the server:** `npm start` (or `nodemon server.js`)

### B. Frontend Setup (`hireme-ai/frontend`)

1.  **Install dependencies:** `npm install`
2.  **Set API URL:** Update the `API_BASE_URL` in files like `AuthContext.jsx` and `JobListPage.jsx` to point to your **deployed Render backend URL** (once deployed).
3.  **Run the client:** `npm run dev` (or `npm start`)
