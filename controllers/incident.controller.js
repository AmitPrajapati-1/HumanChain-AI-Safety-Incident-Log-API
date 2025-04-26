// controllers/incident.controller.js
const Incident = require('../models/incident.model');
const redisClient = require('./../config/redis.config');

// GET all incidents
const getIncidents = async (req, res) => {
  try {
    const cachedIncidents = await redisClient.get('incidents');

    if (cachedIncidents) {
      console.log('Serving from cache');
      return res.status(200).json(JSON.parse(cachedIncidents));
    }

    const incidents = await Incident.findAll();
    await redisClient.setEx('incidents', 60, JSON.stringify(incidents));
    return res.status(200).json(incidents);

  } catch (err) {
    console.error('Error in getIncidents:', err);
    return res.status(500).json({ message: 'Error fetching incidents' });
  }
};

// POST a new incident
const createIncident = async (req, res) => {
  const { title, description, severity } = req.body;

  if (!title || !description || !severity) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const incident = await Incident.create({ title, description, severity });
    await redisClient.del('incidents'); // Clear cache after creating
    return res.status(201).json(incident);
  } catch (err) {
    console.error('Error in createIncident:', err);
    return res.status(500).json({ message: 'Error creating incident' });
  }
};

// GET incident by ID
const getIncidentById = async (req, res) => {
  const { id } = req.params;

  try {
    const cachedIncident = await redisClient.get(`incident:${id}`);

    if (cachedIncident) {
      console.log('Serving incident from cache');
      return res.status(200).json(JSON.parse(cachedIncident));
    }

    const incident = await Incident.findByPk(id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    await redisClient.setEx(`incident:${id}`, 60, JSON.stringify(incident));
    return res.status(200).json(incident);

  } catch (err) {
    console.error('Error in getIncidentById:', err);
    return res.status(500).json({ message: 'Error fetching incident' });
  }
};

// DELETE incident by ID
const deleteIncident = async (req, res) => {
  const { id } = req.params;

  try {
    const incident = await Incident.findByPk(id);
    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' });
    }

    await incident.destroy();
    await redisClient.del('incidents'); // Clear cache after deletion
    await redisClient.del(`incident:${id}`); // Clear specific incident cache

    return res.status(204).send();

  } catch (err) {
    console.error('Error in deleteIncident:', err);
    return res.status(500).json({ message: 'Error deleting incident' });
  }
};

module.exports = {
  getIncidents,
  createIncident,
  getIncidentById,
  deleteIncident,
};
