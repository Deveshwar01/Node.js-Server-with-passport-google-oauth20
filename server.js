// Import the Express app instance
import { app } from "./app.js";

// Import the function to connect to the database
import { connectDB } from "./DB/database.js";

// Connect to the database
connectDB();

// Start the Express server
app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});
