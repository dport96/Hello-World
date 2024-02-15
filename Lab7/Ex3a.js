require("./products_data.js");
const num_products = 5;

for(let product_number = 1; product_number <= num_products; product_number++) {
    if( (product_number > .25*num_products) && (product_number < .75*num_products) ) {
        console.log(`${eval('name' + product_number)} is sold out!`);
        continue;
    }
    console.log(`${product_number}. ${ eval('name' + product_number)}`);
}
console.log(`That's all we have!`);