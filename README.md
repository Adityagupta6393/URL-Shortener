# 🔗 URL Shortener

A production-ready URL Shortener built with the MERN Stack that allows users to create, manage, and analyze shortened URLs with secure authentication, password protection, expiration, and detailed analytics.

---

## 🚀 Features

### 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Access Token + Refresh Token
- Refresh Token Rotation
- HTTP-only Cookies
- Email Verification
- Forgot Password
- Reset Password
- Logout
- Logout from All Devices
- Change Password
- Update Profile

---

### 🔗 URL Management

- Create Short URLs
- Custom Short Codes
- Password Protected URLs
- URL Expiration
- Activate / Deactivate URLs
- Delete URLs
- Copy Short URL
- QR Code Generation
- Search URLs
- Pagination

---

### 📊 Analytics

- Dashboard Overview
- Total URLs
- Active URLs
- Expired URLs
- Password Protected URLs
- Total Clicks
- Average Clicks per URL

Per URL Analytics

- Click Trends
- Browser Statistics
- Device Statistics
- Country Statistics
- Recent Activity

Overall Analytics

- Click Trends
- Browser Distribution
- Device Distribution
- Country Distribution
- Top Performing URLs

---

### 🛡 Security

- Password Hashing using bcrypt
- JWT Authentication
- Refresh Token Rotation
- HTTP-only Secure Cookies
- Helmet Security
- CORS Protection
- Rate Limiting
- Input Validation
- Protected Routes
- Password Protected Links

---

## 🏗 Tech Stack

### Frontend

- React 19
- Vite
- React Router
- React Query
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Recharts
- React Hot Toast
- React Icons

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Cookie Parser
- Helmet
- Morgan
- Express Rate Limit

### Email

- Brevo SMTP

### Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## 📂 Folder Structure

```
URL-Shortener
│
├── frontend
│   ├── src
│   ├── pages
│   ├── components
│   ├── routes
│   ├── api
│   ├── hooks
│   ├── context
│   └── utils
│
├── backend
│   ├── src
│   │   ├── modules
│   │   ├── middleware
│   │   ├── config
│   │   ├── models
│   │   ├── utils
│   │   └── routes
│
└── README.md
```

---

## ⚙ Installation

### Clone Repository

```bash
git clone [https://github.com/Adityagupta6393/URL-Shortener.git]
```

```bash
cd url-shortener
```

---

### Backend

```bash
cd backend
npm install
```

Create `.env`

```env
PORT=

MONGODB_URI=

JWT_ACCESS_SECRET=

JWT_REFRESH_SECRET=

BREVO_API_KEY=

FRONTEND_URL=
```

Run backend

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
```

Create `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend

```bash
npm run dev
```

---

## Authentication Flow

```text
Register
      │
      ▼
Verify Email
      │
      ▼
Login
      │
      ▼
Access Token
Refresh Token
      │
      ▼
Protected Routes
      │
      ▼
Auto Refresh
```

---

## URL Access Flow

```text
Open Short URL
        │
        ▼
Find URL
        │
        ├── Not Found
        ├── Expired
        ├── Inactive
        ├── Password Required
        │
        ▼
Increment Click
        │
        ▼
Store Analytics
        │
        ▼
Redirect
```

---

## Analytics Collected

Each successful visit stores

- Browser
- Device
- Operating System
- Country
- Click Time
- Referrer
- IP Address

---

## API Endpoints

### Authentication

```
POST    /api/auth/register
POST    /api/auth/login
POST    /api/auth/logout
POST    /api/auth/logoutall
POST    /api/auth/refresh

GET     /api/auth/profile

PATCH   /api/auth/updateprofile

POST    /api/auth/changepassword

POST    /api/auth/verify-email
POST    /api/auth/resend-verification

POST    /api/auth/forgot-password
POST    /api/auth/reset-password
```

---

### URLs

```
POST    /api/urls
GET     /api/urls
GET     /api/urls/:id
PATCH   /api/urls/:id
DELETE  /api/urls/:id

GET     /:shortCode
```

---

### Analytics

```
GET /api/analytics/dashboard
GET /api/analytics/top-urls
GET /api/analytics/recent-activity

GET /api/analytics/click-trends
GET /api/analytics/browsers
GET /api/analytics/devices
GET /api/analytics/countries
```

---

## Future Improvements

- QR Code Download
- Custom Domains
- Team Workspaces
- Link Scheduling
- Bulk URL Import
- Public Analytics
- AI-powered Link Insights
- Redis Caching
- Docker Support
- CI/CD Pipeline

---

## Screenshots

Add screenshots of
- Landing Page
  <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/7242027a-b10d-4c50-a162-7431d5efc7dd" />

- Login

  <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/1919ee0a-c700-48a7-8a48-ecbf90b73d15" />

- Dashboard

  <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/84bbf983-0632-4264-9f72-9e9d15fa0392" />

- URL Management

- <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/6cf83816-fbaf-4db1-88e5-603c48740489" />

- Analytics

  <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/b8b2d7fa-2046-4215-bd65-f8f69caee4fb" />

  <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/9a078cd5-d97b-43cd-84b0-ca194972ef9c" />

  <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/c10e8375-4ab4-4315-8bf0-1aeaaa53812e" />

- Create URL Modal

- <img width="526" height="450" alt="image" src="https://github.com/user-attachments/assets/06ca9ceb-b912-4c40-8a42-6ae5226391b4" />

- Profile

  <img width="946" height="497" alt="image" src="https://github.com/user-attachments/assets/f964f4cd-aebc-463b-8689-a2d8fba04e37" />

---

## License

This project is licensed under the MIT License.

---

## Author

**Aditya Gupta**

GitHub: [https://github.com/Adityagupta6393]

LinkedIn: [https://www.linkedin.com/in/aditya-gupta-delhi/]
