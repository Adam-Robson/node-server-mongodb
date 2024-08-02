// test/app.test.js
import assert from 'assert';
import http from 'http';
import app from '../src/lib/app'; 

describe('API Tests', function() {
  it('should return 200 for the GET / route', function(done) {

    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/',
      method: 'GET',
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        assert.strictEqual(res.statusCode, 200);
        done();
      });
    });

    req.on('error', (e) => {
      done(e);
    });

    req.end();
  });
});
