const MessageResource = require('./resources/message');
const authentication = require('./authentication');



const includeAuthTokenHeader = (request, z, bundle) => {
  z.console.log(bundle.authData.accessToken);
  if(bundle.authData.accessToken){
    request.headers['Authorization'] = 'Bearer ' + bundle.authData.accessToken;
  }
  return request;
};
const tokenRefreshIf401 = (response, z, bundle) => {
    if (response.status === 401) {
      throw new z.errors.RefreshAuthError(); // ask for a refresh & retry
  }
  return response;
};

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  
  
  // pass the Authentication object
  authentication: authentication,

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
    includeAuthTokenHeader
  ],

  afterResponse: [
    tokenRefreshIf401
  ],

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
    [MessageResource.key]: MessageResource,
  },

  // If you want your trigger to show up, you better include it here!
  triggers: {
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
