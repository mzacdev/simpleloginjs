// test/app.test.js
const http = require('http');
const assert = require('assert');

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

// Test cases
function testLoginSuccess() {
    const postData = 'username=user&password=password';
    
    performRequest(postData, (res, body) => {
        assert.strictEqual(res.statusCode, 200);
        assert(body.includes('<title>Success</title>'), 'Expected response body to include success page');
        console.log('testLoginSuccess passed');
    });
}

function testLoginFailure() {
    const postData = 'username=wronguser&password=wrongpassword';
    
    performRequest(postData, (res, body) => {
        assert.strictEqual(res.statusCode, 200);
        assert(body.includes('<title>Fail</title>'), 'Expected response body to include fail page');
        console.log('testLoginFailure passed');
    });
}

// Run tests
function runTests() {
    testLoginSuccess();
    testLoginFailure();
}

runTests();
