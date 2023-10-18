# Health-tracker-pro-backend
This is a codebase for Node.js health tracking project built on Express. It has Docker support as well as Jest, ESLint, and a local development server. Everything is in Typescript.

This was initially built for a Google Cloud Run project, but it could be used anywhere. 
## Prerequisite
- Node 18
## Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Manzi-Cedrick/health-friendly-typescript.git
```
- Install dependencies
```
cd <project_name>
npm install
```
- Run local development server
```
npm run dev
```
- Using postman, curl, or your browser
```
GET http://localhost:8080
GET http://localhost:8080/patients
GET http://localhost:8080/records
```
- To use ESLint
```
npm run lint
```
- To run tests
```
npm run test
```
## ENV variables
The project uses [dotenv](https://github.com/motdotla/dotenv) to parse environment variables. To add environment variables to your project, simply, create a `.env` file in the root folder of the project. You can then reference it using `process.env.VAR_NAME`. For example, to change Node.js mode, simply add `NODE_ENV=production` or `NODE_ENV=development` to your `.env` file to change Node.js mode to production or development accordingly.

Remeber: it's not a good idea to push .env files to your repo!
## Logging
This project uses [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan) for logging. Winston is exported as a logger and can be used to log custom messages on demand. Also, it can be extended to push logs to files, external database, or any logging service.

Morgan is used as an http logger middleware for Express and the logs are routed through Winston, so everything is nicely bundled in one log stream.

All of these logs are written to console during development. Feel free to add production-specific loggers as and when needed.

## General notes
- This is meant to be a health tracking project.Feel free to contribute and add more successive features
- ESLint is run as part of the build command 
- This project could be deployed to Google Cloud using [gcloud CLI](https://cloud.google.com/sdk/docs/install) without any modifications
```
gcloud run deploy
```