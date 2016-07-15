app.service('systemService', ['$log','$http', function($log, $http) {
  this.getSolarSystem = function(successCallback, errorCallback) {
    if (successCallback) {
        $http.get('/api/solarSystem', {cache:true}).then(function(response) {
            if (response.data) {
                successCallback(response.data);
            }
      }, errorCallback);
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