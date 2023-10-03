const express = require('express');
const routerApi = require('./src/routes');
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler
} = require('./src/middlewares/error.handler');
const cors = require('cors');


const app = express()
const port = process.env.PORT || 3001
app.use(express.json())

//cors whitelist
const whitelist = ['http://localhost:3001', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Accesss not allowed'));
    }
  },
};
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Hello World con Node.js!')
}
)

routerApi(app);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
)
 