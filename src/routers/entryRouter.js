'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Entries} = require('../models/Entries');
const passport = require('passport');
const entryRouter = express.Router();
const jsonParser = bodyParser.json();

//Title, Date, Story, typeOfDream, image

//GET POST PUT DELETE

const jwtAuth = passport.authenticate('jwt', {session: false});

entryRouter.get('/', jwtAuth, (req, res) => {
    return Entries.find({
        username: req.user.username
    })
    .then(Entries => res.json(Entries))
    //.catch(err => res.status(500).json({message: 'Internal server error'}));
})

entryRouter.get('/:id', (req, res) => {
    Entries.findById(req.params.id)
    .then(entry => {
        res.json(entry);
    })
    .catch(err => res.status(500).json({message: 'No entry found'}))
})

entryRouter.post('/', jsonParser, jwtAuth, (req, res) => {

    let {name, date, story, typeOfEntry} = req.body;

    const requiredFields = ['name', 'date', 'story', 'typeOfEntry'];
    return Entries.create({
        username: req.user.username,
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