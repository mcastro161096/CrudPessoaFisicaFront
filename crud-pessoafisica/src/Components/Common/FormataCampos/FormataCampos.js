export function formataData(data) {

   let dataFormatada = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
   return dataFormatada;
}

export function formataMoeda(valor) {
    let moedaFormatada = "R$ " + valor;
    return moedaFormatada;
}

export function formataMoedaAoDigitar(valor) {
    if (valor !== "") {
        valor = valor + '';
        valor = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valor + '';
        valor = valor.replace(/([0-9]{2})$/g, ",$1");

        if (valor.length > 6) {
            valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
        }
    }
    return valor;
}