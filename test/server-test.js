process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../server.js');
const configuration = require('../knexfile')['test'];
const database = require('knex')(configuration);


chai.use(chaiHttp);

describe('Server', () => {
  beforeEach(function(done) {
    database.migrate.rollback()
    .then(function() {
      database.migrate.latest()
      .then(function() {
        return database.seed.run()
        .then(function() {
          done();
        });
      });
    });
  });

  afterEach(function(done) {
    database.migrate.rollback()
    .then(function() {
      done();
    });
  });

  describe('/api/v1/garage', ()=>{

      it('GET returns all items in garage', (done)=>{
        chai.request(app)
        .get('/api/v1/garage')
        .end((err, res)=> {
          if(err) { done(err); }
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(2);
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('reason');
          expect(res.body[0]).to.have.property('cleanliness');
          done()
        })
      })

      it('POST creates a new item', (done)=>{

      chai.request(app)
      .post('/api/v1/garage')
      .send({
        name: 'Skis',
        reason : 'I like skiing',
        cleanliness : 'sparkling'
      })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(3);
        expect(res.body[2]).to.have.property('id');
        expect(res.body[2].id).to.equal(3)
        expect(res.body[2]).to.have.property('name');
        expect(res.body[2].name).to.equal('Skis');
        expect(res.body[2]).to.have.property('reason');
        expect(res.body[2].reason).to.equal('I like skiing');
        expect(res.body[2]).to.have.property('cleanliness');
        expect(res.body[2].cleanliness).to.equal('sparkling');
        done()
      })
    })

    it('POST returns an error if not all attributes are present', (done)=>{
      chai.request(app)
      .post('/api/v1/garage')
      .send({
        name: 'Skis',
        reason : null,
        cleanliness : 'sparkling'
      })
      .end((err, res)=>{
        expect(res).to.throw;
        expect(res).to.have.status(422)
        done()
      })
    })

    describe('/api/v1/garage/:id', ()=>{
      it('GET returns a single item and it\'s attributes', (done)=>{
        chai.request(app)
        .get('/api/v1/garage/1')
        .end((err, res)=> {
          if(err) { done(err); }
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(1);
          expect(res.body[0]).to.be.a('object');
          expect(res.body[0]).to.have.property('name');
          expect(res.body[0]).to.have.property('id');
          expect(res.body[0]).to.have.property('reason');
          expect(res.body[0]).to.have.property('cleanliness');
          done()
        })
      })

      it('GET returns an error if item does not exist', (done)=>{
        chai.request(app)
        .get('/api/v1/garage/3')
        .end((err, res)=> {
          expect(res).to.throw;
          expect(res).to.have.status(404)
          done()
        })
      })

      it('PATCH returns an updated item', (done) => {

      chai.request(app)
      .patch('/api/v1/garage/1')
      .send({
        name: 'basketball',
        reason: 'I like basketball',
        cleanliness : 'dusty'
      })
      .end((err, res)=> {
        if(err) { done(err); }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('array');
        expect(res.body).to.have.length(2);
        expect(res.body[1]).to.have.property('name');
        expect(res.body[1].name).to.equal('basketball');
        expect(res.body[1]).to.have.property('reason');
        expect(res.body[1].reason).to.equal('I like basketball');
        expect(res.body[1]).to.have.property('cleanliness');
        expect(res.body[1].cleanliness).to.equal('dusty');
        done()
      })
    })

    it('PATCH returns an error if item does not exist', (done)=>{
      chai.request(app)
      .patch('/api/v1/garage/41')
      .send({
        name: 'basketball',
        reason: 'I like basketball',
        cleanliness : 'dusty'
      })
      .end((err, res)=>{
        expect(res).to.throw;
        expect(res).to.have.status(404)
        done()
      })
    })

    it('DELETE removes an item', (done)=>{
      chai.request(app)
      .delete('/api/v1/garage/1')
      .end((err,res)=>{
        if(err){done(err)}
        expect(res).to.have.status(200)
        expect(res.body).to.have.length(1)
        done()
      })
    })

    it('DELETE returns an error if item does not exist', (done)=>{
      chai.request(app)
      .delete('/api/v1/users/4')
      .end((err, res)=>{
        expect(res).to.throw;
        expect(res).to.have.status(404)
        done()
      })
    })

    })

  })
})
