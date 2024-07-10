let disable = document.querySelector('#disable');
let enable = document.querySelector('#enable');

function copiarAlPortapapeles(texto) {
    // Copiar al portapapeles

    // Mostrar el mensaje
    const copiedMessage = document.getElementById("copied-message");
    copiedMessage.style.display = "block"; 
    setTimeout(() => {
      copiedMessage.style.display = "none"; 
    }, 2000); // Desaparece después de 2 segundos (2000 milisegundos)
  }

  const cardContainer = document.querySelector('.card-container');
  const cardContainer1 = document.querySelector('.card-container1');
  const copiedMessage = document.getElementById('copied-message');
  
  // Texto dentro de los divs de la card
  const cardValues = [
      '855 MAR', '855 BIO', '855 AMARILLO', '855 ROSA', '855 REYMA',
      '066 MAR', '066 BIO', '066 REYMA', '007', '007 BIO', '007 ROSA',
      '007 AMARILLO', '835', '835 BIO', 'CH 2', 'CH 2P', 'CH 2P AMARILLO',
      '4P', '4P AMARILLO'
  ];

  const cardValues1 = [
    '9D','9D BIO', '9-2D'
];



    // Funcion que maneja el copiado de texto
  function copyTextToClipboard(text) {
      if (navigator.clipboard) {
          navigator.clipboard.writeText(text)
              .then(showCopiedMessage)
              .catch(err => console.error('Error al copiar texto:', err));
      } else {
          // Código alternativo para navegadores antiguos sin Clipboard API
          const tempInput = document.createElement('input');
          tempInput.value = text;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          showCopiedMessage();
      }
  }
  
  function showCopiedMessage() {
      copiedMessage.style.display = 'block';
      setTimeout(() => {
          copiedMessage.style.display = 'none';
      }, 2000);
  }

      //creacion de la card y agregar clases e ids
  cardValues.forEach(value => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.setAttribute('id', 'search-card-3');
      card.textContent = value;

  

  
      // Manejar toques y clics (con prevención de doble disparo)
      let touchStartTime;
      card.addEventListener('touchstart', (e) => {
          touchStartTime = Date.now();
      });
      card.addEventListener('touchend', (e) => {
          if (Date.now() - touchStartTime < 500) { // Si el toque fue rápido
              copyTextToClipboard(value); 
          }
      });
      card.addEventListener('click', () => {
          if (Date.now() - touchStartTime >= 500) { // Evitar doble disparo después del toque
              copyTextToClipboard(value);
          }
      });
  
      cardContainer.appendChild(card);
  });     