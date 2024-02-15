require("./products_data.js");
const num_products = 5;
let product_number = 1;
while(product_number < num_products/2) {
    console.log(`${product_number}. ${ eval('name' + product_number)}`);
    product_number++;
}
console.log(`That's all we have!`);