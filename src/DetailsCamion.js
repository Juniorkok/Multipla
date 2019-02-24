import { createDOMElement } from './dom.js';
import prop_access from './prop-access.js';
import './interpolate.js';

export default class DetailsCamions {
    constructor(parent) {
        this.parent = parent;
    }

    render(camionId) {

        // Afficher le spinner
        const spinner = createDOMElement('div', ['lds-roller']);
        for(let i = 0; i < 8; i++) {
            const div = createDOMElement('div');
            spinner.appendChild(div);
        }
        this.parent.appendChild(spinner);

        // Charger la voiture demandé avec un promise
        const camion = JSON.parse(localStorage.getItem('camions'))[camionId];
        const promise = new Promise(resolve => {
            setTimeout(() => {
                resolve(camion);
            }, 1500);
        });

        // Afficher les détails après le chargement
        promise.then(camion => {
            // Supprimer le spinner
            spinner.remove();

            this.parent.appendChild(createDOMElement('br'));

            // Créer la carte
            const detailscamion = createDOMElement('div', ['container']);

            const card = createDOMElement('div', ['card', 'mb-3']);
            const cardImg = createDOMElement('img', ['card-img-top'], {
                src: '{{ image }}'.interpolate(camion),
                alt: '{{ nom }}'.interpolate(camion)
            });
            const cardBody = createDOMElement('div', ['card-body']);
            const cardTitle = createDOMElement('h3', ['card-title'], {}, '{{ nom }}'.interpolate(camion));
            const cardText = createDOMElement('h5', ['card-text'], {}, '{{ datedeparution }}'.interpolate(camion));

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);

            card.appendChild(cardBody);
            card.appendChild(cardImg);

            detailscamion.appendChild(card);

            this.parent.appendChild(detailscamion);
        });
    }
};
