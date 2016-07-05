app.service('neoService', ['$log', '$http', function($log, $http) {
    this.API_KEY = 'GV5BwqkiDLorofJQHZvd7u29AtEM24fq5D21vyew';
    this.BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

    this.getNeoById = function (id, callback) {
        if (id) {
            $http.get(this.BASE_URL+'/neo/'+id+'?api_key='+this.API_KEY).then(function(response) {
                $log.log(response);
                callback(response);
            }, function(response) {
                $log.log(response);
                callback(response);
            });
        }
    }
}]);