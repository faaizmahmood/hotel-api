var express = require("express");
var router = express.Router();
const connection = require("../database/sql");

router.get('/', function (req, res) {
    const query = 'SELECT * FROM rooms';

    connection.query(query, function(err, results) {
        if(err) {
            console.log('SQL Error:', err.message);
            return res.status(500).send('Error occurred while fetching room data.');
        }

        res.status(200).json(results);
    });
});


router.put('/:roomNo', function (req, res) {
    const roomNo = req.params.roomNo;

    const {AvailabilityStatus} = req.body

    const query = `
        UPDATE rooms
        SET AvailabilityStatus = ?
        WHERE roomNo = ?
    `;

    connection.query(query, [AvailabilityStatus, roomNo], function (err, results) {
        if (err) {
            console.log('SQL Error:', err.message);
            return res.status(500).send('Error occurred while updating room status.');
        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Room not found.');
        }

        res.status(200).send('Room status updated successfully.');
    });
});

module.exports = router;
