const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: "endpoint works!" });
});

module.exports = router;