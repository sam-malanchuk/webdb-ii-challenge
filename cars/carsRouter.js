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
        if(car) {
            res.status(200).json(car);
        } else {
            res.status(500).json({ message: 'Could not find car by ID' });
        }
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const carChanges = req.body;

    db('cars').where({ id }).update(carChanges)
        .then(updated => {
            if(updated) {
                res.status(201).json({ message: 'Your car has been updated!' });
            } else {
                res.status(500).json({ message: 'Could not find car by ID' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update the car' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where({ id }).del()
        .then(deleted => {
            if(deleted) {
                res.status(200).json({ message: 'Your car has been deleted!' });
            } else {
                res.status(500).json({ message: 'Could not find car by ID' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete the car' });
        });
});

module.exports = router;