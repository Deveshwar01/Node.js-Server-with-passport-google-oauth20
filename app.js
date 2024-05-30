// Import necessary modules
import express from "express";
import cors from "cors";
import session from "express-session";
import userRouter from "./routes/user.js"; // Import user routes
import adminRouter from "./routes/admin.js"; // Import admin routes
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import googleRoutes from './routes/googleRoutes.js'; // Import Google OAuth routes
import passportUtil from "./utils/passport.js"; // Import Passport configuration

dotenv.config(); // Load environment variables from .env file

// Create an instance of Express app
export const app = express();

// Set CORS headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://advertisement.vercel.app"); // Allow requests from this origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH"); // Allow specified HTTP methods
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow specified headers
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials
  next();
});

// CORS middleware
app.use(cors({
  origin: 'https://advertisement.vercel.app', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allow specified HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers)
}));

// Body parsing middleware
app.use(express.json());

// Cookie parsing middleware
app.use(cookieParser());

// Initialize Passport and session
passportUtil(app);

// Routes

// Default route
app.get('/', (req, res) => {
  res.send('API! is  Working'); // Send a message indicating that the API is working
});

// User routes
app.use("/api/v1/user", userRouter);

// Admin routes
app.use("/api/v1/admin", adminRouter);

// Google OAuth routes
app.use('/auth', googleRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!'); // Send a generic error message
});
