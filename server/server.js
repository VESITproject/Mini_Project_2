import express from"express";
const app = express();
const UserModel = require("./models/user");
const path = require('path');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDB = require("./utils/db");
const cors = require("cors");
const aqiRoutes = require("./routes/aqiRoutes")
const predictionRoutes = require("./routes/predictionRoutes")
const PORT = 5001;


// Middleware for parsing request body
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // The frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],  // Allowed headers
}));

// Serve static files
app.use("/", router);

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});

app.use('/api/aqi', aqiRoutes);
app.use('/predict', predictionRoutes);