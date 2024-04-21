function esNumero(num){
    return !isNaN(num);
}

function getRandomInt(min, max){

    if(esNumero(min) && esNumero(max)){
        
        min=parseInt(min);
        max=parseInt(max);

        if(min>max){
            let aux=max;
            max=min;
            min=aux;
        }

        return Math.floor(Math.random()*(max-min))+min;

    }else{
        console.error("Los numeros son incorrectos");
    }

}