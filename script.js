function calcularRediluicao() {
    // --- 1. CAPTURAR VALORES DOS INPUTS ---
    const valorMatricula = parseFloat(document.getElementById('valorMatricula').value);
    const valorParcelaLeve = parseFloat(document.getElementById('valorParcelaLeve').value);
    const qtdParcelas = parseInt(document.getElementById('qtdParcelas').value);
    const valorNovoBoleto = parseFloat(document.getElementById('valorNovoBoleto').value);
    const resultadoDiv = document.getElementById('resultado');

    // Validação para garantir que todos os campos foram preenchidos
    if (isNaN(valorMatricula) || isNaN(valorParcelaLeve) || isNaN(qtdParcelas) || isNaN(valorNovoBoleto)) {
        resultadoDiv.innerHTML = `<p class="error">Por favor, preencha todos os campos com valores numéricos.</p>`;
        return;
    }

    // --- 2. CÁLCULO DA DILUIÇÃO INICIAL ---
    // (B2 - D2)
    const diferencaInicial = valorMatricula - valorParcelaLeve;
    // (F2 * B5)
    const totalDiluidoInicial = diferencaInicial * qtdParcelas;


    // --- 3. CÁLCULO DA REDILUIÇÃO ---
    // (B10 - D2)
    const diferencaRediluicao = valorNovoBoleto - valorParcelaLeve;
    // (D10 * B5)
    const totalRediluido = diferencaRediluicao * qtdParcelas;


    // --- 4. RESULTADO E AÇÃO ---
    // (D5 - F10)
    const credito = totalDiluidoInicial - totalRediluido;

    // Limpa o conteúdo anterior
    resultadoDiv.innerHTML = ''; 

    // string com o resumo dos cálculos
    let resumoHTML = `
        <h3>Resumo do Cálculo:</h3>
        <p><strong>Total diluído originalmente:</strong> R$ ${totalDiluidoInicial.toFixed(2)}</p>
        <p><strong>Novo total a ser diluído (Rediluição):</strong> R$ ${totalRediluido.toFixed(2)}</p>
        <hr>
    `;

    // Verifica se a rediluição é menor e se há ajuste a ser lançado 
    if (credito > 0) {
        resumoHTML += `
            <div class="final-result success">
                <h4>Ação Necessária:</h4>
                <p>Realizar ajuste no valor de <strong>R$ ${credito.toFixed(2)}</strong></p>
            </div>
        `;
    } else if (credito === 0) {
        resumoHTML += `
            <div class="final-result info">
                <h4>Ação Necessária:</h4>
                <p>Resultado: <strong>R$ ${credito.toFixed(2)}</strong></p>
                <p>Não há ajuste a ser lançado. O novo valor diluído é maior ou igual ao anterior.</p>
            </div>
        `;
    } else {
        resumoHTML += `
            <div class="final-result info">
                <h4>Ação Necessária:</h4>
                <p>Resultado: <strong>R$ ${Math.abs(credito).toFixed(2)}</strong></p>
                <p>O valor a ser diluído aumentou. Verifique se há uma quarta diluição para cobrir essa diferença.</p>
                <p>A cobrança adicional precisa corresponder ao somatório do novo valor total, caso esteja a maior realize os devidos ajustes.</p>
                <p>No entanto, se for gerado a menor ou não existir não será necessária nenhuma ação.</p>
            </div>
        `;
    }

    // Exibe o resumo completo na tela
    resultadoDiv.innerHTML = resumoHTML;
}

