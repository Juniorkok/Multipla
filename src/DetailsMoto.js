import { createDOMElement } from './dom.js';
import prop_access from './prop-access.js';
import './interpolate.js';

export default class DetailsMoto {
    constructor(parent) {
        this.parent = parent;
    }

    render(motoId) {

        // Afficher le spinner
        const spinner = createDOMElement('div', ['lds-roller']);
        for(let i = 0; i < 8; i++) {
            const div = createDOMElement('div');
            spinner.appendChild(div);
        }
        this.parent.appendChild(spinner);

        // Charger la voiture demandé avec un promise
        const moto = JSON.parse(localStorage.getItem('motos'))[motoId];
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve(moto);
            }, 1500);
        });

        // Afficher les détails après le chargement
        promise.then(moto => {
            // Supprimer le spinner
            spinner.remove();

            this.parent.appendChild(createDOMElement('br'));

            // Créer la carte
            const detailsmoto = createDOMElement('div', ['container']);

            const card = createDOMElement('div', ['card', 'mb-3']);
            const cardImg = createDOMElement('img', ['card-img-top'], {
                src: '{{ image }}'.interpolate(moto),
                alt: '{{ nom }}'.interpolate(moto)
            });
            const cardBody = createDOMElement('div', ['card-body']);
            const cardTitle = createDOMElement('h3', ['card-title'], {}, '{{ nom }}'.interpolate(moto));
            const cardText = createDOMElement('h5', ['card-text'], {}, '{{ datedeparution }}'.interpolate(moto));

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            card.appendChild(cardBody);
            card.appendChild(cardImg);

            detailsmoto.appendChild(card);

            this.parent.appendChild(detailsmoto);
        });
    }
};
