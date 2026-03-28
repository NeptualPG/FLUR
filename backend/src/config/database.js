const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

const dbStorage = process.env.DB_STORAGE || path.join(__dirname, '../../data/contacts.db');

// Ensure the data directory exists
const dataDir = path.dirname(dbStorage);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbStorage,
  logging: false,
});

module.exports = sequelize;
