/**
* Modulo de validação e tratamento de boletos de consumo
*/
const modulo10 = require('./../../lib/modulo10');
const modulo11 = require('./../../lib/modulo11');

const convetToBarNumber = (boleto) => {
    let bar = '';

    bar = boleto.substr(0,11)
        + boleto.substr(12,11)
        + boleto.substr(24,11)
        + boleto.substr(36,11);

    return bar;
}

const isValidDocument = (barNumber) => {
    const typeId = barNumber.substr(2, 1);
    const dvBoleto = barNumber.substr(3, 1);
    const barWithoutDV = barNumber.substr(0, 3) + barNumber.substr(4, 99)
    let dvCalc;

    if ([6, 7].indexOf(parseInt(typeId)) > -1)
        dvCalc = modulo10(barWithoutDV);
    else
        dvCalc = modulo11(barWithoutDV);

    return (dvBoleto == dvCalc);
}

const getTotalDocument = (barNumber) => parseFloat(barNumber.substr(4, 11).replace(/(\d)(\d{2})$/g, '$1.$2'));

module.exports = (boleto) => {
    barNumber = convetToBarNumber(boleto);

    if (! isValidDocument(barNumber)) {
        throw new Error('Boleto não é valido');
    }

    return {
        'isValid': true,
        'total': getTotalDocument(barNumber),
        'date': null,
        'barNumber': barNumber
    };
}