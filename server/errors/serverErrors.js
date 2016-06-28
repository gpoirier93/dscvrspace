var serverErrors = module.exports = {};

// Resource not found : the requested resource does not exist in the DB
function ResourceNotFoundError(message) {
  this.name = 'ResourceNotFound';
  this.message = message || 'The requested resource was not found';
  this.stack = (new Error()).stack;
}
ResourceNotFoundError.prototype = Object.create(Error.prototype);
ResourceNotFoundError.prototype.constructor = ResourceNotFoundError;

// Bad DB request : when there is an error message returned by Sequelize while treating the request
// Should not happen under normal use of the api while in production
function BadDBRequestError(message) {
  this.name = 'BadDBRequest';
  this.message = message || 'The request could not be treated';
  this.stack = (new Error()).stack;
}
BadDBRequestError.prototype = Object.create(Error.prototype);
BadDBRequestError.prototype.constructor = BadDBRequestError;

serverErrors.ResourceNotFoundError = ResourceNotFoundError;
serverErrors.BadDBRequestError = BadDBRequestError;
