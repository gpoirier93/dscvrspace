app.service('systemService', ['$log','$http', function($log, $http) {
  this.getSolarSystem = function(callback) {
    if (callback) {
        $http.get('/api/solarSystem', {cache:true}).then(function(response) {
        if (response.data) {
            callback(response.data);
        }
      });
    } else {
        return $http.get('/api/solarSystem', {cache:true}).then(function(response){
            if (response.data) {
                return response.data;
            } else {
                return {};
            }
        })
    }
  }
}]);