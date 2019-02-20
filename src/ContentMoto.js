import { createDOMElement } from './dom.js';
import * as typeCheckers from './type-check.js';
import prop_access from './prop-access.js';

export default class ContentMoto {
    constructor(parent) {
        this.parent = parent
    }

    render() {
        this.parent.appendChild(createDOMElement('br'));

        const content = createDOMElement('div', ['container']);
        const row = createDOMElement('div', ['row']);

        // Recuperer les voitures depuis le localStorage
        const motos = JSON.parse(localStorage.getItem('motos'));

        // Parcourir les voitures
        motos.map((moto, index) => {

            if(typeCheckers.type_check_v2(prop_access(moto, 'nom'), 'string') &&
                typeCheckers.type_check_v2(prop_access(moto, 'image'), 'string')) {

                // Creer la carte bootstrap avec son container responsive
                const cardContainer = createDOMElement('div', ['col-md-4']);
                const card = createDOMElement('div', ['card']);
                const cardImg = createDOMElement('img', ['card-img-top'], {
                    'src': prop_access(moto, 'image'),
                    'alt': prop_access(moto, 'nom')
                });
                cardImg.style.height = '200px';
                const cardBody = createDOMElement('div', ['card-body']);
                const cardTitle = createDOMElement('h5', ['card-title'], {}, prop_access(moto, 'nom'));
                const boutoncard = createDOMElement('a', ['btn','btn-primary'] , {'href': '#detailsmoto/' + index }, 'Détails');

                // Cree le click listener
                function onClick() {
                    const value = prop_access(moto, 'nom');
                    const input = createDOMElement('input', [], {'value': value});

                    // Ajouter un blur listener
                    input.addEventListener('blur', () => {
                        motos[index].nom = input.value;

                        // Modifier la valeur dans lo localStorage
                        localStorage.setItem('motos', JSON.stringify(motos));
                        cardBody.removeChild(input);

                        // Modifie la valeur dans l'interface
                        const newCardTitle = createDOMElement('h5', ['card-title'], {}, prop_access(motos[index], nom));
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
