const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');
const authenticateToken = require('../middleware/authMiddleware');

// Create a new medicine
router.post('/', authenticateToken, async (req, res) => {
  const { name, description, price, discount, pharmacy } = req.body;

  if (!name || !price || !pharmacy) {
    return res.status(400).json({ message: 'Name, price, and pharmacy are required' });
  }

  try {
    const medicine = new Medicine({ name, description, price, discount, pharmacy });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all medicines for a specific pharmacy
router.get('/:pharmacyId', authenticateToken, async (req, res) => {
  try {
    const medicines = await Medicine.find({ pharmacy: req.params.pharmacyId });
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get a single medicine by ID
router.get('/medicine/:id', authenticateToken, async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update a medicine
router.put('/:id', authenticateToken, async (req, res) => {
  const { name, description, price, discount } = req.body;

  try {
    const medicine = await Medicine.findByIdAndUpdate(req.params.id, { name, description, price, discount }, { new: true });
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a medicine
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
