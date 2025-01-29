const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// Get all questions
// Get all questions
router.get('/', async (req, res) => {
    console.log("GET request to /api/questions received");  // Log to verify the request
    try {
        const questions = await Question.find();
        
        if (!questions || questions.length === 0) {
            console.log('No questions found in DB');  // Log if no data is returned
        } else {
            console.log('Questions from DB:', questions);  // Log the questions fetched from the database
        }

        res.json(questions);  // Send the data back to the client
    } catch (error) {
        console.error("Error fetching questions:", error);  // Log any error that happens
        res.status(500).json({ message: error.message });
    }
});


// Add a new question
router.post('/', async (req, res) => {
    const { question, options, correctOption } = req.body;

    const newQuestion = new Question({
        question,
        options,
        correctOption
    });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion); // __v will be excluded due to schema options
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;