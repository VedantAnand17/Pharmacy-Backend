const express = require('express');
const router = express.Router();
const Pharmacy = require('../models/Pharmacy');
const authenticateToken = require('../middleware/authenticateToken');

// Create a new pharmacy
router.post('/', authenticateToken, async (req, res) => {
  const { name, address, contact } = req.body;

  if (!name || !address || !contact) {
    return res.status(400).json({ message: 'Name, address, and contact are required' });
  }

  try {
    const pharmacy = new Pharmacy({ name, address, contact, user: req.user.id });
    await pharmacy.save();
    res.status(201).json(pharmacy);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all pharmacies or search by name
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { name } = req.query;
    let query = { user: req.user.id };

    if (name) {
      query.name = new RegExp(name, 'i'); // Case-insensitive search
    }

    const pharmacies = await Pharmacy.find(query);
    res.json(pharmacies);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a single pharmacy by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findById(req.params.id);
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });
    res.json(pharmacy);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a pharmacy
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, address, contact } = req.body;

  try {
    const pharmacy = await Pharmacy.findByIdAndUpdate(req.params.id, { name, address, contact }, { new: true });
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });
    res.json(pharmacy);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a pharmacy
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const pharmacy = await Pharmacy.findByIdAndDelete(req.params.id);
    if (!pharmacy) return res.status(404).json({ message: 'Pharmacy not found' });
    res.json({ message: 'Pharmacy deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
