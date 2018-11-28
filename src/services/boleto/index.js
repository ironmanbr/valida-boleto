/**
* Verifica tipo de código digitável e valida de acordo retornando um json
*/
const consumo = require('./consumo');
const produto = require('./produto');

module.exports = (boletoRaw) => {
    boleto = boletoRaw.replace(/[^0-9]/g, '');

    let result = {};

    try {
        result = (boleto.length == 48) ? consumo(boleto) : produto(boleto);
    } catch (e) {
        // vixi... 
        result = {
        	'isValid': false,
            'message': 'Código deste boleto é inválido.',
            'entrada': boletoRaw
        };
    }

    return result;
}