'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Entries} = require('../models/Entries');
const entryRouter = express.Router();
const jsonParser = bodyParser.json();

//Title, Date, Story, typeOfDream, image

//GET POST PUT DELETE



entryRouter.get('/', (req, res) => {
    return Entries.find()
    .then(Entries => res.json(Entries.map(user => user.serialize())))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
})

entryRouter.get('/:id', (req, res) => {
    Entries.findById(req.params.id)
    .then(entry => {
        res.json(entry);
    })
    .catch(err => res.status(500).json({message: 'No entry found'}))
})

entryRouter.post('/', jsonParser, (req, res) => {

    let {name, date, story, typeOfEntry} = req.body;

    const requiredFields = ['name', 'date', 'story', 'typeOfEntry'];
    return Entries.create({
        name,
        date,
        story,
        typeOfEntry
    })
    .then(entry => {
        res.json(entry);
    })
    .catch(err => res.status(500).json({message: 'Error Creating Entry'}))
})




module.exports = {entryRouter}