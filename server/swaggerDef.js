const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Documentation",
      version: "1.0.0",
      description: "Description of your API",
    },
    servers: [
      {
        url: "http://localhost:4000", // Replace with your server URL
        description: "Development server",
      },
    ],
  },
  apis: ["./Routes/*.js"], // Specify your routes here
};

const specs = swaggerJsdoc(options);

module.exports = specs;
