// Import Express
import express from "express";

// Import controller functions for user authentication
import { Register, Login, Logout } from "../controllers/user.js";

// Import controller function for creating advertisements
import { createAds } from '../controllers/ads.js';

// Create an instance of Express Router
const router = express.Router();

// User authentication routes
router.post('/new', Register); // Route for user registration
router.post('/login', Login); // Route for user login
router.get('/logout', Logout); // Route for user logout

// Route for creating advertisements
router.post('/ads', createAds);

// Export the router
export default router;
