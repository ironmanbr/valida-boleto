/**
* Converte fator para data
* data base em 07/10/1997
*/
module.exports = (dias) => {
    let dataBase = new Date();
    let dataBoleto = new Date();

    dataBase.setFullYear(1997,9,7);
    dataBoleto.setTime(dataBase.getTime() + (1000 * 60 * 60 * 24 * dias));

    return(dataBoleto);
}