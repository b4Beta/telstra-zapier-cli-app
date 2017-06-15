
const testAuth = (z , bundle) => {
  // Normally you want to make a request to an endpoint that is either specifically designed to test auth, or one that
  // every user will have access to, such as an account or profile endpoint like /me.
  // In this example, we'll hit httpbin, which validates the Authorization Header against the arguments passed in the URL path
  /*  const promise = z.request({
      url: 'https://api.telstra.com/v1/sms/messages',
      headers: {
        Authorization: 'Bearer ' + bundle.authData.accessToken
      }
    });

    // This method can return any truthy value to indicate the credentials are valid.
    // Raise an error to show
    return promise.then((response) => {
      if (response.status === 401) {
        throw new Error('The auth token is not valid');
      }
      return response;
    });  
      */
      
      if(typeof(bundle.authData.accessToken)==='undefined'){
        throw new Error('There is no Access Token. Please check your Consumer Secret and Consumer ID');
      }
      return true;
  
};
const getAccessToken  = (z, bundle) => {
	const promise = z.request({
		method: 'GET',
		url: 'https://api.telstra.com/v1/oauth/token',
		params: {
			client_id: bundle.authData.client_id,
      client_secret: bundle.authData.client_secret,
      grant_type: 'client_credentials',
      scope:"SMS"
      },
		headers: {
                'Content-Type': 'text/html'
		}
	});
  
  return promise.then((response) => {
      if(response.status_code === 401){
        throw new Error ('Please check the consumer key and consumer secret');
      }
      if(response.status_code === 500){
        throw new Error ('Please check body of the request');
      }
      return {
          accessToken: JSON.parse(response.content).access_token
      };
  });

};

module.exports = {

  type: 'session',
  // Define any auth fields your app requires here. The user will be prompted to enter this info when
  // they connect their account.
  fields: [
    {key: 'client_id', label: 'Consumer key', required: true, type: 'string'},
    {key: 'client_secret', label: 'Your consumer secret', required: true, type: 'string'},
  ],
  sessionConfig: {
    perform: getAccessToken
  },
  test: testAuth
	
  
};