app.factory('neoFactory', ['$log', '$http', function($log, $http) {
    
    var neoFactory = {};
    neoFactory.API_KEY = 'GV5BwqkiDLorofJQHZvd7u29AtEM24fq5D21vyew';
    neoFactory.BASE_URL = 'https://api.nasa.gov/neo/rest/v1';

    // Array of neos corresponding to the last search
    neoFactory.results = [];

    // Get specific neo byt id
    neoFactory.getNeoById = function (id, successCallback, errorCallback) {
        if (id) {
            $http.get(neoFactory.BASE_URL+'/neo/'+id+'?api_key='+neoFactory.API_KEY).then(function(response) {
                if (response.data) {
                    // We put the neo inside the results array
                    neoFactory.results = [response.data];
                    successCallback();
                } else {
                    neoFactory.results = [];
                    errorCallback();
                }
            }, function(response) {
                neoFactory.results = [];
                errorCallback(response);
            });
        }
    }

    return neoFactory;
}]);