function iniciarJogo() {

    const jogadorX = 'Homem de Ferro';
    const jogadorO = 'Capitão América';
    let jogadorAtual = jogadorX;
    let celulas = document.getElementsByClassName('celula');

    for (let celula of celulas) {
        celula.addEventListener('click', () => fazerJogada(celula));
    }

    const jogadasVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
        [0, 4, 8], [2, 4, 6]             // Diagonais
    ];

    function fazerJogada(celula) {
        if (!celula.querySelector("img")) {
            const icon = document.createElement("img");
            icon.src = jogadorAtual === jogadorX ? "icons/homem-ferro.png" : "icons/capitao-america.png";
            icon.alt = jogadorAtual === jogadorX ? "Homem de Ferro" : "Capitão América";
            celula.appendChild(icon);

            if (verificarVencedor()) {
                exibirPopUp(jogadorAtual + ' venceu!');
                reiniciarJogo();
            } else if (verificarEmpate()) {
                exibirPopUp('Tanos venceu!');
                reiniciarJogo();
            }

            jogadorAtual = (jogadorAtual === jogadorX) ? jogadorO : jogadorX;

        }
    }

    function verificarEmpate() {
        for (let celula of celulas) {
            if (celula.innerHTML === '') {
                return false;
            }
        }
        return true;
    }

    function verificarVencedor() {
        for (let combinacao of jogadasVencedoras) {
            const [a, b, c] = combinacao;

            const celulaA = celulas[a].querySelector("img");
            const celulaB = celulas[b].querySelector("img");
            const celulaC = celulas[c].querySelector("img");

            if (celulaA && celulaB && celulaC) {
                const imagemA = celulaA.getAttribute("src");
                const imagemB = celulaB.getAttribute("src");
                const imagemC = celulaC.getAttribute("src");

                if(imagemA === imagemB && imagemB === imagemC){
                    return true;
                }
            }
        }
        return false;
    }

    function exibirPopUp(mensagem) {
        const popUp = document.getElementById("popUp");
        const constMensagem = document.getElementById("mensagem");
        constMensagem.textContent = mensagem;
        popUp.style.display = "block";

        const botaoFechar = document.getElementById("fechar");
        botaoFechar.onclick = function () {
            popUp.style.display = "none";
        };
    }

    function reiniciarJogo() {
        for (let celula of celulas) {
            const imagem = celula.querySelector("img");
            if (imagem) {
                celula.removeChild(imagem);
            }
        }
        jogadorAtual = jogadorX;
    }
}

iniciarJogo();
