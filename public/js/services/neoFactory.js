app.factory('neoFactory', ['$log', '$http', function($log, $http) {
    
    var neoFactory = {};
    neoFactory.API_KEY = 'GV5BwqkiDLorofJQHZvd7u29AtEM24fq5D21vyew';
    neoFactory.BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
    neoFactory.PAGE_SIZE = 20;

    // Array of neos corresponding to the last search
    neoFactory.results = [];
    neoFactory.browseCatalogue = [];
    neoFactory.selectedNeo;
    // Dictionnary info on the browse search
    neoFactory.page = {};

    // Get specific neo by id
    neoFactory.getNeoById = function (id, successCallback, errorCallback) {
        if (id) {
            $http.get(neoFactory.BASE_URL+'/neo/'+id, {
                params: {
                    'api_key':neoFactory.API_KEY
                }
            }).then(function(response) {
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

    // Browse neos catalogue
    neoFactory.browse = function(page, successCallback, errorCallback) {
        $http.get(neoFactory.BASE_URL+'/neo/browse', {
            params: {
                'api_key': neoFactory.API_KEY,
                'page': page,
                'size': neoFactory.PAGE_SIZE
            }
        }).then(function (response) {
            if (response.data) {
                    // We put the neo inside the results array
                    $log.log(response.data.near_earth_objects);
                    neoFactory.browseCatalogue.push.apply(neoFactory.browseCatalogue,response.data.near_earth_objects);
                    neoFactory.page = response.data.page;
                    successCallback();
                } else {
                    neoFactory.results = [];
                    errorCallback();
                }
        }, function(response) {
            neoFactory.results = [];
            errorCallback(response);
        })
    }

    return neoFactory;
}]);