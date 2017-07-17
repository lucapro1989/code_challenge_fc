var mongoose = require('../config/mongodb');
var model_cache = require('../model/cache');


var cache = {
    string: 'prova',
    time_to_live: 50,
    created: new Date(),
    active: true
}

var model_cache = new model_cache(cache);

model_cache.save(function(err) {
    console.log('salvato spero!');
})
