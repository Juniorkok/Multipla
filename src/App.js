import Header from './Header.js';
import Carousel from './Carousel.js';
import Content from './Content.js';
import Details from './Details.js';
import DetailsMoto from './DetailsMoto.js';
import ContentMoto from './ContentMoto.js';

export default class App {
  constructor(parent) {
    this.parent = parent;
    this.header = new Header(parent);
    this.carousel = new Carousel(parent);
    this.content = new Content(parent);
    this.contentmoto = new ContentMoto(parent);
    this.details = new  Details(parent);
    this.detailsmoto = new  DetailsMoto(parent);
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

    switch(this.url.split('/')[0]) {
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

        case 'motos':
            document.title = 'Motos';
            this.header.render();
            this.contentmoto.render();
            break;

      case 'details':
        const id = this.url.split('/')[1];
        if(id === undefined) {
          window.location = 'http://localhost:8080/#accueil';
        }
        document.title = 'Détails'
        this.header.render();
        this.details.render(id);
        break;


        case 'detailsmoto':
            const idm = this.url.split('/')[1];
            if(idm === undefined) {
                window.location = 'http://localhost:8080/#accueil';
            }
            document.title = 'DétailsMoto'
            this.header.render();
            this.detailsmoto.render(idm);
            break;

      default:
        break;
    }
  }
};
