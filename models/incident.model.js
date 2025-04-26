// models/incident.model.js

const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.config');

const Incident = sequelize.define('Incident', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  severity: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Low', 'Medium', 'High']],
    },
  },
  reported_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
});

module.exports = Incident;
