var bodyParser = require('body-parser');
var cors = require('cors');
var express = require('express');
var path = require('path');

const PORT = process.env.PORT || 8000;

var app = express();
//allow cross origin
app.use(cors());

app.get('/', (req, res) => {
    res.json({"hi":"we park"});
  });

app.listen(PORT, () => {
    console.log('server is running on port: ' + PORT);
});