const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const connection = require('../database/sql');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Route to add room data
router.post('/', upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
]), function (req, res) {
    const { roomNo, roomType, roomServantName, servantContact, pricePerDay, RoomDescription, AvailabilityStatus } = req.body;

    const CoverImageURL = req.files['coverImage'] ? req.files['coverImage'][0].filename : null;
    const image1URL = req.files['image1'] ? req.files['image1'][0].filename : null;
    const image2URL = req.files['image2'] ? req.files['image2'][0].filename : null;

    if (!CoverImageURL) {
        return res.status(400).json({ message: 'Cover Image is required.' });
    }



    const roomQuery = `
    INSERT INTO rooms (roomNo, roomType, roomServantName, servantContact, pricePerDay, RoomDescription, AvailabilityStatus, CoverImageURL, image1URL, image2URL)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(roomQuery, [roomNo, roomType, roomServantName, servantContact, pricePerDay, RoomDescription, AvailabilityStatus, CoverImageURL, image1URL, image2URL], function(err){
        if(err){
            return res.status(500).json({ message: 'Error occurred while inserting room data.', error: err });
        }

        
    
        res.status(200).json({ message: 'Room and images added successfully!' });
    });

});

module.exports = router;
