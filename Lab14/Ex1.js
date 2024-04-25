// const users_reg_data = require(__dirname + '/user_data.json');
const fs = require('fs');
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.get('/set_cookie', function (request, response, next) {
    let my_name = 'Dan';
    response.cookie('snickD', my_name);
    response.send(`Cookie for ${my_name} sent`);
});

app.get('/use_cookie', function (request, response, next) {
    let my_cookie_name = request.cookies;
    response.send(`Cookie for ${my_cookie_name} sent`);
});

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path + ' with qstr ' + JSON.stringify(request.query));
    next();
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback