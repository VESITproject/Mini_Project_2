import express from"express";
const app = express();
import router from"./routes/auth_routes.js";
import connectDB from"./utils/db.js";
import cors from"cors";
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
