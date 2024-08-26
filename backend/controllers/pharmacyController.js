const Pharmacy = require('../models/Pharmacy');

exports.addPharmacy = async (req, res) => {
    const { name, address, contact } = req.body;
    try {
        const pharmacy = new Pharmacy({ name, address, contact });
        await pharmacy.save();
        client.del('pharmacies'); // Invalidate cache
        res.status(201).send('Pharmacy added');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getPharmacies = async (req, res) => {
    try {
        const cachedPharmacies = await client.get('pharmacies');
        if (cachedPharmacies) return res.json(JSON.parse(cachedPharmacies));

        const pharmacies = await Pharmacy.find();
        client.set('pharmacies', JSON.stringify(pharmacies));
        res.json(pharmacies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.searchPharmacies = async (req, res) => {
    const { name } = req.query;
    try {
        const pharmacies = await Pharmacy.find({ name: new RegExp(name, 'i') });
        res.json(pharmacies);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
