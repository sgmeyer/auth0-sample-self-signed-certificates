/**
 * This is a code snippet showing how to configure the request
 * node module to use a self-sign certificate inside Auth0's 
 * Rules and DB Action Scripts.
 */
  function (user, context, callback) {
  var request = require('request');

  var getCACert = function() {
    var ca_cert = configuration.ca_certificate.split(",");
    var pem = "-----BEGIN CERTIFICATE-----\n"

    while (cert.length > 64) {
      pem = pem + cert.substring(0, 64) + "\n";
      cert = cert.substring(64);
    }

    pem = pem + cert + "\n-----END CERTIFICATE-----";
    return pem;
  }


  // This is just a fake call, it doesn't have authentication.  This call does not
  // demonstrate securing the API with OAuth and Tokens.  This needs to be included
  // in a production ready system.
  var request_options = {
    url: 'https://api.achme.com/user/tos?id=' + user.email
  };

  if (configuration.ca_certificate) {
    request_options.agentOptions = {
      ca: getCaCert()
    };
  }

  request.get(request_options);

  return callback(null, user, context);
}
