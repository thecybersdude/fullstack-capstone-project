const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino');


const logger = pino();  // Create a Pino logger instance

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    try {
		const db = await connectToDatabase();

		const collection = db.collection("users");

		const existingEmail = await collection.findOne({ email: req.body.email });

		const salt = await bcryptjs.genSalt(10);
        const hash = await bcryptjs.hash(req.body.password, salt);
		const email = req.body.email;

        const newUser = await collection.insertOne({
            email: email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: hash,
            createdAt: new Date(),
        });

		        const payload = {
            user: {
                id: newUser.insertedId,
            },
        };

        const authtoken = jwt.sign(payload, JWT_SECRET);

        logger.info('User registered successfully');
        res.json({authtoken,email});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});

// {Insert it along with other imports} Task 1: Use the `body`,`validationResult` from `express-validator` for input validation

router.put('/update', async (req, res) => {
    const { body, validationResult } = require('express-validator');
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        logger.error('Validation errors in update request', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

     const email = req.headers.email;

        if (!email) {
            logger.error('Email not found in the request headers');
            return res.status(400).json({ error: "Email not found in the request headers" });
        }


    try {
        // Task 3: Check if `email` is present in the header and throw an appropriate error message if not present.
        // Task 4: Connect to MongoDB
		// Task 5: find user credentials in database

		existingUser.updatedAt = new Date();

		// Task 6: update user credentials in database
		// Task 7: create JWT authentication using secret key from .env file
        res.json({authtoken});
    } catch (e) {
         return res.status(500).send('Internal server error');
    }
});


module.exports = router;
