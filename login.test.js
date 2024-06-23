const http = require('http');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Load success and fail page content for comparison
const successPageContent = fs.readFileSync(path.join(__dirname, 'views/success.html'), 'utf8');
const failPageContent = fs.readFileSync(path.join(__dirname, 'views/fail.html'), 'utf8');

// Define the options for the HTTP request
const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

// Function to perform an HTTP request
function performRequest(data, callback) {
    const req = http.request(options, (res) => {
        let responseBody = '';
        res.setEncoding('utf8');

        res.on('data', (chunk) => {
            responseBody += chunk;
        });

        res.on('end', () => {
            callback(res, responseBody);
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.write(data);
    req.end();
}

describe('Login Tests', function() {
    it('should login successfully with correct credentials', function(done) {
        const postData = 'username=user&password=password';
        
        performRequest(postData, (res, body) => {
            assert.strictEqual(res.statusCode, 200);
            assert.strictEqual(body, successPageContent, 'Expected response body to match success page content');
            done();
        });
    });

    it('should fail login with incorrect credentials', function(done) {
        const postData = 'username=wronguser&password=wrongpassword';
        
        performRequest(postData, (res, body) => {
            assert.strictEqual(res.statusCode, 200);
            assert.strictEqual(body, failPageContent, 'Expected response body to match fail page content');
            done();
        });
    });
});
