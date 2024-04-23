// loads the products array into server memory from the products.json file
const products = require(__dirname + '/products.json');

const express = require('express');
const app = express();
// const users_reg_data = require(__dirname + '/user_data.json');
const fs = require('fs');

const user_data_file = __dirname + '/user_data.json';

// check thatr user data file exists and read in if it does
let users_reg_data = {};
if(fs.existsSync(user_data_file)) { 
  const data = fs.readFileSync(user_data_file, 'utf-8');
  users_reg_data = JSON.parse(data);
 let stats = fs.statSync(user_data_file);
 console.log(`${user_data_file} has ${stats.size} characters`);
} 
console.log(users_reg_data);

const myParser = require("body-parser");
app.use(myParser.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

app.post("/process_login", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.body);
  let errors = {};
  // check if user exists in user_reg_data
  let email_entered = request.body["email"];
  let password_entered = request.body["password"];
  if(email_entered in users_reg_data) {
    console.log(users_reg_data, password_entered);
    // check if password matches
    if(password_entered === users_reg_data[email_entered]) {
      console.log(`${email_entered} is loggin in`);
    } else {
      errors['password'] = `Wrong password!`;
    }
  } else {
    errors['email'] = `${email_entered} not registered`;
  }

  response.json(errors);
});

app.post("/process_registration", function (request, response) {
  // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.body);
  let errors = {};
// validate registration data

// is email already registered?

// password correct format

// password and password repeat match

// validate full name

// if errors, send back to registration
if(Object.keys(errors).length !== 0) {
  response.redirect('./register.html');
} else { 
// data valid, so add new user to users_reg_data
let new_email = request.body.email.toLowerCase();
 users_reg_data[new_email] = {};
 users_reg_data[new_email].username = request.body.username;
 users_reg_data[new_email].password = 
// save data to user_data_file
fs.writeFileSync(user_data_file,JSON.stringify(users_reg_data));
// reduce inventory 
// send to invoice

 response.redirect('./invoice.html');
}


});

// A micro-service to return the products data currently in memory on the server as
// javascript to define the products array
app.get('/products.json', function (req, res, next) {
  res.json(products);
});

// A micro-service to process the product quantities from the form data
// redirect to invoice if quantities are valid, otherwise redirect back to products_display
app.post('/process_purchase_form', function (req, res, next) {
  console.log(req.body);
  // only process if purchase form submitted
  const errors = { }; // assume no errors to start
  let quantities = [];
  if (typeof req.body['quantity_textbox'] != 'undefined') {
     quantities = req.body['quantity_textbox'];
    // validate that all quantities are non-neg ints and if any quantity > 0
    let has_quantities = false;
    for (let i in quantities) {
      if (!isNonNegInt(quantities[i])) {
        errors['quantity' + i] = isNonNegInt(quantities[i], true);
      }
      if(quantities[i] > 0) {
        has_quantities = true;
      }
    }
    // if no quanties > 0 then make a no_quanties error
    if(has_quantities === false) {
      errors['no_quanties'] = 'Hey! You need to select some products';
    }
    console.log(Date.now() + ': Purchase made from ip ' + req.ip + ' data: ' + JSON.stringify(req.body));
  }

  // create a query string with data from the form
  const params = new URLSearchParams();
  params.append('quantities', JSON.stringify(quantities));

  // If there are errors, send user back to fix otherwise send to invoice
  if(Object.keys(errors).length > 0) {
    // Have errors, redirect back to store where errors came from to fix and try again
    params.append('errors', JSON.stringify(errors));
    res.redirect( 'store.html?' + params.toString());
  } else {
    // decrease inventrory here
    res.redirect('./invoice.html?' + params.toString());
  }

});

app.use(express.static(__dirname + '/public'));
app.listen(8080, () => console.log(`listening on port 8080`));


function isNonNegInt(q, returnErrors = false) {
  errors = []; // assume no errors at first
  if(q == '') q = 0; // handle blank inputs as if they are 0
  if (Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
  else {
    if (q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if (parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
  }
  return returnErrors ? errors : (errors.length == 0);
}
