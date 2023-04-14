require("dotenv").config();
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGO_URL
const environment = process.env.ENVIRONMENT;



const createWebServer = () => {
    const items = require('./routes/items')
    const auth = require('./routes/user')
    const bodyParser = require('body-parser')
    const cors =  require('cors')
    // Middlewares
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.use(cors())

    app.use('/items', items)
    app.use('/auth', auth)

}

// Database Connectivity
const dbConnection = (MONGODB_URI) => {
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: false, driverInfo: { platform: 'EMR-admin-Dashboard' } }).then(result => {
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}.`)
        });
    }).catch(err => console.log(err));
}

// check condition for diffrent-2 enviroment

try {
    if (['stage', 'prod'].includes(environment)) {

    } else {
        dbConnection(MONGODB_URI);
        createWebServer();
    }
} catch (err) {
    console.log(err)
}
