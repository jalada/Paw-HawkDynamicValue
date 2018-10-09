var Hawk = require('hawk.js');

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

    var header = Hawk.client.header(
      currentRequest.url,
      currentRequest.method,
      {
        credentials: credentials,
        user: this.user,
        nonce: this.nonce,
        ext: this.ext,
        app: this.app,
        dlg: this.dlg,
        timestamp: this.timestamp
      }
    );

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
  DynamicValueInput("id", "ID", "String", {
    placeholder: "Hawk key identifier"
  }),
  DynamicValueInput("key", "Key", "String", {
    placeholder: "Hawk key"
  }),
  DynamicValueInput("algorithm", "Algorithm", "Select", {
    choices: {
      "sha1": "SHA-1",
      "sha256": "SHA-256"
    },
    defaultValue: "sha1"
  }),
  DynamicValueInput("user", "User", "String", {
    placeholder: "Username"
  }),
  DynamicValueInput("nonce", "Nonce", "String", {
    placeholder: "Nonce"
  }),
  DynamicValueInput("ext", "ext", "String", {
    placeholder: "e.g. some app specific data"
  }),
  DynamicValueInput("app", "app", "String", {
    placeholder: "application id"
  }),
  DynamicValueInput("dlg", "dlg", "String", {
    placeholder: "e.g. delegated-by"
  }),
  DynamicValueInput("timestamp", "Timestamp", "String", {
    placeholder: "allows to specify a timestamp"
  }),
];

registerDynamicValueClass(HawkDynamicValue);
