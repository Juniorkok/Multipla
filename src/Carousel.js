import { createDOMElement } from './dom.js';
import * as typeCheckers from './type-check.js';

export default class Carousel {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    const carousel = createDOMElement('div', ['carousel', 'slide'], {
      'id': 'carouselExampleControls',
      'data-ride': 'carousel'
    });

    // Contenu intérieur
    const carouselContent = createDOMElement('div', ['carousel-inner']);

    // Recuperer les voitures depuis le localStorage
    const voitures = JSON.parse(localStorage.getItem('voitures'));

    // Parcourir les voitures
    voitures.map((voiture) => {

      if(typeCheckers.type_check_v1(voiture.nom, 'string') &&
        typeCheckers.type_check_v1(voiture.image, 'string')) {

        const item = createDOMElement('div', ['carousel-item']);

        const card = createDOMElement('div', ['card']);
        const cardImg = createDOMElement('img', ['card-img-top'], {
          'src': voiture.image,
          'alt': voiture.nom
        });
        cardImg.style.height = '480px';
        const cardBody = createDOMElement('div', ['card-body']);
        const cardTitle = createDOMElement('h2', ['card-title'], {}, voiture.nom);
        cardTitle.style.textAlign = 'center';
        cardBody.appendChild(cardTitle);
        card.appendChild(cardImg);
        card.appendChild(cardBody);

        item.appendChild(card);
        carouselContent.appendChild(item);
      }
    });

    carouselContent.childNodes[0].classList.add('active');

    // Boutton gauche
    const buttonLeft = createDOMElement('a', ['carousel-control-prev'], {
      'role': 'button',
      'data-slide': 'prev'
    });
    buttonLeft.addEventListener('click', function() {
      const currentActive = carouselContent.querySelectorAll('.active');
      currentActive[0].classList.remove('active');

      if(currentActive[0].previousSibling !== null) {
        currentActive[0].previousSibling.classList.add('active');
      } else {
        carouselContent.childNodes[voitures.length - 1].classList.add('active');
      }
    });
    buttonLeft.appendChild(createDOMElement('span', ['carousel-control-prev-icon'], {'aria-hidden': 'true'}));
    buttonLeft.appendChild(createDOMElement('span', ['sr-only'], {}, 'Pravious'));

    // Boutton droite
    const buttonRight = createDOMElement('a', ['carousel-control-next'], {
      'role': 'button',
      'data-slide': 'next'
    });
    buttonRight.addEventListener('click', function() {
      const currentActive = carouselContent.querySelectorAll('.active');
      currentActive[0].classList.remove('active');

      if(currentActive[0].nextSibling !== null) {
        currentActive[0].nextSibling.classList.add('active');
      } else {
        carouselContent.childNodes[0].classList.add('active');
      }
    });
    buttonRight.appendChild(createDOMElement('span', ['carousel-control-next-icon'], {'aria-hidden': 'true'}));
    buttonRight.appendChild(createDOMElement('span', ['sr-only'], {}, 'Next'));

    carousel.appendChild(carouselContent);
    carousel.appendChild(buttonLeft);
    carousel.appendChild(buttonRight);

    this.parent.appendChild(carousel);
  }
}
