const express = require('express');
const Contact = require('../models/Contact');

const router = express.Router();

// Add a new contact
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    // Simple validation for required fields
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const newContact = new Contact({
        name,
        email,
        message
    });

    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);  // Return the saved contact data
    } catch (error) {
        console.error('Error saving contact:', error);  // Log the error
        res.status(400).json({ message: error.message });  // Send back the error message
    }
});

// Get all contacts
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();  // Query to fetch all contacts
        console.log('Contacts fetched:', contacts);  // Log fetched contacts (consider removing this in production)
        res.json(contacts);  // Send back the contacts as JSON
    } catch (error) {
        console.error('Error fetching contacts:', error);  // Log the error if any
        res.status(500).json({ message: 'Error fetching contacts, please try again later.' });  // General error message for client
    }
});

module.exports = router;
