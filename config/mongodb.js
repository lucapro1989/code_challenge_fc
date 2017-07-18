var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/cached_data');
//mongoose.connect('mongodb://localhost/tornosubito_prod');

exports.mongoose = mongoose;
