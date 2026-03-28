require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:8080';
app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

// Routes
app.use('/api/contacts', contactsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
  process.exit(1);
});

module.exports = app;
