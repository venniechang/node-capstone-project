'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
const {User} = require('../src/models');
const {closeServer, runServer, app} = require('../src/server');
const {TEST_DATABASE_URL, JWT_SECRET} = require('../src/config');

chai.use(chaiHttp);