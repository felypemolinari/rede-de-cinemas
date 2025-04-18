// Objeto que armazena os dados da compra: filme, assentos, combo e pagamento.
const compra = {
    filme: null,
    assentos: [],
    combo: null,
    pagamento: {}
};

// Quando a página é carregada
window.onload = () => {
    const saved = sessionStorage.getItem('compra'); // Tenta recuperar dados salvos na sessão
    if (saved) {
        Object.assign(compra, JSON.parse(saved)); // Se existir, atualiza o objeto compra.
        
        // Atualiza visualmente os assentos já selecionados
        if (window.location.pathname.includes('assentos.html')) {
            compra.assentos.forEach(assento => {
                const elemento = Array.from(document.querySelectorAll('.assento'))
                    .find(b => b.innerText === assento);
                if (elemento && !elemento.classList.contains('ocupado')) {
                    elemento.classList.add('selecionado');
                }
            });
        }
    }

    // Se for a página de revisão, monta as informações de revisão.
    if (window.location.pathname.includes('revisao.html')) {
        montarRevisao();
    }
};
 
// Função que abre um modal com os detalhes do filme selecionado
function abrirDetalhesFilme(filmeId) {
    let detalhes = '';
    if (filmeId === 'vitoria'){
      detalhes = `
        <h2>Vitória</h2>
        <h3>Sinopse</h3>
        <p>Inspirado em uma incrível história real, “Vitória”, interpretada pela indicada por Oscar Fernanda Montenegro, 
            conta a emocionante trajetória de uma aposentada que desmontou uma perigosa quadrilha de traficantes e policiais 
            a partir de filmagens feitas da janela de seu apartamento no Rio de Janeiro. Com a ajuda de um amigo jornalista, 
            ela enfrenta os riscos e perigos de uma situação inimaginável. Um filme sobre a coragem, a força e a resiliência de uma mulher.</p> <br>
        <p>Horários: 14:00, 16:30, 19:00.</p>
        <p>Salas: 1, 2.</p>
      `;
      compra.filme = 'Vitória';
    } else if (filmeId === 'oppenheimer'){
      detalhes = `
        <h2>Oppenheimer</h2>
        <h3>Sinopse</h3>
        <p>Oppenheimer é um filme histórico de drama dirigido por Christopher Nolan e baseado no livro biográfico vencedor 
            do Prêmio Pulitzer, Prometeu Americano: O Triunfo e a Tragédia de J. Robert Oppenheimer, escrito por Kai Bird e 
            Martin J. Sherwin. Ambientado na Segunda Guerra Mundial, o longa acompanha a vida de J. Robert Oppenheimer (Cillian Murphy), 
            físico teórico da Universidade da Califórnia e diretor do Laboratório de Los Alamos durante o Projeto Manhattan - que tinha 
            a missão de projetar e construir as primeiras bombas atômicas. A trama acompanha o físico e um grupo formado por outros cientistas 
            ao longo do processo de desenvolvimento da arma nuclear que foi responsável pelas tragédias nas cidades de Hiroshima e Nagasaki, 
            no Japão, em 1945. Além de Cillian, o elenco também traz nomes como Emily Blunt, Matt Damon, Robert Downey Jr., Florence Pugh, 
            Gary Oldman, Jack Quaid, Gustaf Skarsgård, Rami Malek e Kenneth Branagh.</p> <br>
        <p>Horários: 15:00, 17:30, 20:00.</p>
        <p>Salas: 3, 4.</p>
      `;
      compra.filme = 'Oppenheimer';
    } else if (filmeId === 'interestelar'){
        detalhes = `
            <h2>Interestelar</h2>
            <h3>Sinopse</h3>
            <p>Após ver a Terra consumindo boa parte de suas reservas naturais, um grupo de astronautas recebe a missão de verificar possíveis 
                    planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper (Matthew McConaughey) é chamado para 
                    liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand (Anne Hathaway), Jenkins (Marlon Sanders) 
                    e Doyle (Wes Bentley), ele seguirá em busca de uma nova casa. Com o passar dos anos, sua filha Murph (Mackenzie Foy e Jessica Chastain) 
                    investirá numa própria jornada para também tentar salvar a população do planeta.</p> <br>
            <p>Horários: 13:00, 16:00, 19:00.</p>
            <p>Salas: 5, 6.</p>
        `;
        compra.filme = 'Interestelar';
    } else if (filmeId === 'homem-aranha'){
        detalhes = `
            <h2>Homem-Aranha: Através do Aranhaverso</h2>
            <h3>Sinopse</h3>
            <p>Homem-Aranha: Através do Aranhaverso, é a continuação do vencedor do Oscar Homem-Aranha: No Aranhaverso, de 2018, que acompanha 
                    Miles Morales (Shameik Moore), o simpático Homem-Aranha do Brooklyn. Neste novo capítulo, Miles está de volta para uma nova missão em 
                    sua agitada vida como super herói. No novo filme, Morales é transportado para uma aventura épica através do multiverso, e deve unir forças 
                    com a mulher-aranha Gwen Stacy (Hailee Steinfeld) e um novo time de Pessoas-Aranha, formado por heróis de diversas dimensões. No entanto, 
                    tudo muda quando os heróis entram em conflito sobre como lidar com uma nova ameaça, e Miles se vê em um impasse. E para piorar ainda mais a 
                    situação, eles precisam enfrentar um vilão muito mais poderoso do que qualquer coisa que já tenham encontrado antes. Agora, para salvar as 
                    pessoas que ele mais ama no mundo, Miles deve redefinir o que significa ser um super herói.</p> <br>
            <p>Horários: 14:00, 17:00, 20:00.</p>
            <p>Salas: 7, 8.</p>
        `;
        compra.filme = 'Homem-Aranha: Através do Aranhaverso';
    } else if (filmeId === 'trem-bala'){
        detalhes = `
            <h2>Trem-Bala</h2>
            <h3>Sinopse</h3>
            <p>Em Trem-Bala, Ladybug (Brad Pitt) é um assassino azarado, determinado a fazer seu trabalho pacificamente depois de muitas missões saírem dos trilhos. 
                    Quase desistindo de sua carreira, ele é recrutado por Maria Beetle (Sandra Bullock) para coletar uma maleta em um trem-bala indo de Tóquio para Morioka. 
                    O destino, no entanto, pode ter outros planos, pois a última missão de Ladybug o coloca em rota de colisão com adversários letais de todo o mundo - todos 
                    com objetivos conectados, mas conflitantes. A bordo estão os companheiros assassinos Kimura, Prince, Tangerine e Lemon.  No trem mais rápido do mundo - um 
                    dos trens-bala Shinkansen, no Japão - Ladybug fica sob ameaça com uma bomba que explodirá automaticamente se o trem diminuir a velocidade abaixo de 80 quilômetros 
                    por hora, a menos que um resgate seja pago. E ele precisa descobrir como sair.</p> <br>
            <p>Horários: 15:00, 18:00, 21:00.</p>
            <p>Salas: 9, 10.</p>
        `;
        compra.filme = 'Trem-Bala';
    }

    // Exibe o modal com as informações do filme.
    document.getElementById('detalhes-filme').innerHTML = detalhes;
    document.getElementById('modal-detalhes').style.display = 'block';
}

