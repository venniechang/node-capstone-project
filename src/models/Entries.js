'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const EntriesSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        //unique: true
    },
    date: {
        type: Date,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    typeOfEntry: {
        type: String,
        required: true
    },
    attachedImage: {
        type: String
    }
});

const Entries = mongoose.model('Entries', EntriesSchema);

module.exports = {Entries};