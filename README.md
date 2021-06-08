# store-app-server

A Server (Express + MySQL) for the Store App. 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine. 

### Pre-requisites

In order to run this app you need to install nodeJS on the machine. Download and install the relevant installer package from the following link 

https://nodejs.org/download/

### Getting Started

This section explains the steps you need to take in order to run this server on your local machine.

1. Clone this repo from GitHub. 
```git clone https://github.com/fqaiser/store-app-server.git```
2. Install the required dependencies through by running the following command in the terminal. 
```npm install ```
3. Start the server by running 
```npm start ```
4. Connect to the server via ```http://localhost:9000/```

### Dependencies
1. expressjs - The server for handling and routing HTTP requests
2. jsonwebtoken - For generating JWTs used by authentication
3. mysql2 - MySQL client for NodeJS
4. bcryptjs - A library to help you hash passwords
5. dotenv - Loads the enovironment variables using a .env file

### Application Structure
* app.js - The entry point to our application. This file defines our express server. It also loads environment variables, and adds the routes and middlewares we'll be using in the application.
* utils/ - This folder contains utility functions like database connection and middleware for validating auth tokens.

## Author

* **Farhat Qaiser** 
