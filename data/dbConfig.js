const knex = require('knex');
const config = require('../knexFile.js');

module.exports = knex(config.development);