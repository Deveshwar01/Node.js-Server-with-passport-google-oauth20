// Import Mongoose
import mongoose from "mongoose";

// Define the schema for the Advertisement model
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true, // Title is required
    },
    image: {
        type: String,
        required: true, // Image URL is required
        unique: true, // Image URL must be unique
    },
    description: {
        type: String,
        required: true, // Description is required
        select: false, // Do not include description by default when querying
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default value for createdAt is current timestamp
    }
});

// Create the Advertisement model using the schema
export const Advertisement = mongoose.model('Advertisement', schema);
