
// Elementos HTML
const cronometroElement = document.getElementById('cronometro');
const iniciarButton = document.getElementById('iniciar');
const pausarButton = document.getElementById('pausar');
const pararButton = document.getElementById('parar');
const botaoTime = document.querySelectorAll('.botao-time');

const titulo = document.getElementById('titulo');
const card = document.getElementById('card-pomo');
const turbo = new Audio('./public/assets/turbo.mp3');
const turbina = document.getElementById('giroTurbo');
const giro = document.getElementById('giro');

Notification.requestPermission();

let tempo = 1500;
let timeInicial = 1500;


botaoTime.forEach(bTime => {


  bTime.addEventListener('click', () => {
    let test = bTime.value * 60;
    tempo = test;
    timeInicial = test;
    cronometroElement.textContent = formatarTempo(tempo);
  })
});


// Variáveis para controle do cronômetro
let intervalo;

// Função para formatar o tempo em HH:MM:SS
function formatarTempo(segundos) {
  const horas = Math.floor(segundos / 3600);
  segundos %= 3600;
  const minutos = Math.floor(segundos / 60);
  segundos %= 60;
  return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}



// Função para atualizar o cronômetro
let pontoDeFuga = 1;
function atualizarCronometro() {
  tempo--;
  cronometroElement.textContent = formatarTempo(tempo);


  // ///////////////////////////////////////////// LOOP OU VOLTANDO PARA O INICIO TANTO FAZ
  if (pontoDeFuga === 8) {
    pontoDeFuga = 0;
    atualizarCronometro();
  }

  // ///////////////////////////////////////////// TEMPO DE TRABALHO
  else if (tempo === 0 && pontoDeFuga % 2 === 0 && pontoDeFuga < 7) {
    let text = "Pomodoro";


    card.style.background = "#535bf2";
    titulo.innerHTML = text;


    tempo = timeInicial;
    cronometroElement.textContent = formatarTempo(tempo);
    pontoDeFuga++;

    stop();
    alertNotif(text);
  }


  // ////////////////////////////////////////////   PAUSA NORMAL
  else if (tempo === 0 && pontoDeFuga % 2 != 0 && pontoDeFuga < 7) {
    let text = "Pausa";

    card.style.background = "red";
    titulo.innerHTML = text;


    tempo = 300;
    cronometroElement.textContent = formatarTempo(tempo);
    pontoDeFuga++;

    stop();
    alertNotif(text);
  }


  // /////////////////////////////////////////////  PAUSA GRANDE
  else if (tempo === 0 && pontoDeFuga === 7) {
    let text = `Pausa <br> Grande`;
    let msgText = "Pausa Grande";

    card.style.background = "#9e2a2b";
    titulo.innerHTML = text;


    tempo = 1800;
    cronometroElement.textContent = formatarTempo(tempo);
    pontoDeFuga++;

    stop();
    alertNotif(msgText);
    atualizarCronometro();
  }


}




function stop() {
  clearInterval(intervalo);
  iniciarButton.disabled = false;
  pausarButton.disabled = true;
  pararButton.disabled = false;
}

function start(params) {
  intervalo = setInterval(atualizarCronometro, 1000); // Atualiza o cronômetro a cada 1 segundo (1000ms)
  iniciarButton.disabled = true;
  pausarButton.disabled = false;
  pararButton.disabled = false;
}


// Event listener para o botão Iniciar
iniciarButton.addEventListener('click', () => {
  start();
});


// Event listener para o botão Pausar
pausarButton.addEventListener('click', () => {
  stop();
});



// Event listener para o botão Parar
pararButton.addEventListener('click', () => {
  clearInterval(intervalo);
  tempo = timeInicial;
  cronometroElement.textContent = formatarTempo(tempo);
  iniciarButton.disabled = false;
  pausarButton.disabled = true;
  pararButton.disabled = true;
});



function alertNotif(titulo) {
  turbo.play();
  turbina.style.animation = "tremer 0.5s ease infinite";
  giro.style.animation = "girarInfinitamente 0.7s linear infinite"

  setTimeout(() => {
    turbina.style.transition = "2s";
    turbina.style.animation = "tremer 4s ease infinite";
    giro.style.animation = "girarInfinitamente 2s linear infinite"
  }, 1800);
  if ("Notification" in window) {
    // Solicita permissão para exibir notificações
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // Cria e exibe a notificação
        var notification = new Notification("Vrum Vrum 🍅", {
          body:
            `Tempo de ${titulo} começou
            
👉 Clique para Inicialo`,
          icon: "./public/assets/turbina.png", // URL do ícone da notificação (opcional)
        });

        // Adiciona um evento de clique à notificação (opcional)
        notification.onclick = function () {
          // Código a ser executado ao clicar na notificação
          start();

        };

      }
    });
  }
}