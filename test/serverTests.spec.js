var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

describe('API routes', function() {
//Do beforeeach because it won't get to after each if there's an error
    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done()
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

//GET ALL PROFILES
describe('Get all top level User Profiles', function() {

    it('should get top level User Profiles', function(done) {
        chai.request(server)
        .get('/api/shows')
        .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.length.should.equal(4);
            res.body[0].should.have.property('f_name');
            res.body[0].f_name.should.be.a('string');
            res.body[0].f_name.should.equal('Dan');

            res.body[0].should.have.property('l_name');
            res.body[0].l_name.should.be.a('string');
            res.body[0].l_name.should.equal('Klein');

            res.body[0].should.have.property('phone');
            res.body[0].phone.should.be.a('string');
            res.body[0].phone.should.equal('8888888888');

            res.body[0].should.have.property('email');
            res.body[0].email.should.be.a('string');
            res.body[0].email.should.equal('danhirschklein@gmail.com');

            res.body[0].should.have.property('password');
            res.body[0].password.should.be.a('string');
            res.body[0].password.should.equal('Bacon');

            res.body[0].should.have.property('google_id');
            res.body[0].google_id.should.be.a('string');

            res.body[0].should.have.property('english');
            res.body[0].english.should.be.a('integer');
            res.body[0].english.should.equal('1');

            res.body[0].should.have.property('admin');
            //might be special case for this, check docs
            res.body[0].admin.should.be.a('boolean');
            res.body[0].admin.should.equal(true);

            res.body[0].should.have.property('create_date');
            //might be special case for this, check docs
            res.body[0].create_date.should.be.a('date');
            res.body[0].create_date.should.equal('NO CLUE');

            res.body[0].should.have.property('update_date');
            //might be special case for this, check docs
            res.body[0].update_date.should.be.a('date');
            res.body[0].update_date.should.equal('NO CLUE');
            res.body[0].should.have.property('case_worker_id');
            res.body[0].case_worker_id.should.be.a('integer');
            rse.body[0].case_worker_id.should.equal('null');



            done();
        });
    });

})

   //Makes clean slate everytime you run test
    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        })
    })

    beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done()
                });
            });
        });
    });

// GET TESTING

// 1) get '/'
// 2) get '/register'
// 3) get 'sign-up'

// 4) get '/login'
// 5) get '/cultures'
// 6) get '/cultures/:id'

// 7) get /user/:id
// 8) get /user/:id/create

// 9) get user/:id/edit

describe('Get a landing page', function() {
    it('should render a landing page', function(done) {
        chai.request(server)
        .get('/')
        .end(function(err, res) {

    //Get a single show
describe('Get a single Profile', function() {
    it('should add a single show', function(done) {
        chai.request(server)
        .get('/api/shows/1')
        .end(function(err, res) {

            res.should.have.status(200);
            res.should.be.json;
            res.body[0].should.be.a('object');
            res.body.length.should.equal(1);
            res.body[0].should.have.property('name');
            res.body[0].name.should.equal('Suits');
            res.body[0].should.have.property('channel');
            res.body[0].channel.should.equal('USA Network');
            res.body[0].should.have.property('genre');
            res.body[0].genre.should.equal('Drama');
            res.body[0].should.have.property('rating');
            res.body[0].rating.should.equal(3);
            res.body[0].should.have.property('explicit');
            res.body[0].explicit.should.equal(false);
            done();
        });
    });

});