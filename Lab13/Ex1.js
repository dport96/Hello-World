// const users_reg_data = require(__dirname + '/user_data.json');
const fs = require('fs');

const user_data_file = __dirname + '/user_data.json';

const data = fs.readFileSync(user_data_file, 'utf-8');
const users_reg_data = JSON.parse(data);


let username = "kazman";
console.log(users_reg_data[username]["password"]);