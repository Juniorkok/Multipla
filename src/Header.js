import { createDOMElement } from './dom.js';

export default class Header {
  constructor(parent) {
    this.parent = parent;
  }

  render() {
    // Creer la navbar avec les liens
    const navbar = createDOMElement('div', ['navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light']);
    const navbarBrand = createDOMElement('a', ['navbar-brand'], {}, 'Voitures/Motos/Camions');
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
    const motoLi = createDOMElement('li', ['nav-item']);
    const motoA = createDOMElement('a', ['nav-link'], {'href': '#motos'}, 'Motos');
    const voituresLi = createDOMElement('li', ['nav-item']);
    const voituresA = createDOMElement('a', ['nav-link'], {'href': '#voitures'}, 'Voitures');
    const camionsLi = createDOMElement('li', ['nav-item']);
    const camionsA = createDOMElement('a', ['nav-link'], {'href': '#camions'}, 'Camions');
    const navbarContentRight = createDOMElement('ul', ['navbar-nav','ml-auto']);
    const toggleSun = createDOMElement('li', ['nav-item', 'center']);
    const toggleLabel = createDOMElement('li', ['nav-item']);
    const toggleMoon = createDOMElement('li', ['nav-item']);
    const labelSwitch = createDOMElement('label', ['switch']);
    const inputSwitch = createDOMElement('input', [], {
      'type': 'checkbox',
      'id': 'switchDarkLight'
    });
    const spanSwitch = createDOMElement('span', ['slider', 'round']);

    function toggleDarkLight(){
      var body = document.getElementById("body");
      var currentClass = body.className;
      body.className = currentClass == "dark-mode" ? "light-mode" : "dark-mode";
    }

    toggleSun.innerHTML = '🌞';
    toggleMoon.innerHTML = '🌛';

    inputSwitch.addEventListener('change', toggleDarkLight);

    accueilLi.appendChild(accueilA);
    voituresLi.appendChild(voituresA);
    motoLi.appendChild(motoA);
    camionsLi.appendChild(camionsA);
    navbarContentList.appendChild(accueilLi);
    navbarContentList.appendChild(voituresLi);
    navbarContentList.appendChild(motoLi);
    navbarContentList.appendChild(camionsLi);
    navbarContent.appendChild(navbarContentList);
    labelSwitch.append(inputSwitch);
    labelSwitch.append(spanSwitch);
    //navbarContentRight.appendChild(labelSwitch);
    navbarContentRight.appendChild(toggleSun);
    navbarContentRight.appendChild(toggleLabel);
    toggleLabel.appendChild(labelSwitch);
    navbarContentRight.appendChild(toggleMoon);
    navbarContent.appendChild(navbarContentRight);
    navbar.append(navbarContent);

    this.parent.appendChild(navbar);
  }
}
