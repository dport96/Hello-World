let attributes  =  "Dan;50;50.5;-49.5" ;
let pieces = attributes.split(';');
/*
for(let part of pieces) {
    console.log(`${part} is a ${typeof part}`);
}
*/
// join parts with ,
console.log(pieces.join());
