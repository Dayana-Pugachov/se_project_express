# WTWR (What to Wear?): Back End

This is the back-end part of the [WTWR project](https://github.com/Dayana-Pugachov/se_project_react).
Here I create a server with a REST API for the application and connect it to a database.

## Functionality and techniques used

- The server is built using Express.js and is connected to a MongoDB database.

- There are routes for interacting with **clothing items resources** and routes for interacting with **users recources**.

- Each route has its set of corresponding controllers.

- Centralized error handling.

- For each resource there is a corresponding model that has validation logic for recources' properties.

## Technology used

- Express.js
- MongoDB
- Postman
- ESLint with "Airbnb JavaScript Style Guide" configuration
- expressWinston logger
- Joi validation
- JWT

### Deployment features

- Google Cloud Platform
- NGINX
- Certbot
- PM2

## Domains

-**Front-end:** www.pugachovwtwr.jumpingcrab.com

-**Back-end:** api.pugachovwtwr.jumpingcrab.com

##Visit the WTWR!
[Take me to WTWR...](https://pugachovwtwr.jumpingcrab.com/)

[The front-end repo.](https://github.com/Dayana-Pugachov/se_project_react)

## Running the Project

`npm run start` — to launch the server

`npm run dev` — to launch the server with the hot reload feature
