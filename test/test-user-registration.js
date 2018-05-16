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

function tearDownDb(){
    return new Promise((resolve, reject) => {
        console.warn('Deleting database');
        mongoose.connection.dropDatabase()
            .then(result => resolve(result))
            .catch(err => reject(err));
    });
}

function seedUserEntry(){
    const seedData = [];
    for (let i = 0; i <= 9; i++) {
        seedData
        .push({
            username: faker.lorem.string(),
            password: faker.lorem.string(),
            email: faker.internet.email()
        })
    }
    return User.insertMany(seedData);
}

describe('user registration API resource', function (){

    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function (){
        return seedUserEntry();
    });

    afterEach(function(){
        return tearDownDb();
    });

    after(function() {
        return closeServer();
    });

    describe('GET all users', function(){

        it('should return every user in the collection', function(){

            let res;
            return chai.request(app)
                .get('/users')
                .then(_res => {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.lengthOf.at.least(1);

                    return User.count();
                })
                .then(count => {
                    res.body.should.have.lengthOf(count);
                })
            })
        })

    describe ('POST user credentials' , function(){
        it('should add a new user' , function(){

            const newUser = {
                username: faker.lorem.string(),
                password: faker.lorem.string(),
                email: faker.internet.email()
            }
            return chai.request(app)
            .post('/users')
            .send(newUser)
            .then(function(res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('username', 'password', 'email');
                res.body.id.should.not.be.null;

                return User.findById(res.body.id);
            })
            .then(function(user){
                user.name.should.equal(newUser.name);
                user.password.should.equal(newUser.password);
                user.email.should.equal(newUser.email)
            })
        })
    })

    describe ('PUT user credentials', function(){
        it('should update an existing user credentials', function(){

            const updateUser = {
                username: faker.lorem.string(),
                password: faker.lorem.string(),
                email: faker.internet.email()
            }
            return User
            .findOne()
            .then(user => {
                updateUser.id = user.id
                return chai.request(app)
                .put(`/users/${user.id}`)
                .send(updateUser);
            })
            .then(res => {
                res.should.have.status(204);
                return User.findById(updateUser.id);
            })
            .then(user => {
                user.name.should.equal(updateUser.name);
                user.password.should.equal(updateUser.password),
                user.email.should.equal(updateUser.email)
            })
        })
    })

    describe ('DELETE user credentials' , function(){
        it('should delete a user from database', function(){

            let user;

            return User
            .findOne()
            .then(_user => {
                user = _user;
                return chai.request(app)
                .delete(`/users/${user.id}`);
            })
            .then(res => {
                res.should.have.status(204);
                return User.findById(user.id);
            })
            .then(_user => {
                should.not.exist(_user);
            })
        })
    })
})