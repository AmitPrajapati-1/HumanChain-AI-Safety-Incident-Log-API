require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(`postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
    dialect: 'postgres',
    logging: false,
});
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully!');
    return sequelize.sync(); // <-- Add this!
  })
  .then(() => {
    console.log('Models synchronized!');
  })
  .catch(err => console.error('Unable to connect to the database:', err));


module.exports = { sequelize };
