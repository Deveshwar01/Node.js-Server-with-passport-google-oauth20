// Import Express
import express from "express";

// Import the controller function for getting all advertisements
import { getAllAdvertisement } from '../controllers/admin.js';

// Import the middleware function for authenticating users
import { isAuthenticated } from "../middleware/auth.js";

// Create a router instance
const router = express.Router();

// Define a route to get all advertisements, protected by authentication middleware
router.get('/allads', isAuthenticated, getAllAdvertisement);

// Export the router
export default router;
