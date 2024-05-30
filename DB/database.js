// Import Mongoose
import mongoose from "mongoose";

// Function to connect to the database
export const connectDB = () => {
    // Connect to the database using the DATABASE_URL environment variable
    mongoose.connect(process.env.DATABASE_URL, {
        dbName: "MERNAPP", // Specify the name of the database
    })
        .then((c) => console.log(`Database connected`)) // Log a message if the connection is successful
        .catch((e) => console.log(e)); // Log any errors that occur during the connection process
}
