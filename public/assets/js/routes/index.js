const router = require('express').Router();
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

router.post('/notes', (req, res) => {
    const newNote = req.body;

    fs.readFile(dbFilePath, 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error'});
            return;
        }

        const notes = JSON.parse(data)

        newNote.id = Date.now().toString();
        notes.push(newNote);
        fs.writeFile(dbFilePath, JSON.stringify(notes), 'utf8', (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error'})
                return;
            }
            res.json(newNote);
        })
    })
})

module.exports = router;


