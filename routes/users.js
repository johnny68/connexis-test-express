var express = require('express');
const database = require('../commonUtils/database');
var router = express.Router();
const promise = require('promise');

/* GET all users listing. */
router.get('/', function (request, response, next) {
  const connection = database.connect();
  const statement = `SELECT  user_id, user_name, user_email, user_address, user_mobile_number, user_state, user_city FROM users_list`;
  connection.query(statement, (error, results) => {
    connection.end();
    console.log(results);
    console.log(error);
    var result = {};
    if (results.length === 0) {
      result.status = 'error';
      result.message = 'Some error has occured contact Siddhant';
    } else {
      result.status = 'success';
      result.message = 'ok';
      result.data = results;
    }
    response.send(result);
  });
});

/* Add new user to list */
router.post('/create', (request, response) => {
  const user_name = request.body.user_name;
  const user_email = request.body.user_email;
  const address = request.body.address;
  const user_mobile_number = request.body.user_mobile_number;
  const user_state = request.body.user_state;
  const user_city = request.body.user_city;

    const connection = database.connect();
    const statementcreate = `INSERT INTO users_list( user_name, user_email, user_address, user_mobile_number, user_state, user_city)
                        VALUES ('${user_name}', '${user_email}', '${address}', ${user_mobile_number}, '${user_state}', '${user_city}')`;

    connection.query(statementcreate, (error, results) => {
      connection.end();
      console.log(results);
      console.log(error);
      var result = {};
      if (results.length === 0) {
        result.status = 'error';
        result.message = 'Some error has occured contact Siddhant';
      } else {
        result.status = 'success';
        result.message = 'ok';
        result.data = results;
      }
      response.send(result);

    });
});
/* Edit Existing user in user list*/

router.post('/edit', (request, response) => {

  const name = request.body.name;
  const email = request.body.email;
  const address = request.body.address;
  const mobilenumber = request.body.mobilenumber;
  const state = request.body.state;
  const city = request.body.city;

  
  console.log(request.body.user_id);
  console.log(request.body.name);
  console.log(request.body.email);
  console.log(request.body.user_id);


  const connection = database.connect();
  const statementName = `call editName(?, ?)`;
  const statementEmail = `call editEmail(?, ?)`;
  const statementAddress = `call editAddress(?, ?)`;
  const statementNumber = `call editMobile(?, ?)`;
  const statementState = `call editState(?, ?, ?)`;

  var result = [];
  if (name !== "") {
    console.log(typeof(name));
    console.log(typeof(request.body.user_id));
    connection.query(statementName, [request.body.user_id, name], (error, results) => {
      console.log(error);
      console.log(results);
    
    });
    result.push({'name': 'updated'});
  }
  if (email !== "") {
    console.log(typeof(email));
    connection.query(statementEmail, [request.body.user_id, email], (error, results) => {
      console.log(error);
      console.log(results);
      
    });
    result.push({'email': 'updated'});
  }
  if (address !== "") {
    console.log(typeof(address));
    connection.query(statementAddress, [request.body.user_id, address], (error, results) => {
      console.log(error);
      console.log(results);
      
    });
    result.push({'address': 'updated'});
  }
  if (mobilenumber !== "") {
    connection.query(statementNumber, [request.body.user_id, mobilenumber], (error, results) => {
      console.log(error);
      console.log(results);
      
    });
    result.push({'mobile': 'updated'});
  }
  if (state !== "") {
    connection.query(statementState, [request.body.user_id, state, city], (error, results) => {
      console.log(error);
      console.log(results);
      connection.end(); 
    });
    result.push({'state': 'updated'});
    result.push({'city': 'updated'});
  }

  response.send(result);
});

module.exports = router;