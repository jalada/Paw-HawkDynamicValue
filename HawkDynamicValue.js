var hawk = require('hawk.js');

var HawkDynamicValue = function() {

  this.evaluate = function(context) {
    if(['sha1', 'sha256'].indexOf(this.algorithm) < 0) {
      throw new Error('The algorithm must be either `sha1` or `sha256`');
    }

    // Client credentials
    var credentials = {
        id: this.id || "",
        key: this.key,
        algorithm: this.algorithm
    }

    var currentRequest = context.getCurrentRequest();

    var header = hawk.client.header(currentRequest.url, currentRequest.method, { credentials: credentials });
    // Send authenticated request
    return header.field;
  };

  this.title = function() {
    return "Hawk Token";
  };

  return this;
};

HawkDynamicValue.identifier = 'uk.co.jalada.PawExtensions.HawkDynamicValue';
HawkDynamicValue.title = 'Hawk Authentication';
HawkDynamicValue.inputs = [
  DynamicValueInput("algorithm", "Algorithm", "String"),
  DynamicValueInput("key", "Key", "String"),
  DynamicValueInput("id", "ID", "String")
];

registerDynamicValueClass(HawkDynamicValue);
