/**
* Algoritmo para calculo do modulo 11
*/
module.exports = (numero) => {
    numero = numero.replace(/[^0-9]/g, '');

    let digito = 0;
    let soma = 0;
    let peso = 2;
    let totalDigitos = numero.length - 1;

    for (let i = totalDigitos; i >= 0; i--) {
        soma = soma + ( numero.substr(i, 1) * peso);

        peso = (peso < 9) ? peso + 1 : 2;
    }

    digito = 11 - (soma % 11);

    if (digito > 9)
        digito = 0;

    return (digito == 0) ? 1 : digito;
}