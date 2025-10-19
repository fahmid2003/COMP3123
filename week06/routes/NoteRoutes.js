const express = require('express');
const noteRoutes = express.Router();

// Import the Note model (correcting the filename to NotesModel.js)
const noteModel = require('../models/NotesModel.js');

// Helper function for general error response
const handleError = (res, err, defaultMessage) => {
    console.error(err);
    if (err.kind === 'ObjectId' || err.name === 'CastError') {
        return res.status(404).send({
            message: "Note not found with the provided ID."
        });                 
    }
    res.status(500).send({
        message: err.message || defaultMessage
    });
};

// =======================================================
// TODO - Create a new Note (POST /api/notes)
// =======================================================
noteRoutes.post('/', async (req, res) => {
    // Validate request based on the Mongoose Schema (Title and Description are required)
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note Title and Note Description can not be empty"
        });
    }

    // Create a new Note instance
    const note = new noteModel({
        noteTitle: req.body.noteTitle,
        noteDescription: req.body.noteDescription,
        // The priority will default to 'LOW' if not provided, 
        // or Mongoose will validate it against the enum if provided.
        priority: req.body.priority 
    });

    // Save Note in the database
    try {
        const data = await note.save();
        // Send a 201 Created status and the new note data
        res.status(201).send(data);
    } catch (err) {
        handleError(res, err, "Some error occurred while creating the Note.");
    }
});

// =======================================================
// TODO - Retrieve all Notes (GET /api/notes)
// =======================================================
noteRoutes.get('/', async (req, res) => {
    // Note: Removed incorrect validation check for req.body.content 
    // as GET requests to retrieve all items do not use a body.

    // Write your code here to return all notes
    try {
        // Retrieve all notes, optionally sorting by dateAdded
        const notes = await noteModel.find().sort({ dateAdded: -1 });
        res.send(notes);
    } catch (err) {
        handleError(res, err, "Some error occurred while retrieving notes.");
    }
});

// =======================================================
// TODO - Retrieve a single Note with noteId (GET /api/notes/:noteId)
// =======================================================
noteRoutes.get('/:noteId', async (req, res) => {
    // Note: Removed incorrect validation check for req.body.content

    // Write your code here to return only one note using noteid
    try {
        const note = await noteModel.findById(req.params.noteId);
        
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    } catch (err) {
        handleError(res, err, "Error retrieving note with id " + req.params.noteId);
    }
});

// =======================================================
// TODO - Update a Note with noteId (PUT /api/notes/:noteId)
// =======================================================
noteRoutes.put('/:noteId', async (req, res) => {
    // Validate request (Title and Description are required for an update)
    if (!req.body.noteTitle || !req.body.noteDescription) {
        return res.status(400).send({
            message: "Note Title and Note Description can not be empty for update."
        });
    }
    
    // Find note and update it
    try {
        const note = await noteModel.findByIdAndUpdate(
            req.params.noteId, 
            req.body, 
            { 
                new: true,          // Returns the new updated document
                runValidators: true // Ensures schema validators run on update
            }
        );

        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    } catch (err) {
        handleError(res, err, "Error updating note with id " + req.params.noteId);
    }
});

// =======================================================
// TODO - Delete a Note with noteId (DELETE /api/notes/:noteId)
// =======================================================
noteRoutes.delete('/:noteId', async (req, res) => {
    // Note: Removed incorrect validation check for req.body.content

    // Write your code here to delete the note using noteid
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId);

        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({ message: "Note deleted successfully!" });
    } catch (err) {
        handleError(res, err, "Could not delete note with id " + req.params.noteId);
    }
});

module.exports = noteRoutes;
