const express = require('express');
const router = express.Router();
const connection = require("../database/sql");

router.post('/', (req, res) => {
    const { name, email, phone, position, salary } = req.body;

    const query = `
        INSERT INTO employees (name, email, phone, position, salary)
        VALUES (?, ?, ?, ?, ?)
    `;

    connection.query(query, [name, email, phone, position, salary], (err) => {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).send('Error occurred while adding the employee.');
        }

        res.status(200).send('Employee added successfully.');
    });
});

// GET method for retrieving all employees
router.get('/', (req, res) => {
    const query = 'SELECT * FROM employees';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('SQL Error:', err.message);
            return res.status(500).send('Error occurred while fetching employees.');
        }

        res.status(200).json(results);
    });
});

module.exports = router;
