app.factory('neoFactory', ['$log', '$http', function($log, $http) {
    
    var neoFactory = {};
    neoFactory.API_KEY = 'GV5BwqkiDLorofJQHZvd7u29AtEM24fq5D21vyew';
    neoFactory.BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
    neoFactory.PAGE_SIZE = 20;
    neoFactory.stats;

    // Array of neos corresponding to the last search
    neoFactory.results = [];
    // neoFactory.browseCatalogue = [];
    neoFactory.selectedNeo;
    // Dictionnary info on the browse search
    neoFactory.page = {};
    neoFactory.pageIndex = 0;

    // Dictionnary info on the browse search
    neoFactory.links = {};
    neoFactory.page = {};
    neoFactory.pageIndex = 0;

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
    neoFactory.browse = function(pageIndex, successCallback, errorCallback) {
        neoFactory.pageIndex = pageIndex;
        $http.get(neoFactory.BASE_URL+'/neo/browse', {
            params: {
                'api_key': neoFactory.API_KEY,
                'page': pageIndex,
                'size': neoFactory.PAGE_SIZE
            }, cache: true
        }).then(function (response) {
            if (response.data) {
                // We put the neo inside the results array
                // neoFactory.browseCatalogue.push.apply(neoFactory.browseCatalogue,response.data.near_earth_objects);
                neoFactory.results = response.data.near_earth_objects;
                neoFactory.page = response.data.page;
                neoFactory.links = response.data.links;
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

    neoFactory.searchMethodObject = function(index) {
        switch (index) {
            case 0:
                return {
                    value: 0,
                    title: 'Tous les astéroïdes', 
                }
            case 1:
                return {
                    value: 1,
                    title: 'Rechercher par date d\'intersection', 
                }
            case 2:
                return {
                    value: 2,
                    title: 'Rechercher par identifiant', 
                }
        }
    }

    neoFactory.searchMethodValue = neoFactory.searchMethodObject(0);

    // Get the stats concerning the neo data set
    neoFactory.getDataSetStats = function(callback) {
        $http.get(neoFactory.BASE_URL+'/stats', {
            params: {
                'api_key':neoFactory.API_KEY
            }
        }).then(function(response) {
            if (response.data) {
                neoFactory.stats = response.data;
                callback();
            } else {
                neoFactory.stats = {
                    near_earth_object_count: 'N/A',
                    last_updated: 'N/A'
                }
            }
        });
    }

    return neoFactory;
}]);