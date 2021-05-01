const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./back-end/routes/authRoutes');
const courseRoutes = require('./back-end/routes/courseRoutes');
const { requireAuth } = require('./back-end/middleware/authMiddleware');
const { checkUser } = require('./back-end/middleware/authMiddleware');

//Start an express app
const app = express();

// Parse requests of content type - application/JSON
app.use(express.json());

// Parse requests of content type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Set headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


// Connect to MongoDB
const url = 'mongodb://localhost:27017/e-learning';
const connect = mongoose.connect(url, { useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });


// Listen for requests
app.listen(3000, () => console.log('server listening for requests on port 3000'))

app.use("/api", authRoutes);
app.use("/api/courses", courseRoutes);
