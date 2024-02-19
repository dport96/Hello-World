const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const app = express();
app.all('*', function (request, response, next) {
   console.log(request.method + ' to path ' + request.path);
   next();
});
let root = (typeof argv["rootdir"] != "undefined")?argv["rootdir"] : ".";
app.use(express.static( root ));
let server = app.listen(8080, () => console.log(`listening on ${server.address().address} port ${server.address().port} rootdir ${root}`));