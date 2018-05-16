'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();

const {User} = require('../src/models');
const {Entries} = require('../src/models');
const {closeServer, runServer, app} = require('../src/server');
const {TEST_DATABASE_URL, JWT_SECRET} = require('../src/config');

chai.use(chaiHttp);

function tearDownDb(){
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function seedDreamEntry(){
    console.log('placeholder');
}


describe('dream entry API resource', function (){

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function (){
        return seedDreamEntry();
    });

    afterEach(function(){
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

    describe('GET dream collection', function(){

        it('should return every dream in the collection', function(){

            let res;
            return chai.request(app)
                .get('/entries')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1);

                    return Entries.count();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                })
        })
    })




















})