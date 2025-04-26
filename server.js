// server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middleware/limiter');
const errorHandler = require('./middleware/errorHandler');
const incidentRoutes = require('./routes/incident.routes');
const app = express();
app.use(errorHandler);
// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());
// Rate Limiting Setup 
app.use(limiter);
app.use('/api/incidents', incidentRoutes);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
