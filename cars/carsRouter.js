const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve cars' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where({id}).first()
    .then(car => {
        res.status(200).json(car);
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to retrieve cars' });
    });
});

router.post('/', (req, res) => {
    const carsData = req.body;

    db('cars').insert(carsData)
    .then(created => {
        if(created) {
            res.status(201).json({ message: 'Your car has been added!' });
        } else {
            res.status(500).json({ message: 'Failed to add new car' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to add new car' });
    });
});

module.exports = router;