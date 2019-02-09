import { createDOMElement } from './dom.js';
import * as typeCheckers from './type-check.js';
import './prop-access.js';

export default class Content {
  constructor(parent) {
    this.parent = parent
  }

  render() {
    this.parent.appendChild(createDOMElement('br'));

    const content = createDOMElement('div', ['container']);
    const row = createDOMElement('div', ['row']);

    // Recuperer les voitures depuis le localStorage
    const voitures = JSON.parse(localStorage.getItem('voitures'));

    // Parcourir les voitures
    voitures.map((voiture, index) => {

      // Prop access
      // ─────────────────────────────────────────────────────────────────
      
      // console.log(typeCheckers.type_check_v1(voiture.prop_access('nom'), 'string'))

      if(typeCheckers.type_check_v1(voiture.nom, 'string') &&
        typeCheckers.type_check_v1(voiture.image, 'string')) {

        // Creer la carte bootstrap avec son container responsive
        const cardContainer = createDOMElement('div', ['col-md-4']);
        const card = createDOMElement('div', ['card']);
        const cardImg = createDOMElement('img', ['card-img-top'], {'src': voiture.image, 'alt': voiture.nom});
        cardImg.style.height = '200px';
        const cardBody = createDOMElement('div', ['card-body']);
        const cardTitle = createDOMElement('h5', ['card-title'], {}, voiture.nom);
        const boutoncard = createDOMElement('a', ['btn','btn-primary'] ,{'href': '#details' }, 'Détails');

        // Cree le click listener
        function onClick() {
          const value = voiture.nom;
          const input = createDOMElement('input', [], {'value': value});

          // Ajouter un blur listener
          input.addEventListener('blur', () => {
            voitures[index].nom = input.value;

            // Modifier la valeur dans lo localStorage
            localStorage.setItem('voitures', JSON.stringify(voitures));
            cardBody.removeChild(input);

            // Modifie la valeur dans l'interface
            const newCardTitle = createDOMElement('h5', ['card-title'], {}, voitures[index].nom);
            newCardTitle.addEventListener('click', onClick);
            cardBody.appendChild(newCardTitle);
            cardBody.appendChild(boutoncard);
          });

          cardBody.removeChild(this);
          cardBody.appendChild(input);
          input.focus();
        }

        // Ajouter un click listener
        cardTitle.addEventListener('click', onClick);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(boutoncard);
        card.appendChild(cardImg);
        card.appendChild(cardBody);
        cardContainer.appendChild(card);
        row.appendChild(cardContainer);
      }


    });

    content.appendChild(row);
    this.parent.appendChild(content);
  }
}
