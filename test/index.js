require('should');

const zapier = require('zapier-platform-core');

// Use this to make test calls into your app:
const App = require('../index');
const appTester = zapier.createAppTester(App);

describe('creates', () => {

  describe('Sends a test SMS', () => {
    it('should send an SMS', (done) => {
      const bundle = {
        authData: {
          client_id: 'replace with your key',
          client_secret: 'replace with your secret'
        },
        inputData:{
          to: "replace with your number",
          body: "Test SMS"
        }
      };

      appTester(App.resources.message.create.operation.perform, bundle)
        .then(results => {
          results.length.should.above(0);

          const message = results[0];
          message.should.have.property('messageId');

          done();
        })
        .catch(done);
    });
  });
});
