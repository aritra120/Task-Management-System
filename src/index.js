const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Importing database configuration and routes
const dbConfig = require('../config/database.config');
const config = require('../config/config');
const TaskRoutes = require('../src/routes/tasks.routes');
const UserRoutes = require('../src/routes/users.routes');

app.use(cors());

// Configure mongoose to use global promises
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected Successfully!!");
    })
    .catch(err => {
        console.error('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

// Setting up routes
app.use('/task', TaskRoutes);
app.use('/user', UserRoutes);

// Start the server
app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});
