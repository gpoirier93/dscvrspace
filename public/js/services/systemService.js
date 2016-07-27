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

  this.getPlanetById = function(id, successCallback, errorCallback) {
    if (successCallback) {
        $http.get('/api/planets/'+id, {cache:true}).then(function(response) {
            if (response.data) {
                successCallback(response.data);
            }
      }, errorCallback);
    } else {
        return $http.get('/api/planets/'+id, {cache:true}).then(function(response){
            if (response.data) {
                return response.data;
            } else {
                return {};
            }
        })
    }
  }

  this.getPlanetIdForSystemUrl = function(url) {
      if(url === 'mercury') {return 1} else
      if(url === 'venus') {return 2} else
      if(url === 'earth') {return 3} else
      if(url === 'mars') {return 4} else
      if(url === 'jupiter') {return 5} else
      if(url === 'saturn') {return 6} else
      if(url === 'uranus') {return 7} else
      if(url === 'neptune') {return 8} else { return 0}
  }
}]);