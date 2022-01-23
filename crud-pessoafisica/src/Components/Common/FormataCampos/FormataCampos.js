export function formataData(data) {

   let dataFormatada = new Date(data).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
   return dataFormatada;
}

export function formataMoeda(valor) {
    let moedaFormatada = valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    return moedaFormatada;
}