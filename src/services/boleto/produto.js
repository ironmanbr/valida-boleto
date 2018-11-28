/**
* Modulo de validação e tratamento de boletos de produtos
*/
const modulo11 = require('./../../lib/modulo11');
const fatorVencimento = require('./../../lib/fatorVencimento');

const fillNullDigits = (boleto) => {
    if (boleto.length < 47) {
        boleto = boleto + '0'.repeat(47 - boleto.length);
    }

    return boleto;
}

const splitFields = (boleto) => {
    return [
        boleto.substr(0, 10),
        boleto.substr(10, 11),
        boleto.substr(21, 11),
        boleto.substr(32, 1),
        boleto.substr(33, 14)
    ]
}

const convetToBarNumber = (boleto) => {
    let bar = '';

    bar = boleto.substr(0,4)
        + boleto.substr(32,15)
        + boleto.substr(4,5)
        + boleto.substr(10,10)
        + boleto.substr(21,10);

    return bar;
}

const isValidDocument = (barNumber) => {
    const dvBoleto = barNumber.substr(4, 1);
    const dvCalc = modulo11(barNumber.substr(0, 4) + barNumber.substr(5, 99));

    return (dvBoleto == dvCalc);
}

const getTotalDocument = (boleto) => parseFloat(boleto.substr(37, 10).replace(/(\d)(\d{2})$/g, '$1.$2'));

const getDateDocument = (boleto) => {
    let fator = boleto.substr(33, 4);

    if (fator == 0)
        return null;

    return fatorVencimento(fator);
}

module.exports = (boleto) => {
    boleto = fillNullDigits(boleto);
    barNumber = convetToBarNumber(boleto);

    if (! isValidDocument(barNumber)) {
        throw new Error('Boleto não é valido');
    }

    return {
        'isValid': true,
        'total': getTotalDocument(boleto),
        'date': getDateDocument(boleto),
        'barNumber': barNumber
    };
}