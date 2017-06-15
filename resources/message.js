
// send a message
const sendMessage = (z, bundle) => {
  const responsePromise = z.request({
    method: 'POST',
    url: 'https://api.telstra.com/v1/sms/messages',
    body: {
      to: bundle.inputData.to,
      body: bundle.inputData.body
    }
  });
  return responsePromise
    .then(response => JSON.parse(response.content));
};

module.exports = {
  key: 'message',
  noun: 'Message',

  create: {
    display: {
      label: 'Send Message',
      description: 'Send a new text message.'
    },
    operation: {
      inputFields: [
        {	key: 'to', 
			label: 'Phone number',
			helpText: 'Recipient number should be in the format of "04xxxxxxxx" where x is a digit.  Only Australian numbers are accepted.',
			required: true
		},
		{	key: 'body',
			label: 'Message',
			required: true}
      ],
      perform: sendMessage
    },
  },

  sample: {
    id: 1,
    name: 'Test'
  },

  outputFields: [
    {key: 'messageId', label: 'Message ID'}
  ]
};
