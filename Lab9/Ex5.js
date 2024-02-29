function junk1() {
    for(i1=1; i1<=2; i1++){console.log(i1);}
    return `i1 is ${i1}`;
}


function junk2() {
    for(var i2=1; i2<=2; i2++){console.log(i2);}
    return `i2 is ${i2}`;
}

function junk3() {
    for(let i3=1; i3<=2; i3++){console.log(i3);}
    return `i3 is ${i3}`;
}

console.log(junk1());
console.log(i1);