import { createDOMElement } from './dom.js';
import prop_access from './prop-access.js';
import './interpolate.js';

export default class Details {
  constructor(parent) {
    this.parent = parent;
  }

	render(voitureId) {

    // Afficher le spinner
    const spinner = createDOMElement('div', ['lds-roller']);
    for(let i = 0; i < 8; i++) {
      const div = createDOMElement('div');
      spinner.appendChild(div);
    }
    this.parent.appendChild(spinner);

    // Charger la voiture demandé avec un promise
    const voiture = JSON.parse(localStorage.getItem('voitures'))[voitureId];
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve(voiture);
      }, 1500);
    });

    // Afficher les détails après le chargement
    promise.then(voiture => {
      // Supprimer le spinner
      spinner.remove();

      this.parent.appendChild(createDOMElement('br'));

      // Créer la carte
      const details = createDOMElement('div', ['container']);

      const card = createDOMElement('div', ['card', 'mb-3']);
      const cardImg = createDOMElement('img', ['card-img-top'], {
        src: '{{ image }}'.interpolate(voiture),
        alt: '{{ nom }}'.interpolate(voiture)
      });
      const cardBody = createDOMElement('div', ['card-body']);
      const cardTitle = createDOMElement('h3', ['card-title'], {}, '{{ nom }}'.interpolate(voiture));
      const cardText = createDOMElement('h5', ['card-text'], {}, '{{ datedeparution }}'.interpolate(voiture));

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);

      card.appendChild(cardBody);
      card.appendChild(cardImg);

      details.appendChild(card);

      this.parent.appendChild(details);
    });
	}
};
