const express = require("express");
const router = express.Router();
const connection = require('../database/sql');

router.post('/', function(req, res) {
    const { Name, Email, Contact, Password, Role, userId } = req.body;

    const checkEmailQuery = `SELECT * FROM users WHERE email = ?`;

    connection.query(checkEmailQuery, [Email], function(err, results) {
        if (err) {
            console.error('SQL Error during email check:', err);
            return res.status(500).json({ message: 'Error occurred while checking email', error: err });
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const insertUserQuery = `
            INSERT INTO users (name, email, password, phone, userType, userId)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        connection.query(insertUserQuery, [Name, Email, Password, Contact, Role, userId], function(err) {
            if (err) {
                console.error('SQL Error during user insertion:', err);
                return res.status(500).json({ message: 'Error occurred while signing up', error: err });
            }

            res.status(200).json({ message: 'SignUp successfully!' });
        });
    });
});

module.exports = router;
