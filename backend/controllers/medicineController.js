const Medicine = require('../models/Medicine');
const Pharmacy = require('../models/Pharmacy');

exports.addMedicine = async (req, res) => {
    const { name, description, price, discount, pharmacyId } = req.body;
    const image = req.file?.path;

    try {
        const pharmacy = await Pharmacy.findById(pharmacyId);
        if (!pharmacy) return res.status(404).send('Pharmacy not found');

        const medicine = new Medicine({ name, description, price, discount, pharmacy: pharmacyId, image });
        await medicine.save();
        client.del('medicines'); // Invalidate cache
        res.status(201).send('Medicine added');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateMedicine = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, discount } = req.body;

    try {
        const medicine = await Medicine.findByIdAndUpdate(id, { name, description, price, discount }, { new: true });
        if (!medicine) return res.status(404).send('Medicine not found');
        client.del('medicines'); // Invalidate cache
        res.json(medicine);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteMedicine = async (req, res) => {
    const { id } = req.params;

    try {
        await Medicine.findByIdAndDelete(id);
        client.del('medicines'); // Invalidate cache
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getMedicines = async (req, res) => {
    try {
        const cachedMedicines = await client.get('medicines');
        if (cachedMedicines) return res.json(JSON.parse(cachedMedicines));

        const medicines = await Medicine.find().populate('pharmacy');
        client.set('medicines', JSON.stringify(medicines));
        res.json(medicines);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
