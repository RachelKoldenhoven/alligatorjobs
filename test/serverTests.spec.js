var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server/app');
var knex = require('../db/knex');

var should = chai.should();

chai.use(chaiHttp);

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
            res.body[0].should.have.property('first_name');
            res.body[0].first_name.should.be.a('string');
            res.body[0].first_name.should.equal('Dan');

            res.body[0].should.have.property('last_name');
            res.body[0].last_name.should.be.a('string');
            res.body[0].last_name.should.equal('Klein');

            res.body[0].should.have.property('phone');
            res.body[0].phone.should.be.a('string');
            res.body[0].phone.should.equal('888-888-8888');

            res.body[0].should.have.property('email');
            res.body[0].email.should.be.a('string');
            res.body[0].email.should.equal('dan@dan.com');

            res.body[0].should.have.property('password');
            res.body[0].password.should.be.a('string');
            res.body[0].password.should.equal('Bacon');

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