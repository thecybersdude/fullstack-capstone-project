// db.js
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// MongoDB connection URL with authentication options
let url = `${process.env.MONGO_URL}`;

let dbInstance = null;
const dbName = "giftdb";

router.post('/login', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const users = db.collection("users");

		const user = await users.findOne({ email: req.body.email });
		// Task 4: Task 4: Check if the password matches the encrypyted password and send appropriate message on mismatch
        // Task 5: Fetch user details from database
		// Task 6: Create JWT authentication if passwords match with user._id as payload
        res.json({authtoken, userName, userEmail });
		// Task 7: Send appropriate message if user not found
    } catch (e) {
         return res.status(500).send('Internal server error');

    }
});


async function connectToDatabase() {
    if (dbInstance){
        return dbInstance
    };

    const client = new MongoClient(url);      

    // Task 1: Connect to MongoDB
    await client.connect()

    // Task 2: Connect to database giftDB and store in variable dbInstance
    dbInstance = client.db(dbName);

    // Task 3: Return database instance
    return dbInstance;
}

module.exports = connectToDatabase;
