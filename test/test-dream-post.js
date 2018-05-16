'use strict'

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const should = chai.should();
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
    const seedData = [];
    for (let i = 0; i <= 9; i++) {
        seedData
        .push({
            name: faker.lorem.sentence(),
            date: new Date(),
            story: faker.lorem.text()
        })
    }
    return Entries.insertMany(seedData);
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

    describe ('POST dream collection' , function(){
        it('should add a new dream entry' , function(){

            const newEntry = {
                name: faker.lorem.sentence(),
                date: new Date(),
                story: faker.lorem.text()
            }
            return chai.request(app)
            .post('/entries')
            .send(newEntry)
            .then(function(res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('name', 'date', 'story');
                res.body.id.should.not.be.null;

                return Entries.findById(res.body.id);
            })
            .then(function(post){
                post.name.should.equal(newEntry.name);
                post.story.should.equal(newEntry.story);
            })
        })
    })

    describe ('PUT dream collection', function(){
        it('should update an existing dream entry', function(){

            const updateEntry = {
                name: faker.lorem.sentence(),
                entryDate: new Date(),
                story: faker.lorem.text()
            }
            return Entries
            .findOne()
            .then(entry => {
                updateEntry.id = entry.id
                return chai.request(app)
                .put(`/entries/${entry.id}`)
                .send(updateEntry);
            })
            .then(res => {
                res.should.have.status(204);
                return Entries.findById(updateEntry.id);
            })
            .then(entry => {
                entry.name.should.equal(updateEntry.name);
                entry.story.should.equal(updateEntry.story);
            })
        })
    })

    describe ('DELETE dream collection' , function(){
        it('should delete a dream entry', function(){

            let entry;

            return Entries
            .findOne()
            .then(_entry => {
                entry = _entry;
                return chai.request(app)
                .delete(`/entries/${entry.id}`);
            })
            .then(res => {
                res.should.have.status(204);
                return Entries.findById(entry.id);
            })
            .then(_entry => {
                should.not.exist(_entry);
            })
        })
    })
})