const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const https = require('https');
const fs = require('fs');
const config = require('./config.json');
const routes = require('./backend/routes');

const app = express();
const privKey = fs.readFileSync(process.env.CF_PRIVKEY_PATH);
const cert = fs.readFileSync(process.env.CF_CERT_PATH);
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/getClass', routes.getClass);
app.get('/getInstructors', routes.getInstructors);
app.get('/searchClasses', routes.getClass);
app.use(express.static('dist'));

mongoose.connect(process.env.CF_MONGO_URL, config.mongooseConfig).then(() => {
  console.log(`connected to ${config.mongodbURL}`);
  console.log('Starting server');
  https.createServer({
    key: privKey,
    cert,
  }, app).listen(process.env.CF_API_PORT);
}).catch((err) => {
  console.error(`${err}`);
});
