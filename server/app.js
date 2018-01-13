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

app.use('/', express.static('../client/build'));
const controllers = require('./controllers');
app.use(controllers);

models.sequelize.sync({force: false})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is up and running on port: ${PORT}`)
    });
});

module.exports = app;

//TO BE REMOVED: create fake database for testing
/*models.Users.create({
  FirstName: "Wen",
  LastName: "Huang",
  UserType: "Owner",
  PhoneNumber: "6461112222",
  Address: "1720 79th Street, Brooklyn, NY, 11214",
  Email: "abc@abc.com"
})
.catch((err) => {
  console.log(err);
})
.then((garage) => {
  console.log(garage);
})

models.Garages.create({
  Address: "1720 79th Street, Brooklyn, NY, 11214",
  Renting_Price: 5.25,
  Size: "car",
  UserId: 1
})
.catch((err)=>{
  console.log(err);
})
.then((garage) => {
  console.log(garage);
});*/
