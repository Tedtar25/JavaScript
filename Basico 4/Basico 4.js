//Crea dos radiobuttons, cuando uno de ellos se
//seleccione que muestre un mensaje diciendo
//cual se selecciono.

function muestraOpcion(){

    var opciones=document.getElementsByName("eleccion");

    for(let i=0;i<opciones.length;i++){
        console.log(opciones[i]);
        if(opciones[i].checked){
            alert(opciones[i].value);
        }
    }
    //El console log es para ver que tiene cada posicion

}

//En index, un "onclick" lanza un envento cuando se da clic sobre
// el componente.