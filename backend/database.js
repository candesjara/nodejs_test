const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/empleados';

mongoose
  .connect(URI)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.error(err));

module.exports = mongoose;
