# WTWR (What to Wear?): Back End

This is the back-end part of the [WTWR project](https://github.com/Dayana-Pugachov/se_project_react).
Here I create a server with an API for the application and connect it to a database.

## Functionality and techniques used

- The server is built using Express.js and is connected to a MongoDB database.

- There are routes for interacting with **clothing items resources** and routes for interacting with **users recources**.

- Each route has its set of corresponding controllers.

- All controllers have error handling logic that can be tested via Postman.

- For each resource there is a corresponding model that has validation logic for recources' properties.

## Technology used

- Express.js
- MongoDB
- Postman
- ESLint with "Airbnb JavaScript Style Guide" configuration

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
