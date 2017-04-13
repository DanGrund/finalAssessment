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

  })
})
