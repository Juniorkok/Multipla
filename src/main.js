import App from './App.js';

// Donnees
const voitures = [
  {
    nom: 'Mercedes Benz - C220',
    image: 'https://i.ebayimg.com/00/s/NjgzWDEwMjQ=/z/MPQAAOSwZwxa5hcM/$_86.JPG',
    datedeparution: '06/02/2018'
  },
  {
    nom: 'BMW - M2',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2018-bmw-m2-competition-99gallery-1526572314.jpg',
    datedeparution: '09/02/2018'
  },
  {
    nom: 'Lamborghini - LB48H',
    image: 'https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D2500%252C1406%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C900%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2018-12%252Faa317e20-0810-11e9-b7ed-7f967d1466d5%26client%3Da1acac3e1b3290917d92%26signature%3D1dbcbead82a2d92731a5683550abd27e1ad1a034&client=amp-blogside-v2&signature=d0760d5930565d869cc9eaddf1ccf9045e847c7d',
    datedeparution: '07/02/2018'
  }
];

const motos = [

    {
        nom: 'BMW K 1200 R',
        image: 'https://ridermagazine.com/wp-content/uploads/2011/09/2006_BMW_K1200R_left_side1.jpg',
        datedeparution: '19/02/2018'
    },
    {
        nom: 'MV Agusta F4 RR - 201 ch',
        image: 'http://www.lerepairedesmotards.com/img/dossiers/motos/top-10-des-motos-de-serie-les-plus-puissantes-mv-agusta-f4-rr_hd.jpg',
        datedeparution: '19/02/2018'
    },
    {
        nom: 'Kawasaki ZX-10R - 200 ch',
        image: 'http://www.lerepairedesmotards.com/img/dossiers/motos/top-10-des-motos-de-serie-les-plus-puissantes-kawasaki-zx10r_hd.jpg',
        datedeparution: '19/02/2018'
    }

];

// Stocker les donnes dans le localStorage
if(!localStorage.getItem('voitures')) {
  localStorage.setItem('voitures', JSON.stringify(voitures));
}
if(!localStorage.getItem('motos')) {
    localStorage.setItem('motos', JSON.stringify(motos));
}
// Initialiser l'application
const app = new App(document.getElementById('root'));
app.render();
