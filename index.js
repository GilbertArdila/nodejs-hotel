const express = require("express");
//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");


const routerApi = require("./src/routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./src/middlewares/error.handler");


//cors
const cors = require("cors");


// swagger specifications
const swaggerSpec = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API para manerjar las reservaciones de un Hotel",
      version: "0.0.1",
      description: "Hotel API",
      contact: {
        name: "Gilbert Ardila",
        email: "gilbertferney@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:3001",
        }
      ],
    },
  },
  apis: ["./src/routes/*.js"],
};

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

// swagger middleware
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerSpec))
);

//cors whitelist
const whitelist = ["http://localhost:3001"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Accesss not allowed"));
    }
  },
};
app.use(cors(options));

//strategies call
require('./src/auth');

app.get("/", (req, res) => {
  res.send("Please use the base endpoint api/v1");
});

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
