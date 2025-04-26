// routes/incident.routes.js
const validateIncident = require('../middleware/validateIncident');
const express = require('express');
const {
  getIncidents,
  createIncident,
  getIncidentById,
  deleteIncident,
} = require('../controllers/incident.controller');

const router = express.Router();

// Routes
router.get('/', getIncidents);
router.post('/', validateIncident, createIncident);
router.get('/:id', getIncidentById);
router.delete('/:id', deleteIncident);


module.exports = router;
