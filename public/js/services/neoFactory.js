app.factory('neoFactory', ['$log', '$http','errorManagerHelper', function($log, $http, errorManagerHelper) {
    
    var neoFactory = {};
    neoFactory.API_KEY = 'GV5BwqkiDLorofJQHZvd7u29AtEM24fq5D21vyew';
    neoFactory.BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
    neoFactory.PAGE_SIZE = 20;
    neoFactory.stats;

    // Array of neos corresponding to the last search
    neoFactory.results = [];
    neoFactory.resultsKeys = [];
    neoFactory.selectedNeo;
    neoFactory.selectedDate = new Date();

    // Dictionnary info on the browse search
    neoFactory.links = {};
    neoFactory.page = {};
    neoFactory.elementCount;
    neoFactory.pageIndex = 0;
    neoFactory.dateOptionIndex = 0;

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
                    successCallback();
                }
            }, function(response) {
                neoFactory.results = [];
                if (response.status !== 404) {
                    errorManagerHelper.showError('Une erreur est survenue lors de la communication avec les serveurs du JPL. Veuillez réessayer plus tard.')
                }
                errorCallback(response);
            });
        }
    }

    neoFactory.getNeoOrbitalData = function (id, successCallback, errorCallback) {
        if (id) {
            $http.get(neoFactory.BASE_URL+'/neo/'+id, {
                params: {
                    'api_key':neoFactory.API_KEY
                }
            }).then(function(response) {
                if (response.data) {
                    // We put the neo inside the results array
                    neoFactory.selectedNeo = response.data;
                    successCallback();
                }
            }, function(response) {
                errorManagerHelper.showError('Une erreur est survenue lors de la communication avec les serveurs du JPL. Veuillez réessayer plus tard.')
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
                errorManagerHelper.showError('Une erreur est survenue lors de la communication avec les serveurs du JPL. Veuillez réessayer plus tard.')
                successCallback();
            }
        }, function(response) {
            neoFactory.results = [];
            errorCallback(response);
        })
    }

    // Get neo for date interval
    neoFactory.getNeoFromDate = function(successCallback, errorCallback) {
        // Prepare date interval
        var date = neoFactory.selectedDate.getDate();
        var month = neoFactory.selectedDate.getMonth() + 1;
        var year = neoFactory.selectedDate.getFullYear();
        var startDate = year+'-'+month+'-'+date;
        var endDate;
        if (neoFactory.dateOptionIndex === 1) {
            var dateWeek = addDays(neoFactory.selectedDate, 7);
            date = dateWeek.getDate();
            month = dateWeek.getMonth() + 1;
            year = dateWeek.getFullYear();
            endDate = year+'-'+month+'-'+date;
        } else {
            endDate = startDate;
        }

        $http.get(neoFactory.BASE_URL+'/feed', {
            params: {
                start_date:startDate,
                end_date:endDate,
                api_key:neoFactory.API_KEY
            }, cache:true
        }).then(function(response) {
            if (response.data) {
                // We put the neo inside the results array
                neoFactory.resultsKeys = Object.keys(response.data.near_earth_objects).sort();
                neoFactory.results = response.data.near_earth_objects;
                neoFactory.elementCount = response.data.element_count;
                neoFactory.links = response.data.links;
                successCallback();
            } else {
                neoFactory.results = [];
                neoFactory.resultsKeys = [];
                successCallback();
            }
        }, function(response) {
            neoFactory.results = [];
            errorManagerHelper.showError('Une erreur est survenue lors de la communication avec les serveurs du JPL. Veuillez réessayer plus tard.')
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
                errorManagerHelper.showError('Une erreur est survenue lors de la communication avec les serveurs du JPL. Veuillez réessayer plus tard.')
                neoFactory.stats = {
                    near_earth_object_count: 'N/A',
                    last_updated: 'N/A'
                }
            }
        });
    }

    neoFactory.updateDateOptionIndex = function(optionIndex) {
        neoFactory.dateOptionIndex = optionIndex;
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    return neoFactory;
}]);