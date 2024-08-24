const express = require('express');
const router = express.Router();
const connection = require('../database/sql');

router.post('/', function (req, res) {
    const { roomNo, roomType, userName, userContact, userEmail, checkInDate, checkOutDate, duration, pricePerDay, totalPrice, userId } = req.body;

    const query = `
        INSERT INTO bookings (roomNo, roomType, userName, userContact, userEmail, checkInDate, checkOutDate, duration, pricePerDay, totalPrice, userId)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    console.log('Query:', query);
    console.log('Values:', [roomNo, roomType, userName, userContact, userEmail, checkInDate, checkOutDate, duration, pricePerDay, totalPrice, userId]);

    connection.query(query, [roomNo, roomType, userName, userContact, userEmail, checkInDate, checkOutDate, duration, pricePerDay, totalPrice, userId], function(err) {
        if (err) {
            console.log('SQL Error:', err.message);
            return res.status(500).send('Error occurred while booking the room.');
        }

        res.status(200).send('Room booked successfully.');
    });
});

router.get('/', function (req, res) {
    const query = 'SELECT * FROM bookings';

    connection.query(query, function (err, results) {
        if (err) {
            console.log('SQL Error:', err.message);
            return res.status(500).send('Error occurred while retrieving bookings.');
        }

        // Log results to verify data
        console.log('Query Results:', results);

        res.status(200).json(results);
    });
});

// DELETE route to remove a booking record
router.delete('/:id', function (req, res) {
    const { id } = req.params;

    const query = 'DELETE FROM bookings WHERE roomNo = ?';

    console.log('Query:', query);
    console.log('Values:', [id]);

    connection.query(query, [id], function (err, results) {
        if (err) {
            console.log('SQL Error:', err.message);
            return res.status(500).send('Error occurred while deleting the booking.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Booking not found.');
        }

        res.status(200).send('Booking deleted successfully.');
    });
});

module.exports = router;
