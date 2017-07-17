var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.0.226/cached_data');
//mongoose.connect('mongodb://localhost/tornosubito_prod');

exports.mongoose = mongoose;
