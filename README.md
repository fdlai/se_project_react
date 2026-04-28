# WTWR (What to Wear?)

## 🌐 Live Application

Frontend: https://wtwr.fredlai.dev
Backend API: https://api-wtwr.fredlai.dev

---

## 📌 About the Project

WTWR (What to Wear?) is a full-stack application that recommends clothing based on real-time weather data.

The frontend fetches weather data and user-specific clothing items from a custom backend API, processes the information, and dynamically displays outfit recommendations.

---

## 🏗️ Architecture

Frontend (GitHub Pages)
↓
Backend API (Docker on Google Cloud VM)
↓
MongoDB (Docker container with persistent volume)

- Frontend is deployed via GitHub Pages
- Backend is containerized using Docker and hosted on a cloud VM
- MongoDB runs in a Docker container with persistent storage
- Nginx is used as a reverse proxy for routing requests

---

## 🔗 Backend Integration

This frontend communicates with a production backend API that is:

- Containerized with Docker
- Deployed on a cloud VM
- Connected to a MongoDB database

Backend repository:
https://github.com/fdlai/se_project_express

---

## ✨ Features

- Semantic HTML5
- Responsive design (Flexbox, Media Queries)
- React component-based architecture
- User authentication (signup/login/logout)
- Protected routes
- Weather-based clothing recommendations
- User profile management
- API data fetching
- Full-stack deployment (frontend + backend + database)
- Cloud-hosted backend (Google Cloud VM)
- Docker-based backend infrastructure

---

## 🛠️ Tech Stack

- React
- JavaScript (ES6+)
- HTML5 / CSS3
- GitHub Pages (frontend hosting)
- REST API integration

---

## 🚀 Getting Started (Local Development)

### Prerequisites

- Node.js
- npm

### Installation

```bash
git clone https://github.com/fdlai/se_project_react.git
cd se_project_react
npm install
```

### Running the App

```bash
npm start
```

Then open:

```
http://localhost:3000
```

⚠️ Note: Requires backend server running locally (see backend repo).

---

## 🔮 Future Improvements

- Pagination for large clothing collections
- Advanced filtering (weather conditions, favorites, user items)
- Search and sorting functionality
- Item likes system
- Dark mode
- Improved form validation

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## 📬 Contact

Fred Lai
[fdlai@yahoo.com](mailto:fdlai@yahoo.com)

---

## 🔗 Links

- Live Site: https://wtwr.fredlai.dev
- Backend API: https://api-wtwr.fredlai.dev
- Frontend Repo: https://github.com/fdlai/se_project_react
- Backend Repo: https://github.com/fdlai/se_project_express
- Figma Design: https://www.figma.com/file/DTojSwldenF9UPKQZd6RRb/Sprint-10%3A-WTWR

---
