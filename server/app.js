const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const path = require('path');
const models = require('./models');

const PORT = process.env.PORT || 8000;

var app = express();
//allow cross origin
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true}));

app.get('/', (req, res) => {
    res.json({"hi":"wep park"});
  });

models.sequelize.sync({force: false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
});
