//Con el array anterios, crearle una copia.
//Mostrar en consola.

function getRandomInt(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

let array=[];

for(let i=1;i<=10;i++){
    array.push(getRandomInt(1,10))
}
console.log("Array 1");
console.log(array);

let array2=array.slice();
// .slice corta y pega un array sin modificar el original
array2.push(5);

console.log("Array 2");
console.log(array2);