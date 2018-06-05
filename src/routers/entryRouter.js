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

entryRouter.put('/:id', jsonParser, jwtAuth, (req, res) => {
    let updatedEntry = {};
    const updateableFields = ['name', 'date', 'story', 'typeOfEntry'];
    updateableFields.forEach( key => {
      if (key in req.body) {
        updatedEntry[key] = req.body[key];
      };
    });
    Entries.findByIdAndUpdate(req.params.id, { $set: updatedEntry }, {new: true})
    .then(result => {
      const message = 'Sucessfully Updated Entry';
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({error: 'Error Updating Entry. Please try again.'});
    });
  });



entryRouter.delete('/:id', jwtAuth, (req, res) => {
    Entries.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({message: 'Successfully Deleted Entry'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Error Deleting Entry. Please try again.'});
    });
  });
  


module.exports = {entryRouter}

