const express = require('express');
const path = require('path');
const app = express();
//require('dotenv').config();
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');



app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

const publicDirectory = path.join(__dirname, '../public');

//add another link to get to entries.html
app.get("/entries", (req, res) => {
    res.sendFile('entries.html', {root: publicDirectory});
})

app.get("/add-entry", (req, res) => {
    res.sendFile('addentry.html', {root: publicDirectory});
})

app.get("/login", (req, res) => {
    res.sendFile('login.html', {root: publicDirectory});
})

app.get("/register", (req, res) => {
    res.sendFile('register.html', {root: publicDirectory});
})

app.get("/settings", (req, res) => {
    res.sendFile('settings.html', {root: publicDirectory});
})
