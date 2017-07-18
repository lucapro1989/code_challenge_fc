angular.module('AppControllers', [])
    .controller('controllerHome', ['RestClient', '$scope', '$http', '$window',
        function(RestClient, $scope, $http, $window) {


            var item = {
                string: 'new_item',
                time_to_live: 40,
                created: new Date(),
                active: true
            }

            RestClient.check_cache_length(item, function(response) {

                console.log(response.data);

            });

            console.log('ci sono! frontend');
            //var id = '597Caec1c3be952de0b0e8ed' //fakeID
            var id = '596d4cff720eb00340ed5081'
            /*  RestClient.given_key_cached_data(id, function(response) {

                  console.log(response.data);

              });*/

            /*RestClient.all(function(response) {

                console.log(response.data);

            });*/
            /*  var toupdatecreate = {
                  string: 'string_updated',
                  time_to_live: 50
              }*/

              /*var obj = {
                  id: id,
                  string: 'string_created',
                  time_to_live: 70,
                  created: new Date(),
                  active: true
              }

             RestClient.update_create(obj, function(response) {

                  console.log(response.data);

              });*/

            /*  RestClient.delete_id(id, function(response) {

                  console.log(response.data);

              });*/

            /*RestClient.delete_all(function(response) {

                console.log(response.data);

            });*/






        }
    ]);
