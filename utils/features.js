// Import JWT for token generation
import jwt from 'jsonwebtoken';

// Function to send JWT token as a cookie in the response
export const sendCookie = (user, res, message, statusCode) => {
    // Generate JWT token with user data and JWT_SECRET from environment variables
    const token = jwt.sign({ _id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '15m' // Token expires in 15 minutes
    });

    // Set cookie in the response with the JWT token
    res
        .status(statusCode) // Set status code of the response
        .cookie("token", token, {
            httpOnly: true, // Cookie accessible only via HTTP(S)
            maxAge: 15 * 60 * 1000, // Max age of the cookie: 15 minutes
        })
        .json({
            success: true,
            token, // Send the token in the response body
            message, // Send a message in the response body
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
            } // Send user data in the response body
        });
};
