var LISTEN_PORT = 4000;

var express = require('express');
var body_parser = require('body-parser');

var app = express();
var cached_data_controller = require('./controller/cached_data');

app.use(body_parser.json({
    extended: true,
    limit: '50mb'
}));

/* Public client */
app.use('/', express.static(__dirname));

app.use(body_parser.json({
    extended: true,
    limit: '50mb'
}));

/* API */
var router = express.Router();
router.route('/cached_data/:action?/:id?')
    .get(cached_data_controller.execute)
    .post(cached_data_controller.execute)
    .put(cached_data_controller.execute);



app.use('/api', router);


var server = app.listen(LISTEN_PORT);
