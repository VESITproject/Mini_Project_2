const express = require("express");
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
// const upload = require("../controller/crud-cont");


// Middleware for parsing request body
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',  // The frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],  // Allowed headers
  }));


// Serve static files



// Adjust import path for crud-route

// app.use("/crud", crudRoute); // Use the /crud prefix for CRUD routes
// app.use('/crud/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// User registration endpoint
app.post('/register', async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ status: "Error", message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Generate JWT token for the newly registered user
        const token = jwt.sign({
            userId: newUser._id,
            email: newUser.email,
        }, 'secret23', { expiresIn: '2h' }); // Set token expiration to 1 hour

        res.json({ status: "OK", user: newUser, token }); // Include token in the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
});
app.post('/', async (req, res) => {
    try {
        // Find user by email
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ status: "Error", message: "User not found" });
        }

        // Check password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ status: "Error", message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
            },
            'secret23', // Replace with a secure secret in production
            { expiresIn: '2h' }
        );

        // Determine if it's the user's first login
        const isFirstTime = !user.lastLogin; // Example: Check if lastLogin field is null

        // Update lastLogin field in the database
        user.lastLogin = new Date();
        await user.save();

        // Return user data, token, and first-time flag
        res.json({
            status: "OK",
            user: {
                email: user.email,
                name: user.name,
                isFirstTime, // Include the first-time flag
            },
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "Error", message: "Internal Server Error" });
    }
});

app.get(`/home/:id`, async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header
    if (!token) {
      return res.status(401).json({ status: 'Error', message: 'Token not provided' });
    }
  
    try {
      const decoded = jwt.verify(token, 'secret23');
      const email = decoded.email;
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ status: 'Error', message: 'User not found' });
      }
  
      // Send only the necessary data (e.g., name, email)
      res.json({ status: 'OK', user: { name: user.name, email: user.email } });
      
    } catch (error) {
      console.error(error);
      res.status(401).json({ status: 'Error', message: 'Invalid or expired token' });
    }
  });
  
  
// app.get('/home', async (req, res) => {
//     const token = req.headers['x-access-token'];
//     if (!token) {
//         return res.status(401).json({ status: 'Error', message: 'Token not provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'secret123'); // Validate the token
//         const email = decoded.email;
//         const user = await UserModel.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ status: 'Error', message: 'User not found' });
//         }

//         res.json({ status: 'OK', user }); // Return user info
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ status: 'Error', message: 'Invalid or expired token' });
//     }
// });

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
});

app.use('/api/aqi', aqiRoutes);
app.use('/predict', predictionRoutes);