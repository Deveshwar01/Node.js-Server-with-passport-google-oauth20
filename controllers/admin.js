import { Advertisement } from "../models/ads.js";

// Controller for getting all Advertisements
export const getAllAdvertisement = async (req, res, next) => {
    try {
        // Find all Advertisements
        const Advertisements = await Advertisement.find({}, { updatedAt: 0, __v: 0 });

        // If no Advertisements found, return a 404 error
        if (Advertisements.length === 0) return res.status(404).json({ success: false, message: "No Advertisement exists" });

        // Respond with success message and Advertisement list
        return res.status(200).json({ success: true, status_code: 200, Advertisements });
    } catch (error) {
        next(error);
    }
}
