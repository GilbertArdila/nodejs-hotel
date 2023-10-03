const express = require('express');

const userRouter = require('./users.routes');
const employeeRouter = require('./employees.routes');
const guestRouter = require('./guests.routes');
const roomRouter = require('./rooms.routes');
const reservationRouter = require('./reservations.routes');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', userRouter);
    router.use('/employees', employeeRouter);
    router.use('/guests', guestRouter);
    router.use('/rooms', roomRouter);
    router.use('/reservations', reservationRouter);
}

module.exports = routerApi;
