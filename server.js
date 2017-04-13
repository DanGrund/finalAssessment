const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('src'));

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  fs.readFile(`${_dirname}/index.html`, (err, file) => {
    response.send(file)
  })
})

app.get('/api/v1/garage', (request, response) => {
  database('garage').select()
    .then((contents) => {
      response.status(200).json(contents);
    })
    .catch(function(error) {
      response.status(400).json(error)
      console.log(error)
    });
})

app.post('/api/v1/garage', (request, response) => {
  const { name, reason, cleanliness } = request.body
  const newItem = { name, reason, cleanliness }

  if(!name || !reason || !cleanliness){
    response.status(422).json("[]")
  } else {
    database('garage').insert(newItem)
    .then(()=> {
      database('garage').select()
        .then((items) => {
          response.status(200).json(items);
        })
        .catch((error) => {
          response.status(422)
          console.error(error)
        });
    })
  }
})

app.get('/api/v1/garage/:id', (request, response) => {
  const { id } = request.params;
  database('garage').where('id', id).select()
    .then((urlData) => {
      response.status(201).json(urlData)
    })
    .catch((error)=>{
      response.status(422).send({
        error: 'ID did not match any existing id'
      })
    })
})

if(!module.parent) {
  app.listen(app.get('port'), () => {
    console.log(`Server is running on ${app.get('port')}`);
  })
}

module.exports = app;
