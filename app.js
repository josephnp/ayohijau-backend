const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const userRoute = require('./routers/user.router');
const plantRoute = require('./routers/plant.router');
const cartRoute = require('./routers/cart.router');
const orderRoute = require('./routers/order.router');
const userPlantRoute = require('./routers/userplant.router');
const photoRoute = require('./routers/photo.router');
const pointRoute = require('./routers/point.router');

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use('/uploads', express.static('uploads'));
app.use('/', userRoute);
app.use('/', plantRoute);
app.use('/', cartRoute);
app.use('/', orderRoute);
app.use('/', userPlantRoute);
app.use('/', photoRoute);
app.use('/', pointRoute);

module.exports = app;