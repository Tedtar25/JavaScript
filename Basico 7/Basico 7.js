//Crear un boton que al pulsarlo genere una lista de 10
//numeros aleatorios en un select vacio. Hacer que se reinicie la lista.

function getRandomInt(min, max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generarNumeros(){
    let elementos=document.getElementById("elementos");
    
    let opcionesGeneradas="";
    for(let i=0;i<10;i++){
        opcionesGeneradas+="<option>"+getRandomInt(1,10)+"</option>";
    }

    elementos.innerHTML=opcionesGeneradas;
}