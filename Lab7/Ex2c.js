require("./products_data.js");
const num_products = 5;
let product_number = 0;
while(++product_number <= num_products) {
    if(product_number > num_products/2) {
        console.log('Don’t ask for anything else!');
        process.exit();
    }
    if( (product_number > .25*num_products) && (product_number < .75*num_products) ) {
        console.log(`${eval('name' + product_number)} is sold out!`);
        continue;
    }
    console.log(`${product_number}. ${ eval('name' + product_number)}`);
}
console.log(`That's all we have!`);