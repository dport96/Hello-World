// get the query string into a easy to use object
const params = (new URL(document.location)).searchParams;

let quantities = [];
// check if the query string has quantities, parse it and convert elements to numbers
if (params.has('quantities')) {
  quantities = JSON.parse(params.get('quantities')).map(Number);
} else {
  console.log('No quantities in query string');
}

let products;
window.onload = function () {
  // use fetch to retrieve product data from the server
  // once the products have been successfully loaded and formatted as a JSON object
  // display the invoice
  fetch('products.json').then(function (response) {
    if (response.ok) {
      response.json().then(function (json) {
        products = json;
        display_invoice();
      });
    } else {
      console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
    }
  });
}

function display_invoice() {
  let extended_price;
  let subtotal = 0;

  // Identify the table element
  const table = document.getElementById('invoice_table');

// loop through quantities array and output invoice table row
  for (let i in quantities) {
    if (quantities[i] == 0) continue; // don't output zero quantity items
    extended_price = quantities[i] * products[i].price;
    subtotal += extended_price; // running subtotal
    // Create a new row element
    let new_row = table.insertRow(1); // Inserts after the first row (index 1)
    // generate what to output in table row
    new_row.innerHTML = `
      <td width="43%">${products[i].name}</td>
      <td align="center" width="11%">${quantities[i]}</td>
      <td width="13%">\$${products[i].price}</td>
      <td width="54%">\$${extended_price.toFixed(2)}</td>
    `;
  }

  // Compute subtotal and write into table
  document.getElementById('subtotal_span').innerText = subtotal.toFixed(2);

// Compute tax and write into table
  let tax_rate = 0.0575;
  document.getElementById('tax_rate_span').innerText = (100 * tax_rate).toFixed(2);
  let tax = tax_rate * subtotal;
  document.getElementById('tax_span').innerText = tax.toFixed(2);

// Compute shipping and write into table
  let shipping;
  if (subtotal <= 50) {
    shipping = 2;
  } else if (subtotal <= 100) {
    shipping = 5;
  } else {
    shipping = 0.05 * subtotal; // 5% of subtotal
  }
  document.getElementById('shipping_span').innerText = shipping.toFixed(2);

// Compute grand total and write into table
  let total = subtotal + tax + shipping;
  document.getElementById('total_span').innerText = total.toFixed(2);
}