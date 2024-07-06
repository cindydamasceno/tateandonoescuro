// INICIA AS VARIÁVEIS PARA ELEMENTOS

var estado_luz = 0 /// CRIA ID PARA ESTADO DA LAMPADA (0 DESLIGADO - 1 LIGADO)
var sfx_ambiente = undefined 

var foreground
var expediente
var bonecoLivro
var bonecoParado
var bonecoEscada
var radio 
var interruptor
var variacao

//  DEFINE A QUANTIDADE DE VARIAÇÕES DO INTERRUPTOR

var maximo_variacao = 3 


//  INICIA O SCRIPT 

function iniciar(){


    // CRIA PARA FACILITAR VISUALIZAR O FUNDO

    document.addEventListener("keydown",function(event){
        if (event.key === 'Enter'){
            fimJogo();
        }
    });

    alert('Ao acordar uma manhã de sonhos intranquilos você percebe que está em um ambiente escuro.\n\nBrinque de tatear clicando no fundo preto para encontrar o interruptor. \n\n(Pressione Enter para revelar automaticamente)')

    //  FUNDO PRETO

    foreground = document.getElementById("fg") 

    // REGISTRA OS ELEMENTOS NAS VARIÁVEIS

    expediente = document.getElementById("expediente")
    bonecoLivro = document.getElementById("bonecoLivro")
    bonecoParado = document.getElementById("bonecoParado")
    bonecoEscada = document.getElementById("bonecoEscada")
    radio = document.getElementById("radio")
    interruptor = document.getElementById("interruptor")

    // DEFINE AÇÕES DO BOTÃO DE CLICK (NO CASO DO ELEMENTOS, TOCA E DESATIVA O ÁUDIO)
        //  O INTERRUPTOR ATIVA E DESATIVA A AÇÃO
    interruptor.setAttribute("onclick", "fimJogo()")
    radio.setAttribute("onclick", "tocarSom('assets/audio/radio.mp3')")
    bonecoLivro.setAttribute("onclick", "tocarSom('assets/audio/livro-audio.mp3')")
    bonecoParado.setAttribute("onclick", "tocarSom('assets/audio/parado-audio.mp3')")
    bonecoEscada.setAttribute("onclick", "tocarSom('assets/audio/escada-audio.mp3')")

    /// DEFINE AÇÕES HOVER MOUSE

    interruptor.onmouseenter = function(){
        mudarSprite(interruptor, "assets/imagens/interruptor-2.svg")
    }

    interruptor.onmouseleave = function(){
        mudarSprite(interruptor, "assets/imagens/interruptor-1.svg")
    }

    bonecoLivro.onmouseenter = function(){
        mudarSprite(bonecoLivro, "assets/imagens/livro-2.svg")
    }

    bonecoLivro.onmouseleave = function(){
        mudarSprite(bonecoLivro, "assets/imagens/livro-1.svg")
    }

    bonecoParado.onmouseenter = function(){
        mudarSprite(bonecoParado, "assets/imagens/parado-2.svg")
    } 

    bonecoParado.onmouseleave = function(){
        mudarSprite(bonecoParado, "assets/imagens/parado-1.svg")
    }

    bonecoEscada.onmouseenter = function(){
        mudarSprite(bonecoEscada, "assets/imagens/escada-2.svg")
    } 

    bonecoEscada.onmouseleave = function(){
        mudarSprite(bonecoEscada, "assets/imagens/escada-1.svg")
    }

    radio.onmouseenter = function(){
        mudarSprite(radio, "assets/imagens/radio-2.svg")
    } 

    radio.onmouseleave = function(){
        mudarSprite(radio, "assets/imagens/radio-1.svg")
    }

    /// DEFINIÇÃO DE POSIÇÕES DOS ELEMENTOS
        // AQUI, OS ELEMENTOS SÃO POSICIONADOS NA TELA 

    bonecoLivro.setAttribute("style", "top: 550px; left: 680px;")
    bonecoParado.setAttribute("style", "top: 450px; left: 10px;")
    bonecoEscada.setAttribute("style", "top: 100px; left: 375px;")
    radio.setAttribute("style", "top: 460px; left: 220px;")
    
    // USO DA BIBLIOTECA MATH.RANDOM DO JS. 
        // PEGA NÚMEROS DE ZERO A UM 
        // MULTIPLA PELO MÁXIMO DE VARIAÇÕES (3)
        // MATH.FLOOR VAI ARREDONDAR O RESULTADO MULTIPLICAÇÃO PARA O PRÓXIMO NÚMERO INTEIRO
    //  CHAMA A FUNÇÃO randomizarPosicao
    variacao = Math.floor(Math.random() * maximo_variacao)
    randomizarPosicao()

}

//  O OBJETIVO DESSA FUNÇÃO É COLOCAR O INTERRUPTOR EM POSIÇÕES ALEATÓRIAS
    // ESSA POSIÇÃO ESTÁ LIMITADA A TRÊS VARIAÇÕES, (REFERÊNCIA: VARIÁVEL variacao)

function randomizarPosicao(){
    switch(variacao){
        case 0:
            interruptor.setAttribute("style", "top: 400px; left: 750px;")
            break

        case 1:
            interruptor.setAttribute("style", "top: 250px; left: 250px;")
            break

        case 2:
            interruptor.setAttribute("style", "top: 50px; left: 100px;")
            break
    }

    // ++ À ESQUERDA SOMA ANTES DE FAZER A VERIFICAÇÃO DO IF
    if(++variacao >= 3) variacao = 0
}

// MUDA DESENHOS (SPRITES) DA TELA

function mudarSprite(elemento, novoSprite){
    elemento.src = novoSprite
}

// FUNÇÃO DEFINE POR PADRÃO TODOS OS SONS PARA TOCAR EM LOOPING

function tocarSom(caminho, loop = false){
    var sfx = new Audio(caminho)
    sfx.play()
    sfx.loop = loop
    return sfx;
}

function pararSom(som){
    if(som != undefined){
        som.pause();
        som.currentTime = 0;
    }
}


// CRIA UMA FUNÇÃO PARA DESATIVAR A CENA, O ÁUDIO E MUDAR O ESTADO DA LAMPADA

function fimJogo(){
    if(estado_luz == 0){
        estado_luz = 1;
        foreground.setAttribute("style", "visibility: hidden;");
        sfx_ambiente = tocarSom("assets/audio/som-ambiente.mp3", true)
    }
    else{
        estado_luz = 0
        foreground.setAttribute("style", "visibility: visible;");
        pararSom(sfx_ambiente)
        randomizarPosicao()
    }
    
    tocarSom("assets/audio/light-switch.mp3")
}