// Fecha o modal de detalhes do filme.
function fecharModal() {
    document.getElementById('modal-detalhes').style.display = 'none';
}

// Função que inicia o processo de compra, salvando o filme e redirecionando para a página de assentos.
function comprarIngressos(filmeId) {
    let nomeFilme = '';

    switch (filmeId) {
        case 'vitoria': nomeFilme = 'Vitória'; break;
        case 'oppenheimer': nomeFilme = 'Oppenheimer'; break;
        case 'interestelar': nomeFilme = 'Interestelar'; break;
        case 'homem-aranha': nomeFilme = 'Homem-Aranha: Através do Aranhaverso'; break;
        case 'trem-bala': nomeFilme = 'Trem-Bala'; break;
    }

    compra.filme = nomeFilme;
    sessionStorage.setItem('compra', JSON.stringify(compra));
    window.location.href = './assentos.html';
}

// Função para selecionar ou desmarcar assentos.
function selecionarAssento(botao) {
    // Impede seleção de assentos ocupados
    if (botao.classList.contains('ocupado')) return;

    // Verifica se já está selecionado
    if (botao.classList.contains('selecionado')) {
        botao.classList.remove('selecionado');
        compra.assentos = compra.assentos.filter(a => a !== botao.innerText);
    } else {
        // Verifica limite máximo de assentos
        if (compra.assentos.length >= 10) { // Altere o número conforme necessário
            alert('Máximo de 10 assentos por compra!');
            return;
        }
        
        botao.classList.add('selecionado');
        compra.assentos.push(botao.innerText);
    }
    sessionStorage.setItem('compra', JSON.stringify(compra));
}

