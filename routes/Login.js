const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const connection = require('../database/sql');

router.post('/', function (req, res) {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).send('Email and Password are required.');
  }

  const query = 'SELECT * FROM users WHERE LOWER(email) = LOWER(?)';

  connection.query(query, [Email], async function (err, results) {
    if (err) {
      return res.status(500).send('Error occurred while fetching user data.');
    }

    if (!results || results.length === 0) {
      return res.status(404).send('User does not exist.');
    }

    const user = results[0];

    try {
      const match = await bcrypt.compare(Password, user.password);
      if (Password === user.password) {
        return res.status(200).json({ user }); 
      } else {
        return res.status(401).send('Invalid credentials.');
      }
    } catch (error) {
      return res.status(500).send('Error occurred while processing your request.');
    }
  });
});

module.exports = router;
