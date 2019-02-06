import { createDOMElement } from './dom.js';

export default class Header {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    // Creer la navbar avec les liens
    const navbar = createDOMElement('div', ['navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light']);
    const navbarBrand = createDOMElement('a', ['navbar-brand'], {}, 'Voitures');
    const buttonBrand = createDOMElement('button', ['navbar-toggler'], {
      'type': 'button',
      'data-toggle': 'collapse',
      'data-target': '#navbarSupportedContent',
      'aria-controls': 'navbarSupportedContent',
      'aria-expanded': 'false',
      'aria-label': 'Toggle navigation'
    });
    const buttonBrandSpan = createDOMElement('span', ['navbar-toggler-icon']);

    buttonBrand.appendChild(buttonBrandSpan);
    navbarBrand.appendChild(buttonBrand);
    navbar.appendChild(navbarBrand);

    const navbarContent = createDOMElement('div', ['collapse', 'navbar-collapse'], {'id': 'navbarSupportedContent'});
    const navbarContentList = createDOMElement('ul', ['navbar-nav', 'mr-auto']);
    const accueilLi = createDOMElement('li', ['nav-item']);
    const accueilA = createDOMElement('a', ['nav-link'], {'href': '#accueil'}, 'Accueil');
    const voituresLi = createDOMElement('li', ['nav-item']);
    const voituresA = createDOMElement('a', ['nav-link'], {'href': '#voitures'}, 'Voitures');

    accueilLi.appendChild(accueilA);
    voituresLi.appendChild(voituresA);
    navbarContentList.appendChild(accueilLi);
    navbarContentList.appendChild(voituresLi);
    navbarContent.appendChild(navbarContentList);
    navbar.append(navbarContent);

    this.parent.appendChild(navbar);
  }
}
