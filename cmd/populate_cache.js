var mongoose = require('../config/mongodb');
var model_cache = require('../model/cache');


var cache = {
    string: 'string3',
    time_to_live: 50,
    created: new Date(2017,05,04),
    active: true
}

var model_cache = new model_cache(cache);

model_cache.save(function(err) {
    console.log('salvato spero!');
})
