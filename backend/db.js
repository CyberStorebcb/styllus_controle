// backend/db.js
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('styllusdb', 'postgres', 'teteda33', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
})

module.exports = sequelize
