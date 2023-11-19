
# Delivery price calculator - PoC

This is a PoC for a new package delivery platform. 

## Core technologies used: 
- Node.js (Nest.js)
- PostgreSQL
- Docker

## Setup:
To setup the application all that is needed to do is to add the *.env* file to the root of the folder. The structure of the file should be setup and filled with corresponding values based on the environment in this way: 

**#Database Configuration**  
POSTGRES_USER=  
POSTGRES_PASSWORD=  
POSTGRES_NAME=  
DATABASE_URL=''  
PGADMIN_EMAIL=  
PGADMIN_PASSWORD=  

**#JWT Configuration**  
JWT_SECRET=  
 
**#Admin Configuration**  
ADMIN_USERNAME=  
ADMIN_PASSWORD=  

**#Email SMTP Configuration**  
EMAIL_USERNAME=  
EMAIL_PASSWORD=  

Afterwards in terminal, in the root of the project just run *docker compose up* and the app should be up and running. 
The API can be reached at the https://localhost:3000/swagger and is ready to recieve requests. 

## Instructions
Admin user can create or update the calculator. It is first needed to login as admin user, based on the values in *.env* file in *Admin configuration* section. After that you can authorize in Swagger with the access_token you have received from login endpoint, and then create or update the calculator. 

Anonymus user can create delivery request, which will provide him the value of the total cost of his delivery, while all the corresponding details of the delivery request will be sent to his email. 

## Dependencies included:

- **Prisma** - Prisma ORM is included into the project to have a stable and type-safe database access, to enhance developer productivity while minimizing the risk of runtime errors. Without Prisma the app would be less secure, more error prone and less maintainable in the future. 
- **Nodemailer** - Nodemailer is included into the project to have seamless email integration. Its support for various email services make it an essential tool for implementing rich set of features, such as user verification, password reset, notification, etc.. Without it we would not have reliable mechanism for handling email communication, and the implementation of a new one would increase complexity of the app, raise security concerns and would take time to implement.