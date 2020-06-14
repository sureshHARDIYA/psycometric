const mongoose = require('mongoose');
mongoose.set('debug', process.env.NODE_ENV === 'development')

module.exports = mongoose;
