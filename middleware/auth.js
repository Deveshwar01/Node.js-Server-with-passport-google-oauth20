import { User } from "../models/users.js";
import jwt from "jsonwebtoken";

// Middleware to check if the user is authenticated
export const isAuthenticated = async (req, res, next) => {
    // Retrieve the token from cookies
    const token = req.cookies.token;
    // // If there is no token, send a 401 Unauthorized response
    // if (!token) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "Login First",
    //     });
    // }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user based on the email decoded from the token
        const user = await User.findOne({ email: decoded.email });

        // If the user is not found, send a 404 Not Found response
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Determine the user's role based on their email domain
        const domain = user.email.split('@')[1];
        if (domain === "girsoftware.com") {
            user.role = 'admin';
        } else {
            user.role = 'user';
        }

        // Attach the user object to the request
        req.user = user;
        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If there is an error in verifying the token, send a 403 Forbidden response
        return res.status(403).json({
            success: false,
            message: error.message,
        });
    }
};
