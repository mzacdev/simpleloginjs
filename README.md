Project Overview
"simpleloginjs" is a straightforward Node.js application designed to handle basic login functionality. It utilizes the Express.js framework for handling HTTP requests and Body-Parser for parsing incoming request bodies. The project also includes automated tests written with Mocha to ensure the correctness of the login logic.

Key Features
Express.js: Provides a robust framework for building web applications and APIs.
Body-Parser: Middleware to parse incoming request bodies in a middleware before your handlers.
Mocha: A feature-rich JavaScript test framework running on Node.js, making asynchronous testing simple and fun.
Project Structure
app.js: The main application file that sets up the Express server and defines the login routes.
login.test.js: Contains the Mocha test cases to validate the login functionality.
package.json: Lists the project dependencies and scripts.
CI/CD Pipeline
The project leverages GitLab CI/CD to automate the build, test, and deployment processes. The CI/CD pipeline is designed to ensure code quality, reliability, and efficiency through the following stages:

Install:

Installs all project dependencies using npm install.
Caches the node_modules directory to speed up subsequent pipeline runs.
Build:

Installs dependencies for the main branch (optional setup for build processes).
Ensures that the build process is reproducible and dependencies are correctly managed.
Run:

Starts the application server using npm start.
Waits for the server to initialize before proceeding to the test stage.
Test:

Executes automated tests using Mocha to validate the login functionality.
Ensures that the server is running and ready for testing, preventing connection errors and timeouts.
