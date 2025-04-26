// middleware/validateIncident.js

const Joi = require('joi');

// Joi schema for validating incident data
const incidentSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  severity: Joi.string().valid('Low', 'Medium', 'High').required(),
});

const validateIncident = (req, res, next) => {
  const { error } = incidentSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateIncident;
