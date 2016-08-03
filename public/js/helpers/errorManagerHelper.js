app.service('errorManagerHelper',['$log', function($log) {
    this.showError = function(message) {
          Materialize.toast(message, 4000) 
    }
}])