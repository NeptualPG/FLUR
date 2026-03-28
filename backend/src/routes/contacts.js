const { Router } = require('express');
const Contact = require('../models/Contact');

const router = Router();

// GET /api/contacts – list all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts.' });
  }
});

// GET /api/contacts/:id – get a single contact
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found.' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contact.' });
  }
});

// POST /api/contacts – save a new contact point
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const contact = await Contact.create({ name, email, phone, message });
    res.status(201).json(contact);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: err.errors.map((e) => e.message).join(', ') });
    }
    res.status(500).json({ error: 'Failed to save contact.' });
  }
});

// DELETE /api/contacts/:id – remove a contact
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) return res.status(404).json({ error: 'Contact not found.' });
    await contact.destroy();
    res.json({ message: 'Contact deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact.' });
  }
});

module.exports = router;
