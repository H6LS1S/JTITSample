# JTITSample

## Description
These two projects are a test task for a full-stack engineer ( Node.js + Vue.js ). Nuxt.js was chosen as a framework for the Back-end because of its flexibility and speed of deployment. TypeORM framework was chosen for the DAL because of my love for typescript. And Vue under the bonnet Nuxt.js ( Vue, Vuex, VueRoute, Babel ) with Vuetify style. All this hell is working on a local machine in conjunction with a docker composer this structure includes a database - MySQL, SQL browser - PHPMyAdmin, SMTP server - DevMail. All necessary environment variables will be presented below.

## Features
- Validation DTO requests
- Auth by JWT ( Bearer ) token
- Migrating to default data: `User` ( admin@admin.com : password ), `Companies`, `Employees`
- Automatically create database schema
- CRUD on company and employee controllers
- Upload image based on multipart/form-data with validation resolution image ( min: 100x )
- Email notification when create a company
- OpenAPI: `http://localhost:8081/api/`

## Installing
Install project dependencies and start a local server and client app with the following terminal commands:

```bash
$ npm install
$ npm run start
```

## Run for dev
Before run the application, run docker virtual machines `npm run database:up`. Docker composer requires an environment variable file named `.env`. This can be duplicated from any other environment variable file: `development.env`. Run `npm run start:dev` to dev mode the projects.

## Build
Before building the application, make sure you have a production.env file. This can be duplicated from any other environment variable file: `development.env` or `text.env`. Run `npm run build` to build the projects. The build artifacts will be stored in the `dist/` directory.

>Other options for launching application are indicated directly in the application directory.
