//Crear un input y un button, cuando le demos al
//boton se aniadira el texto que hemos puesto en 
//el input en un div vacio.

function aniadirTexto(){
    var texto=document.getElementById("texto")
    var mostrar=document.getElementById("mostrar_texto")

    mostrar.innerHTML+=texto.value;
}

//innerHTML es lo que tiene dentro