//Crear dos input de numeros y un boton, al pulsar el boton
// mostrar en un alert quien es el mayor de los dos.

function mayorNumero(){
    var num1=parseInt(document.getElementById("num1").value);
    var num2=parseInt(document.getElementById("num2").value);
    //.value al final para recoger los valores directamente
    //parseInt para convertir una cadena en numeros; siempre y cuando sea valido
    
    //Este if es para comprobar que existan los numeros y no este vacio el campo
    if(num1 && num2){
        if(num1>=num2){
            if(num1==num2){
                alert("Los  numeros son iguales")
            }else{
                alert("El numero 1 es mayor")
            }
        }else{
            alert("El numero 2 es mayor")
        }
    }else{
        alert("Uno de los numeros no se relleno")
    }
    
}