'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Entries} = require('../models/Entries');
const router = express.Router();
const jsonParser = bodyParser.json();