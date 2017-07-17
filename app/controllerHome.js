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
            var id = '596cc81b4ebf3524c0466109'
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

            /*  var toupdatecreate = {
                  string: 'string_created',
                  time_to_live: 70
              }
              var obj = {
                  id: id,
                  to_update_create: toupdatecreate
              }*/

            /*  RestClient.update_create(obj, function(response) {

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
