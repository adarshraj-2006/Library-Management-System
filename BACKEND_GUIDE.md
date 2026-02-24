# 📚 Library Management System — Backend Guide

> A comprehensive reference for backend features and security for a medium-level project.

---

## 🏗️ Backend Features

### 1. Authentication & User Management
- JWT-based Auth (Access Token + Refresh Token)
- User Registration / Login / Logout
- Role-based access control: `admin`, `member`, `librarian`
- Password hashing with **bcrypt**
- Email verification on signup
- Password reset via email (OTP or secure token link)

---

### 2. Book Management (CRUD)
- Add, edit, delete books *(admin only)*
- Search & filter books by title, author, genre, ISBN
- Pagination for book listings
- Book availability tracking (total copies vs. available copies)
- Book cover image upload *(Cloudinary or local storage)*

---

### 3. Borrow & Return System
- Issue a book to a member
- Return a book and update availability
- Track due dates and return dates
- Fine calculation for late returns
- Full borrow history per user

---

### 4. Notifications & Reminders
- Due date reminder emails
- Fine alert notifications
- New book arrival alerts *(optional)*

---

### 5. Admin Dashboard APIs
- Stats: total books, members, active borrows
- Overdue books report
- Top borrowed books analytics
- Member activity logs

---

### 6. Search & Filter
- Full-text search on books
- Filter by availability, genre, author
- Sorting: newest, most borrowed, alphabetical

---

### 7. File Upload
- Upload book cover images
- Validate file type (jpg, png, webp) and size limits

---

## 🔒 Security Features

### Authentication & Authorization

| Feature | Implementation |
|---|---|
| Password hashing | `bcrypt` with salt rounds ≥ 10 |
| JWT tokens | Access token (15min) + Refresh token (7 days) |
| Role guards | Middleware checks `admin`/`member` per route |
| Token blacklisting | Store revoked tokens in Redis or DB on logout |

---

### Input Validation & Sanitization
- Validate all request bodies with **Joi** or **Zod**
- Sanitize inputs to prevent **XSS attacks**
- Use **parameterized queries** / ORM to prevent **SQL Injection**

---

### Rate Limiting & Brute Force Protection
- Limit login attempts: max **5 failed attempts → 15min lockout**
- Rate limit all API routes: e.g., **100 requests / 15min per IP**
- Use `express-rate-limit` middleware

---

### API Security
- **Helmet.js** — sets secure HTTP headers
- **CORS** — whitelist only your frontend domain(s)
- **HTTPS only** in production
- Hide sensitive error details in API error responses
- Disable `X-Powered-By` header

---

### Data Security
- Never store plain-text passwords
- Encrypt sensitive fields where needed
- Store all secrets in `.env` (never commit to Git)
- Rotate JWT secrets periodically

---

### Logging & Monitoring
- Log all auth events: login, failed login, logout
- Log all admin actions: add/delete/edit books
- Use **Winston** or **Morgan** for structured logging
- Set up error monitoring with **Sentry** *(optional but recommended)*

---

## 📦 Recommended Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js + Express |
| Database | MongoDB (Mongoose) or PostgreSQL |
| Auth | JWT + bcrypt |
| Validation | Joi / Zod |
| File Upload | Multer + Cloudinary |
| Emails | Nodemailer + Gmail / Resend |
| Rate Limiting | express-rate-limit |
| Security Headers | Helmet.js |
| Logging | Winston + Morgan |
| Error Tracking | Sentry *(optional)* |

---

## 🗂️ API Route Structure

```
/api/auth        → register, login, logout, refresh-token, reset-password
/api/books       → CRUD, search, filter, pagination
/api/borrow      → issue book, return book, borrow history
/api/users       → view profile, update profile, admin user management
/api/fines       → view fines, pay/clear fines
/api/admin       → dashboard stats, reports, logs
```

---

## 🌳 Suggested Folder Structure

```
backend/
├── config/           # DB connection, env config
├── controllers/      # Route handler logic
├── middleware/       # Auth guard, role check, rate limit
├── models/           # Mongoose/Sequelize schemas
├── routes/           # API route definitions
├── services/         # Business logic (email, fine calc)
├── utils/            # Helpers (token generation, validators)
├── uploads/          # Temp file storage (if local)
├── .env              # Environment variables (git-ignored)
└── server.js         # Entry point
```

---

## ✅ Security Checklist Before Deployment

- [ ] All secrets stored in `.env`, not hardcoded
- [ ] `.env` added to `.gitignore`
- [ ] HTTPS enforced
- [ ] CORS restricted to frontend domain
- [ ] Rate limiting enabled on all routes
- [ ] JWT expiry set (short-lived access tokens)
- [ ] Input validation on all POST/PUT routes
- [ ] Error responses don't expose stack traces
- [ ] Admin routes protected by role middleware
- [ ] Logging enabled for auth and admin actions
