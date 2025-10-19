const mongoose = require('mongoose');

// Define the schema for the Note document
const NoteSchema = new mongoose.Schema({
    // The title of the note. It is required and must be a string.
    noteTitle: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends of the string
        minlength: 1 // Ensures the title is not just an empty string
    },
    
    // The main content/description of the note. It is required and must be a string.
    noteDescription: {
        type: String,
        required: true
    },
    
    // The priority level of the note.
    priority: {
        type: String,
        required: true,
        // Enforces that the value must be one of these three strings
        enum: ['HIGH', 'LOW', 'MEDIUM'], 
        default: 'LOW' // Sets a default value if not explicitly provided
    },
    
    // The date the note was first added.
    dateAdded: {
        type: Date,
        default: Date.now, // Automatically sets the current date/time when created
        immutable: true // Prevents this field from being updated after creation
    },
    
    // The date the note was last updated.
    dateUpdated: {
        type: Date,
        default: Date.now // Automatically sets the current date/time on creation
    }
});

// Use a pre-save hook to automatically update the dateUpdated field 
// whenever a Note document is saved (after creation)
NoteSchema.pre('save', function(next) {
    // Only run if the document is being modified (not just created)
    if (this.isModified()) {
        this.dateUpdated = Date.now();
    }
    next();
});

// Create the Mongoose Model from the schema
const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;