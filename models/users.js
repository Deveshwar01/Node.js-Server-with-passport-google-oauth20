// Import Mongoose
import mongoose from "mongoose";

// Define the schema for the User model
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
    },
    email: {
        type: String,
        required: true, // Email is required
        unique: true, // Email must be unique
    },
    password: {
        type: String,
        select: false,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Role must be either 'user' or 'admin'
        default: 'user', // Default role is 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default value for createdAt is current timestamp
    }
});

// Create the User model using the schema
export const User = mongoose.model('User', schema);
