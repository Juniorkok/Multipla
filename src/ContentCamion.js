import { createDOMElement } from './dom.js';
import * as typeCheckers from './type-check.js';
import prop_access from './prop-access.js';

export default class ContentCamion {
    constructor(parent) {
        this.parent = parent
    }

    render() {
        this.parent.appendChild(createDOMElement('br'));

        const content = createDOMElement('div', ['container']);
        const row = createDOMElement('div', ['row']);

        // Recuperer les voitures depuis le localStorage
        const camions = JSON.parse(localStorage.getItem('camions'));

        // Parcourir les voitures
        camions.map((camion, index) => {

            if(typeCheckers.type_check_v2(prop_access(camion, 'nom'), 'string') &&
                typeCheckers.type_check_v2(prop_access(camion, 'image'), 'string')) {

                // Creer la carte bootstrap avec son container responsive
                const cardContainer = createDOMElement('div', ['col-md-4']);
                const card = createDOMElement('div', ['card']);
                const cardImg = createDOMElement('img', ['card-img-top'], {
                    'src': prop_access(camion, 'image'),
                    'alt': prop_access(camion, 'nom')
                });
                cardImg.style.height = '200px';
                const cardBody = createDOMElement('div', ['card-body']);
                const cardTitle = createDOMElement('h5', ['card-title'], {}, prop_access(camion, 'nom'));
                const boutoncard = createDOMElement('a', ['btn','btn-primary'] , {'href': '#detailscamion/' + index }, 'Détails');

                // Cree le click listener
                function onClick() {
                    const value = prop_access(camion, 'nom');
                    const input = createDOMElement('input', [], {'value': value});

                    // Ajouter un blur listener
                    input.addEventListener('blur', () => {
                        camions[index].nom = input.value;

                        // Modifier la valeur dans lo localStorage
                        localStorage.setItem('camions', JSON.stringify(camions));
                        cardBody.removeChild(input);

                        // Modifie la valeur dans l'interface
                        const newCardTitle = createDOMElement('h5', ['card-title'], {}, prop_access(camions[index], nom));
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
