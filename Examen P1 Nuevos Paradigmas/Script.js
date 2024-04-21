function generarCURP() {
    const abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const estados = ["aguascalientes","baja california","baja california sur","campeche","chiapas","chihuahua","coahuila","colima","ciudad de mexico","distrito federal","durango","guanajuato","guerrero","hidalgo","jalisco","estado de mexico","michoacan","morelos","nayarit","nuevo leon","oaxaca","puebla","queretaro","quintana roo","san luis potosi","sinaloa","sonora","tabasco","tamaulipas","tlaxcala","veracruz","yucatan","zacatecas"];
    const abreviacion = ["AS","BC","BS","CC","CS","CH","CL","CM","CX","DF","DG","GT","GR","HG","JC","MC","MN","MS","NT","NL","OC","PL","QT","QR","SP","SL","SR","TC","TS","TL","VZ","YN","ZS"];
//Si, los estados y la abreviacion se los pedi al Chat porque es mucho trabajo escribir eso y el cuadro del Teams me sale en blanco

//Element by ID para que nos pase lo que pusieron en las casillas
    const nombre = document.getElementById('nombre').value.toUpperCase();
    const primerApellido = document.getElementById('primerApellido').value.toUpperCase();
    const segundoApellido = document.getElementById('segundoApellido').value.toUpperCase();
    const fechaNacimiento = new Date(document.getElementById('fechaNacimiento').value);
    const estado = document.getElementById('estado').value.toLowerCase();
    const genero = document.getElementById('genero').value.toUpperCase();
    const año = fechaNacimiento.getFullYear().toString().slice(-2);
    const mes = (fechaNacimiento.getMonth() + 1).toString().padStart(2, '0');
    const dia = (fechaNacimiento.getDate()+1).toString().padStart(2, '0');

//Un array para generar cada valor en la casilla que le asignemos, es por eso que CURP no esta declarado la longitud
    const CURP = [];
    CURP[0] = primerApellido.charAt(0);
    CURP[1] = primeraVocal(primerApellido);
    CURP[2] = segundoApellido.charAt(0);
    CURP[3] = nombre.charAt(0);
    CURP[4] = año;
    CURP[5] = mes;
    CURP[6] = dia;
    CURP[7] = genero;
    CURP[8] = abreviacion[estados.indexOf(estado)];
    CURP[9] = consonante(primerApellido);
    CURP[10] = consonante(segundoApellido);
    CURP[11] = consonante(nombre);
    CURP[12] = año < 2000 ? Math.floor(Math.random() * (9 - 1 + 1)) + 1 : abc[Math.floor(Math.random() * (26 - 0 + 1)) + 0];
    CURP[13] = Math.floor(Math.random() * (9 - 1 + 1)) + 1;

    const curpGenerada = CURP.join('');
    alert("CURP generada: " + curpGenerada);
}
//Como todo esta con UPPER para hacerlos mayusculas no es necesario poner vocales y conosonantes en minusculas tambien
function primeraVocal(cadena) {
    const vocales = 'AEIOU';
    for (let i = 0; i < cadena.length; i++) {
        if (vocales.includes(cadena[i])) {
            return cadena[i];
        }
    }
    return '0';
}

function consonante(cadena) {
    const consonantes = 'BCDFGHJKLMNPQRSTVWXYZ';
    for (let i = 0; i < cadena.length; i++) {
        if (consonantes.includes(cadena[i])) {
            const index = (consonantes.indexOf(cadena[i]) + 1) % consonantes.length;
            return consonantes[index];
        }
    }
    return 'Z';
}
