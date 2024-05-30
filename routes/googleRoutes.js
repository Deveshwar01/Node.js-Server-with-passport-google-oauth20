// Import required modules
import express from "express";
import passport from "passport";
import { User } from "../models/users.js"; // Import the User model
import { sendCookie } from "../utils/features.js"; // Import the sendCookie function
import dotenv from 'dotenv'; // Import dotenv for environment variables

dotenv.config(); // Load environment variables from .env file

// Create an instance of Express Router
const router = express.Router();

// Authenticate the user using Google OAuth
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL, // Redirect to CLIENT_URL on successful authentication
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`, // Redirect to CLIENT_URL/login/failed on failed authentication
  })
);

// Forward the request to Google's authentication server
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// Register or login user to the database
router.get("/login/success", async (req, res) => {
  // Check if user is authenticated
  if (req.user) {
    // Find user in the database by email
    let user = await User.findOne({ email: req.user.email });

    if (user) {
      // If user exists, send cookie and return
      return sendCookie(user, res, "Login successful", 200);
    } else {
      // If user does not exist, create new user and save to database
      user = new User({
        name: req.user.name,
        email: req.user.email,
      });
      await user.save();
      // Send cookie and return
      return sendCookie(user, res, "Registration successful", 201);
    }

    // Avoid sending another response here
  } else {
    // If user is not authenticated, return 403 Forbidden status
    res.status(403).json({ message: "Not Authorized" });
  }
});

// Handle login failure
router.get("/login/failed", (req, res) => {
  // Return 401 Unauthorized status and error message
  res.status(401).json({ message: "Login Failed" });
});

// Logout user
router.get("/logout", (req, res) => {
  // Logout user using Passport's logout method
  req.logout((err) => {
    if (err) {
      console.log(err);
      // Return 500 Internal Server Error status and error message if logout fails
      return res.status(500).json({ error: "Failed to logout" });
    }
    // Redirect user to home page after successful logout
    res.redirect("/");
  });
});

// Export the router
export default router;
