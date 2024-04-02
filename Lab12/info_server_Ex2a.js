const express = require('express');
const app = express();
app.get('/test', function (request, response, next) {
    response.send('got a GET to test');
});

app.all('*', function (request, response, next) {
    response.send(request.method + ' to path ' + request.path + ' with qstr ' + JSON.stringify(request.query));
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback