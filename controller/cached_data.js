var mongoose = require('../config/mongodb');
var controller_common = require('./common');
var model_cache = require('../model/cache');

var controller = {
    _name: "cached_data",
    // Ottiene i dati della domanda
    index: function(req, res) {
        res.json('wrong call!');
        return;
    },
    given_id: function(req, res) {
        model_cache.findOne({
            _id: req.params.id
        }).exec(function(err, given_key_data) {



            if (!given_key_data) {
                var result = "";
                var possible_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 10; i++) {
                    result += possible_letters.charAt(Math.floor(Math.random() * possible_letters.length));
                }

                var cache = new model_cache({
                    string: result,
                    time_to_live: 50
                });
                cache.save(function(err) {
                    console.log('saved!')
                    res.json(result);
                    return
                })

            } else {
                console.log('cache hit!')
                given_key_data.time_to_live = 50; //TTL RESET
                given_key_data.save(function() {
                    res.json(given_key_data);
                    return;

                })



            }


        })

    },
    all: function(req, res) {
        model_cache.find({

        }).exec(function(err, all_datas) {
            res.json(all_datas);
            return;
        })
    },
    update_create: function(req, res) {

        model_cache.findOne({
            _id: req.body.id
        }).exec(function(err, data_to_update) {


            if (data_to_update) {

                data_to_update.string = req.body.to_update_create.string;

                data_to_update.time_to_live = req.body.to_update_create.time_to_live;

                data_to_update.save(function(err) {
                    console.log('saved!')
                    res.json({
                        result: 0
                    });
                    return
                })
            } else {
                var cache = new model_cache({
                    string: req.body.to_update_create.string,
                    time_to_live: req.body.to_update_create.time_to_live
                });
                cache.save(function() {
                    console.log('saved new!')
                    res.json({
                        result: 0
                    });

                })


            }

        })
    },

    delete_id: function(req, res) {
        model_cache.findOne({
            _id: req.params.id
        }).remove().exec(function(err, data_to_remove) {
            res.json('data removed!');
            return;

        });

    },
    delete_all: function(req, res) {
        model_cache.remove().exec(function(err, data_to_remove) {
            res.json('data removed!');
            return;

        });

    },
    check_cache_length: function(req, res) {

        model_cache.count().exec(function(err, count) {

            if (count > 2) { //if all cached items length is more than what we want (i put 2 for better use!)
                model_cache.findOneAndUpdate(req.body, {
                        upsert: true
                    })
                    .sort({
                        created: 1
                    }).exec(function(err, doc) {

                        res.json('saved');
                        return;

                        /*console.log(oldest_data);
                        oldest_data = new model_cache({
                            string: req.body.string,
                            time_to_live: req.body.time_to_live,
                            created: new Date(),
                            active: req.body.active
                        })*/


                        /*  oldest_data.save(function() {
                              console.log('FATTO!')
                              res.json('done!');
                              return;

                          })*/



                    })
            } else {
                res.json({
                    result: 0
                });
                return;
            }
        })


    },
    check_ttl: function(req, res) {
        model_cache.find().exec(function(err, all_datas) {

            var result = check_single_ttl({
                elements: all_datas,
                i: 0
            })
            res.json(result)

        })

    }

};

function check_single_cached_item(step_data) {
    /*if (step_data.i == step_data.elements.length) { //if last element log DONE

        console.log("DONE CHECKING");
        return;
    }*/
    var item_to_overwrite = step_data.elements[0]; //first element will be the oldest
    if (item_to_overwrite) {
        var newest_cached_item = step_data.new_element;
        item_to_overwrite = newest_cached_item; ////overwriting newest to oldest
        item_to_overwrite.save(function() {
            //save
            console.log('saved new!')
            step_data.i++;
            check_single_cached_item(step_data);
        })
    } else {
        console.log('done checking!')
        return;
    }



}

function check_single_ttl(step_data) {
    if (step_data.i == step_data.elements.length) { //if last element log DONE

        console.log("DONE CHECKING");
        return;
    }

    var cached_item = step_data.elements[step_data.i]; //current item checking
    var date_created = cached_item.created;
    var now = new Date();
    var ttl = cached_item.time_to_live;
    var diffMs = (now - date_created); //difference time in ms
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); //ms in minutes
    //var message;
    if (diffMins > ttl && cached_item.active) { //if ttl expired and active
        cached_item.active = false; //change to false, not active anymore

        cached_item.save(function() {
            var rand_str = randomStr(); //create random string
            var cache = new model_cache({ //create new model cache
                string: rand_str,
                time_to_live: 40,
                created: new Date(),
                active: true
            });
            cache.save(function(err) { //save
                console.log('saved new!')
                step_data.i++;
                check_single_ttl(step_data);

            })

        })
    } else {
        step_data.i++;
        check_single_ttl(step_data);
    }
}

function randomStr() {

    var result = "";
    var possible_letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++) {
        result += possible_letters.charAt(Math.floor(Math.random() * possible_letters.length));
    }

    return result;
}

exports.execute = function(req, res) {

    controller_common.dispatch(req, res, controller);
};
