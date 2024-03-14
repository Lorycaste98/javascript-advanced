import '../styles/style.css'

const paginaPrecedente = document.getElementById('prev-button');
const paginaCorrente = document.getElementById('current-page');
const paginaSuccessiva = document.getElementById('next-button');
let elencoNotizie = '';
let conteggioPagina = 1;
let startIndex = 0;
let elementiPerPagina = 10;

generaNotizie();

function generaNotizie() {
  fetch('https://hacker-news.firebaseio.com/v0/newstories.json')
    .then((response) => response.json())
    .then((data) => {
      for (let i = startIndex; i < elementiPerPagina; i++) {
        const element = data[i];
        const url = `https://hacker-news.firebaseio.com/v0/item/${element}.json`;
        fetchUrl(url)
      }
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
    });
}

function fetchUrl(indirizzo) {
  fetch(indirizzo)
    .then((response) => response.json())
    .then((data) => {
      elencoNotizie += `
        <div class="my-5 bg-slate-200 rounded-lg py-2 px-4 shadow-xl">
          <p class="p-2"><strong>TITLE: </strong>${data.title}</p>
          <p class="p-2"><strong>LINK: </strong><a href="${data.url}" class="underline text-indigo-600">${data.url}</a></p>
          <p class="p-2"><strong>DATE: </strong>${dataFromattata(data.time)}</p>
        </div>
      `
      document.querySelector('#js-news-container').innerHTML = elencoNotizie
    })
    .catch(error => {
      console.error('Si è verificato un errore:', error);
    });

}

function dataFromattata(dateUnixTime) {
  const dataMs = new Date(dateUnixTime * 1000)
  const giorno = dataMs.getDate();
  const mese = dataMs.getMonth() + 1;
  const anno = dataMs.getFullYear();

  const dataCompleta = `${giorno}/${mese}/${anno}`;
  return dataCompleta
}

paginaSuccessiva.addEventListener('click', () => {
  startIndex += 10;
  elementiPerPagina += 10;
  conteggioPagina += 1;
  elencoNotizie = ''
  generaNotizie();
  nascondiPulsante();
  paginaCorrente.innerHTML = `Pagina corrente: ${conteggioPagina}`
})

paginaPrecedente.addEventListener('click', () => {
  if (startIndex <= 0) {
    return
  } else {
    startIndex -= 10;
    elementiPerPagina -= 10;
    conteggioPagina -= 1;
    elencoNotizie = ''
    generaNotizie();
    nascondiPulsante();
    paginaCorrente.innerHTML = `Pagina corrente: ${conteggioPagina}`
  }
})

function nascondiPulsante (){
  if(conteggioPagina > 1){
    paginaPrecedente.classList.remove('invisible')
  }else{
    paginaPrecedente.classList.add('invisible')
  }

}
