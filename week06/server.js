const express = require('express');
const mongoose = require('mongoose');

// --- 1. IMPORT ROUTES ---
// The path MUST be relative to server.js's location (i.e., within the current folder).
const noteRouter = require('./routes/NoteRoutes.js'); 

// The DB_URL fallback is updated to use your preferred database name (3123lab06).
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/3123lab06";
const PORT = process.env.PORT || 8081; // Using 8081 as default, but we know you run on 3000

const app = express();

app.use(express.json()); // Middleware to parse JSON body requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});

// --- 2. MOUNT ROUTES ---
// Mount the Note Router for all requests starting with '/api/notes'
app.use('/api/notes', noteRouter); 


// Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    // Correct log message for the database connection
    console.log("Successfully connected to the database 3123lab06"); 
    
    // Start the Express server
    app.listen(PORT, () => {
        // Logging the actual port being used
        console.log(`Server is listening on port ${PORT}`);
        // If your environment forces it to 3000, you will see 'Server is listening on port 3000'
    });
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err.message);
    process.exit();
});
