import Header from './Header.js';
import Carousel from './Carousel.js';
import Content from './Content.js';
import details from './details.js';

export default class App {
  constructor(parent) {
    this.parent = parent;
    this.header = new Header(parent);
    this.carousel = new Carousel(parent);
    this.content = new Content(parent);
    this.details = new  details(parent);
    this.url = '';
    this.updateUrl();
    this.router();
  }

  updateUrl() {
    this.url = window.location.hash.slice(1) || "/";
    this.render();
  }

  router() {
    window.addEventListener('load', () => {
      this.updateUrl();
    });

    window.addEventListener('hashchange', () => {
      this.updateUrl();
    });
  }

  render() {
    this.parent.innerHTML = '';

    switch(this.url) {
      case '/':
      case 'accueil':
        document.title = 'Accueil';
        this.header.render();
        this.carousel.render();
        this.content.render();
        break;

      case 'voitures':
        document.title = 'Voitures';
        this.header.render();
        this.content.render();
        break;

      case 'details':
        document.title = 'Détails'
        this.header.render();
        this.details.render();
        break;

      default: break;
    }
  }
};
