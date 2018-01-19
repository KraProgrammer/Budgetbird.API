const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express(); // execute express

// routes
const rootRoutes = require('./routes/root');
const journeyRoutes = require('./routes/journey');
const userRoutes = require('./routes/user');


// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// fix cors errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // maybe later just budgetbird
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Routers for handle requests
app.use('/journey', journeyRoutes); // add middleware
app.use('/user', userRoutes);
app.use('/global', rootRoutes);


// Error handling for all other urls
app.use((req, res, next) => {
    const error = new Error('Endpoint not found!');
    error.status = 404;
    next(error);
});


// catch all thrown errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});


module.exports = app;