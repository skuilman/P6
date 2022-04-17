// Requires
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config()

// Mongoose connect  
  mongoose.connect(process.env.DB_ADMIN,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Successfully connected to MongoDB!'))
  .catch(() => console.log('Unable to connect to MongoDB!'));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(helmet());

app.use('/api/sauces', sauceRoutes) 
app.use('/api/auth', userRoutes);

module.exports = app;