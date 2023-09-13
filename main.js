
// Elementos HTML
const cronometroElement = document.getElementById('cronometro');
const iniciarButton = document.getElementById('iniciar');
const pausarButton = document.getElementById('pausar');
const pararButton = document.getElementById('parar');
const botaoTime = document.querySelectorAll('.botao-time');
const titulo = document.getElementById('titulo');
const card = document.getElementById('card-pomo');


let tempo = 1500;
let timeInicial = 0


botaoTime.forEach(bTime => {

  bTime.addEventListener('click', () => {
    let test = bTime.value * 1;
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

    if (pontoDeFuga === 4) {

    pontoDeFuga = 0;

    atualizarCronometro();
  } else if (tempo === 0 && pontoDeFuga % 2 === 0 && pontoDeFuga < 3) {
    let text = "Pomodoro";


    card.style.background = "#535bf2";
    titulo.innerHTML = text;


    tempo = timeInicial;
    pontoDeFuga++;

    console.log(pontoDeFuga);
  } else if (tempo === 0 && pontoDeFuga % 2 != 0 && pontoDeFuga < 3) {
    let text = "Pausa";

    card.style.background = "red";
    titulo.innerHTML = text;


    tempo = 4;
    pontoDeFuga++;
    console.log(pontoDeFuga);
  } else if (tempo === 0 && pontoDeFuga === 3) {
    let text = "Pausa Grande";

    card.style.background = "red";
    titulo.innerHTML = text;


    tempo = 6;
    pontoDeFuga ++;


    atualizarCronometro();
  }


}



// Event listener para o botão Iniciar
iniciarButton.addEventListener('click', () => {
  intervalo = setInterval(atualizarCronometro, 1000); // Atualiza o cronômetro a cada 1 segundo (1000ms)
  iniciarButton.disabled = true;
  pausarButton.disabled = false;
  pararButton.disabled = false;
});



// Event listener para o botão Pausar
pausarButton.addEventListener('click', () => {
  clearInterval(intervalo);
  iniciarButton.disabled = false;
  pausarButton.disabled = true;
  pararButton.disabled = false;
});



// Event listener para o botão Parar
pararButton.addEventListener('click', () => {
  clearInterval(intervalo);
  tempo = 1500;
  cronometroElement.textContent = formatarTempo(tempo);
  iniciarButton.disabled = false;
  pausarButton.disabled = true;
  pararButton.disabled = true;
});

