import assert from 'assert';
import http from 'http';
import app from '../src/lib/app.js'; 

describe('API Tests', function() {
  let server;

  // Start the server before running the tests
  before((done) => {
    server = app.listen(3000, done);
  });

  // Stop the server after running the tests
  after((done) => {
    server.close(done);
  });

  it('should return 200 for the GET / route', function(done) {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      assert.strictEqual(res.statusCode, 200);
      done();
    });

    req.on('error', (e) => {
      done(e);
    });

    req.end();
  });
});
