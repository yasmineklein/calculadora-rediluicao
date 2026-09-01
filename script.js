function parseBRFloat(valor) {
    if (!valor) return 0;
    
    let valorSemPonto = valor.replace(/\./g, '');
    
    let valorFinal = valorSemPonto.replace(',', '.');
    
    return parseFloat(valorFinal);
}


function formatBRMoney(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularRediluicao() {
    
    const valorMatricula = parseBRFloat(document.getElementById('valorMatricula').value);
    const valorParcelaLeve = parseBRFloat(document.getElementById('valorParcelaLeve').value);
    const qtdParcelas = parseInt(document.getElementById('qtdParcelas').value);
    const valorParcelaLeve1 = parseBRFloat(document.getElementById('valorParcelaLeve1').value);
    const valorParcelaLeve2 = parseBRFloat(document.getElementById('valorParcelaLeve2').value);
    const valorParcelaLeve3 = parseBRFloat(document.getElementById('valorParcelaLeve3').value);
    const valorNovoBoleto = parseBRFloat(document.getElementById('valorNovoBoleto').value);

    if (isNaN(valorMatricula) || isNaN(valorParcelaLeve) || isNaN(qtdParcelas) || isNaN(valorNovoBoleto)) {
        alert("Por favor, preencha os campos obrigatórios corretamente.");
        return;
    }

    const diferencaInicial = valorMatricula - valorParcelaLeve;
    const totalDiluidoInicial = diferencaInicial * qtdParcelas;
    const totalfinInicial = valorParcelaLeve1 + valorParcelaLeve2 + valorParcelaLeve3;
    const diferencaRediluicao = valorNovoBoleto - valorParcelaLeve;
    const totalRediluido = diferencaRediluicao * qtdParcelas;
    const diferencafinrediluicao = totalfinInicial - totalRediluido;
    const credito = totalfinInicial - totalRediluido;

    document.getElementById('totalDiluidoInicial').innerText = qtdParcelas;
    document.getElementById('resFaturado').innerText = formatBRMoney(totalDiluidoInicial);
    document.getElementById('totalfinInicial').innerText = formatBRMoney(totalfinInicial);
    document.getElementById('totalRediluido').innerText = formatBRMoney(totalRediluido);
    document.getElementById('diferencafinrediluicao').innerText = formatBRMoney(diferencafinrediluicao);

    const caixaAcao = document.getElementById('caixaAcao');
    const textoAcao = document.getElementById('textoAcao');
    const detalheCredito = document.getElementById('detalheCredito');

    detalheCredito.style.display = 'block';

    if (credito > 0) {
        caixaAcao.style.backgroundColor = 'rgba(40, 167, 69, 0.15)'; // Verde
        caixaAcao.style.border = '1px solid #28a745';
        caixaAcao.style.color = '#28a745';
        textoAcao.innerHTML = `Ação Necessária: Realizar ajuste de <br> <strong>${formatBRMoney(credito)}</strong>`;
        
        detalheCredito.style.display = 'none'; 
    } 
    else if (credito === 0) {
        caixaAcao.style.backgroundColor = 'rgba(0, 191, 255, 0.15)'; 
        caixaAcao.style.border = '1px solid #00bfff';
        caixaAcao.style.color = '#00bfff';
        textoAcao.innerHTML = `Resultado: <strong>${formatBRMoney(credito)}</strong>`;
        
        detalheCredito.innerHTML = "Não há ajuste a ser lançado. O novo valor diluído é maior ou igual ao anterior.";
        detalheCredito.style.borderLeft = "4px solid #00bfff";
    } 
    else {
        caixaAcao.style.backgroundColor = 'rgba(0, 191, 255, 0.15)'; 
        caixaAcao.style.border = '1px solid #00bfff';
        caixaAcao.style.color = '#00bfff';
        textoAcao.innerHTML = `Resultado: <strong>${formatBRMoney(Math.abs(credito))}</strong>`;
        
        detalheCredito.innerHTML = "O valor a ser diluído aumentou. Verifique se há uma quarta diluição para cobrir essa diferença.<br><br>A cobrança adicional precisa corresponder ao somatório do novo valor total, caso esteja a maior realize os devidos ajustes. Se for gerado a menor ou não existir não será necessária nenhuma ação.";
        detalheCredito.style.borderLeft = "4px solid #00bfff";
    }

    document.getElementById('resultado').style.display = 'flex';
}

function fecharModalResultado() {
    document.getElementById('resultado').style.display = 'none';
}

function limparTudo() {
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => input.value = '');
}
