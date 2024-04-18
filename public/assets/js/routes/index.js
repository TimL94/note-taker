const router = require('express').Router();
const { error } = require('console');
const fs = require('fs');
const path =require('path');

const dbFilePath = path.resolve(__dirname, '../db.json');

router.get('/notes', (req, res) => {
    fs.readFile(dbFilePath, 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'});
            return;
        }

        const notes = JSON.parse(data);
        res.json(notes);
    });
});


