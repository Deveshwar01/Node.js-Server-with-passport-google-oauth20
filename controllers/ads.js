// Import the Advertisement model
import { Advertisement } from "../models/ads.js";

// Controller function to create advertisements
export const createAds = async (req, res, next) => {
    try {
        // Extract title, image, and description from the request body
        const { title, image, description } = req.body;

        // Check if required fields are provided
        if (!image || !title || !description) {
            // Return a 400 Bad Request response if any required field is missing
            return res.status(400).json({
                success: false,
                message: "Title, description, and image are required fields"
            });
        }

        // Create a new advertisement using the Advertisement model
        await Advertisement.create({ title, image, description });

        // Return a 201 Created response upon successful creation of the advertisement
        res.status(201).json({
            success: true,
            message: "Advertisement created successfully"
        });
    } catch (error) {
        // Pass any caught errors to the error handling middleware
        next(error);
    }
}
