/**
* Algoritmo para calculo do modulo 10
*/
module.exports = (numero) => {
    numero = numero.replace(/[^0-9]/g, '');

    let digito = 0;
    let soma = 0;
    let peso = 2;
    let totalDigitos = numero.length - 1;

    for (let i = totalDigitos; i >= 0; i--) {
        mult = ( numero.substr(i, 1) * peso );
        if (mult >= 10) 
            mult = 1 + (mult - 10);

        soma = soma + mult;
        peso = (peso == 2) ? 1 : 2;
    }

    digito = 10 - (soma % 10);

    return (digito != 10) ? digito : 0;
}
