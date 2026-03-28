# FLUR – Aura Essentials

Aura Essentials is a modern, aesthetic frontend catalog for lifestyle products, featuring a minimalist design and seamless contact integration via WhatsApp and social media.

---

## Project Structure

```
FLUR/
├── backend/          # Node.js + Express REST API (Sequelize ORM + SQLite)
│   ├── src/
│   │   ├── app.js            # Express entry point
│   │   ├── config/
│   │   │   └── database.js   # Sequelize / SQLite configuration
│   │   ├── models/
│   │   │   └── Contact.js    # Contact ORM model
│   │   └── routes/
│   │       └── contacts.js   # REST routes for contact points
│   ├── .env.example
│   └── package.json
└── frontend/         # Static HTML/CSS/JS storefront
    ├── index.html
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

---

## Backend – Quick Start

```bash
cd backend
cp .env.example .env      # adjust values if needed
npm install
npm start                  # server starts on http://localhost:3001
```

### API Endpoints

| Method | Path                | Description                  |
|--------|---------------------|------------------------------|
| GET    | /api/contacts       | List all contact submissions |
| GET    | /api/contacts/:id   | Get a single contact         |
| POST   | /api/contacts       | Save a new contact point     |
| DELETE | /api/contacts/:id   | Remove a contact             |
| GET    | /health             | Health check                 |

**POST body (JSON):**

```json
{
  "name":    "Jane Doe",
  "email":   "jane@example.com",
  "phone":   "+1 555 000-0000",
  "message": "I'd love to know more about your products!"
}
```

---

## Frontend – Quick Start

Open `frontend/index.html` directly in a browser, or serve it with any static server:

```bash
npx serve frontend
```

The contact form submits to the backend API at `http://localhost:3001/api/contacts`.
To change the API base URL, edit `API_BASE` at the top of `frontend/js/main.js`.
