// Import necessary modules
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/users.js"; // Ensure this path is correct

// Function to configure Passport.js for Google OAuth authentication
const passportUtil = (app) => {
  // Configure Express session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET, // Session secret for encrypting session data
      resave: false, // Do not save session if not modified
      saveUninitialized: false, // Do not save uninitialized session
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // Cookie expiration time: 1 day
      },
    })
  );

  // Initialize Passport middleware
  app.use(passport.initialize());

  // Use Passport session middleware
  app.use(passport.session());

  // Configure Google OAuth strategy
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID, // Google OAuth client ID
        clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth client secret
        callbackURL: "/auth/google/callback", // Callback URL after successful authentication
        scope: ["profile", "email"], // Requested user data scopes
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find user by Google ID
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            // Create new user if not found
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            });
            await user.save();
          }
          return done(null, user); // Pass user to the callback function
        } catch (error) {
          return done(error, null); // Pass error to the callback function
        }
      }
    )
  );

  // Serialize user object to store in session
  passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in session
  });

  // Deserialize user object from session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Find user by ID
      done(null, user); // Pass user to the callback function
    } catch (error) {
      done(error, null); // Pass error to the callback function
    }
  });
};

// Export the Passport configuration function
export default passportUtil;
