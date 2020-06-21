const mongoose = require('mongoose');
mongoose.set('debug', process.env.NODE_ENV === 'development')
mongoose.set('useFindAndModify', false);
module.exports = mongoose;
