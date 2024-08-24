const express = require('express')
const router = express.Router()
const connection = require("../database/sql")


router.post('/', function (req, res) {

    const {
        checkInDate,
        checkOutDate,
        duration,
        pricePerDay,
        roomNo,
        roomType,
        totalPrice,
        userContact,
        userEmail,
        userId,
        userName,
        reviewText,
        rating
    } = req.body

    const query = `INSERT INTO reviews (checkInDate, checkOutDate, duration, pricePerDay, roomNo, roomType, totalPrice, userContact, userEmail, userId, userName, reviewText, rating)
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    connection.query(query, [checkInDate, checkOutDate, duration, pricePerDay, roomNo, roomType, totalPrice, userContact, userEmail, userId, userName, reviewText, rating], function (err) {
        if (err) {
            console.log('SQL Error:', err.message);
            return res.status(500).send('Error occurred while Submitting Review booking.');
        }

        res.status(200).send('Room booked successfully.');
    })

})


router.get('/', (req, res) => {
    const query = 'SELECT * FROM reviews';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).send('Error occurred while fetching employees.');
        }

        res.status(200).json(results);
    });
});

module.exports = router