const rateLimit = require('express-rate-limit');
// Rate Limiting Setup 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per window
});
module.exports = limiter;