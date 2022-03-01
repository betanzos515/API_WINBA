const express = require("express");
const cors = require("cors");
const app = express();
const db = require( "./app/models" );
const dotenv = require('dotenv');
const Role = require('./app/models/role.model');

async function getRoles(){
  return Role;
}

console.log(getRoles());
/* dotenv.config();
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database');
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "admin"
  });
 
  Role.create({
    id: 3,
    name: "developer"
  });

  Role.create({
    id: 4,
    name: "tester"
  });
}
 */

db.sequelize
  .sync()
  .then(( result ) => {
    console.log("Sequalize Database Sync");
  })
  .catch((err) => {
    console.log(err);
  });

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to GLWINBA API." });
});
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});