// Função que salva a escolha do combo e avisa o usuário.
function selecionarCombo(combo) {
    compra.combo = combo;
    sessionStorage.setItem('compra', JSON.stringify(compra));
    alert('Combo selecionado: ' + combo);
}

function salvarComboPersonalizado() {
    const pipocaQuantidade = parseInt(document.getElementById('pipoca-quantidade').value) || 0;
    const refrigeranteQuantidade = parseInt(document.getElementById('refrigerante-quantidade').value) || 0;
    const chocolateQuantidade = parseInt(document.getElementById('chocolate-quantidade').value) || 0;

    // Verifica se pelo menos um item tem quantidade maior que 0
    if (pipocaQuantidade === 0 && refrigeranteQuantidade === 0 && chocolateQuantidade === 0) {
        alert('Por favor, selecione a quantidade de pelo menos um item para o combo!');
        return;
    }

    const pipoca = {
        tamanho: document.getElementById('pipoca-tamanho').value,
        quantidade: parseInt(document.getElementById('pipoca-quantidade').value) || 0
    };

    const refrigerante = {
        tamanho: document.getElementById('refrigerante-tamanho').value,
        quantidade: parseInt(document.getElementById('refrigerante-quantidade').value) || 0
    };

    const chocolate = {
        quantidade: parseInt(document.getElementById('chocolate-quantidade').value) || 0
    };

    compra.combo = {
        personalizado: true,
        pipoca,
        refrigerante,
        chocolate
    };

    sessionStorage.setItem('compra', JSON.stringify(compra));
    alert('Combo personalizado salvo com sucesso!');
}

// Validação dos dados do pagamento.
function validarPagamento() {
    const nome = document.getElementById('nome-cartao').value;
    const numero = document.getElementById('numero-cartao').value;
    const validade = document.getElementById('validade').value;
    const cvv = document.getElementById('cvv').value;

    if(nome === '' || numero.length !== 16 || validade === '' || cvv.length !== 3){
      alert('Por favor, preencha corretamente os dados do cartão.');
      return false;
    }

    compra.pagamento = {
        nome,
        numero,
        validade,
        cvv
    };

    sessionStorage.setItem('compra', JSON.stringify(compra));
    window.location.href = './revisao.html';
    return false;
}

// Monta a visualização de revisão da compra.
function montarRevisao() {
    const revisaoContainer = document.getElementById('info-revisao');

    let comboTexto = 'Nenhum combo selecionado.';
    if (compra.combo) {
        if (typeof compra.combo === 'string') {
            comboTexto = compra.combo; // Combo 1 ou Combo 2
        } else if (compra.combo.personalizado) {
            comboTexto = `
                <strong>Combo Personalizado:</strong><br>
                Pipoca: ${compra.combo.pipoca.quantidade}x (${compra.combo.pipoca.tamanho})<br>
                Refrigerante: ${compra.combo.refrigerante.quantidade}x (${compra.combo.refrigerante.tamanho})<br>
                Chocolate: ${compra.combo.chocolate.quantidade}x
            `;
        }
    }

    revisaoContainer.innerHTML = `
        <h3>Filme:</h3>
        <p>${compra.filme ? compra.filme : 'Nenhum filme selecionado.'}</p>
        <h3>Assentos:</h3>
        <p>${compra.assentos.length > 0 ? compra.assentos.join(', ') : 'Nenhum assento selecionado.'}</p>
        <h3>Combo:</h3>
        <p>${comboTexto}</p>
        <h3>Pagamento:</h3>
        <p>Nome: ${compra.pagamento.nome ? compra.pagamento.nome : ''}</p>
        <p>Número: ${compra.pagamento.numero ? '**** **** **** ' + compra.pagamento.numero.slice(-4) : ''}</p>
        <p>Validade: ${compra.pagamento.validade ? compra.pagamento.validade : ''}</p>
    `;
}

// Finaliza a compra, exibe mensagem de agradecimento e reseta os dados.
function confirmarCompra() {
    alert('Obrigado pela compra!');
    compra.filme = null;
    compra.assentos = [];
    compra.combo = null;
    compra.pagamento = {};
    sessionStorage.setItem('compra', JSON.stringify(compra));
    window.location.href = './selecaoDeFilmes.html';
}