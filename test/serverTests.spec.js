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