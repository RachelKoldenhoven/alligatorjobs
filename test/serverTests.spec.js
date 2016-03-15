var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);


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

describe('Req 1: Landing Page Functionality', function() {
    it('1.1 Text of landing page', function(done) {
        chai.request(server)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            res.text.should.include('Alligator')
        });
    });
    it('1.2 Link to login page', function(done) {
        chai.request(server)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            res.text.should.include('/login');
        });
    });
     it('1.3 Link to registration page', function(done) {
        chai.request(server)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            res.text.should.include('/register');
        });
    });
     it('1.4 Should display Logo', function(done) {
        chai.request(server)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            res.text.should.include('alligatorjobslogo.png');
        });
    });
});

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


describe('Req 2: Registration Page Functionality', function() {
    it('2.1 Text of Registration page', function(done) {
        chai.request(server)
        .get('/register')
        .expect(200)
        .end(function(err, res) {
            res.text.should.include('Register');
        });
    });

     it('2.2 Able to register with user/email “test@gtest.com”/"test"', function(done){
    request(app)
      .post('/register')
      .expect(200)
      .send({ email: 'test@test.com', password: 'test'})
      .end(function (err, res) {
            res.text.should.include('Form');
            done();
        });
    });

    it('2.3 Not be able to register with already existing email/password “danhirschklein@gmail.com”/”TEST”', function(done){
    request(app)
      .post('/login')
      .expect(200)
      .send({ email: 'danhirschklein@gmail.com', password: 'test'})
      .end(function (err, res) {
        res.text.should.not.include('Form');
        it('Not be able to register with email/password not “TEST”/”TEST”', function(done){
          res.text.should.include('Register');
          done();
        });
          done();
        });
    });

    it('2.3 Should display Logo', function(done) {
        chai.request(server)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            res.text.should.include('alligatorjobslogo.png');
        });
    });
});

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

describe('Req 3: Login Page Functionality', function() {
    it('3.1 Text on login page', function(done){
    request(app)
      .get('/login')
      .expect(200)
      .end(function (err, res) {
        res.text.should.include('Login');
        done();
      });
  });
    it('3.2 Able to login with user/email “danhirschklein@gmail.com”/"test"', function(done){
    request(app)
      .post('/login')
      .expect(200)
      .send({ email: 'danhirschklein@gmail.com', password: 'test'})
      .end(function (err, res) {
        res.text.should.include('Form');
        done();
      });
  });
    it('3.4 Not be able to login with email/password not “danhirschklein@gmail.com”/”TEST”', function(done){
    request(app)
      .post('/login')
      .expect(200)
      .send({ email: 'TEST1', password: 'TEST1'})
      .end(function (err, res) {
        res.text.should.not.include('Form');
          console.log('here');
        it('Not be able to login with email/password not “danhirschklein@gmail.com”/”TEST”', function(done){
          res.text.should.include('Login');
          done();
        });
        done();
      });
    });
});

 beforeEach(function(done) {
        knex.migrate.rollback().then(function() {
            knex.migrate.latest()
            .then(function() {
                return knex.seed.run().then(function() {
                    done();
                });
            });
        });
    });

    afterEach(function(done) {
        knex.migrate.rollback().then(function() {
            done();
        });
    });

describe('Req 4: Culture Page Functionality', function() {
    it('4.1 Should have links on to individual culture pages', function(done){
    request(app)
      .get('/login')
      .expect(200)
      .end(function (err, res) {
        res.text.should.include('<a href="/cultures/:id"');
        done();
      });
    });
    it('4.2 Should display Logo', function(done) {
        chai.request(server)
        .get('/')
        .expect(200)
        .end(function(err, res) {
            res.text.should.include('alligatorjobslogo.png');
        });
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

});

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
                    done();
                });
            });
        });
    });

// GET TESTING

// 1) get '/' --Test
// 2) get '/register' --Test
// 3) get 'sign-up' --test

// 4) get '/login'

// 5) get '/cultures' --Test
// 6) get '/cultures/:id'

// 7) get /user/:id
// 8) get /user/:id/create

// 9) get user/:id/edit
// 10)get /facebook
// 11) get /logout
//12) get /auth/facebook/callback
//13) get /admin

describe('Get a landing page', function() {
    it('route / render landing page', function(done) {
        chai.request(server)
        .get('/')
        .end(function(err, res) {
        });
    });
});

describe('Get a landing page', function() {
    it('/register should render login page', function(done) {
        chai.request(server)
        .get('/')
        .end(function(err, res) {
        });
    });
});

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