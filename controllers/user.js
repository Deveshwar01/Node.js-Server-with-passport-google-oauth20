import { User } from "../models/users.js"; // Importing the User model
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing
import { sendCookie } from "../utils/features.js";


// / Controller for user login


export const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email }).select("+password");

        // If user not found, return error
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        // If passwords don't match, return error
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        // Send cookie with success message
        sendCookie(user, res, `Welcome back, ${user.name}`, 200);
    } catch (error) {
        next(error);
    }
};

// Controller for user logout



export const Register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user with email already exists
        let user = await User.findOne({ email });
        // If user exists, return error
        if (user) {
            return res.status(404).json({
                success: false,
                message: "User already exists"
            });
        }

        // Determine the role based on email domain
        const domain = email.split('@')[1];
        const role = (domain === 'dummyAdmin.com') ? 'admin' : 'user';

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        user = await User.create({ name, email, password: hashedPassword, role });

        // Send cookie with success message
        sendCookie(user, res, "Registered successfully", 201);
    } catch (error) {
        next(error);
    }
}


export const Logout = (req, res) => {
    // Clear token cookie and send success response
    res.status(200)
        .cookie("token", "", { expires: new Date(Date.now()) })
        .json({
            success: true,
            user: req.user,
        });
};