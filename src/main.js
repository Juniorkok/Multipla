import App from './App.js';

// Donnees
const voitures = [
  {
    nom: 'Mercedes Benz - C220',
    image: 'https://i.ebayimg.com/00/s/NjgzWDEwMjQ=/z/MPQAAOSwZwxa5hcM/$_86.JPG'
  },
  {
    nom: 'BMW - M2',
    image: 'https://hips.hearstapps.com/hmg-prod/images/2018-bmw-m2-competition-99gallery-1526572314.jpg'
  },
  {
    nom: 'Lamborghini - LB48H',
    image: 'https://o.aolcdn.com/images/dims?quality=85&image_uri=https%3A%2F%2Fo.aolcdn.com%2Fimages%2Fdims%3Fcrop%3D2500%252C1406%252C0%252C0%26quality%3D85%26format%3Djpg%26resize%3D1600%252C900%26image_uri%3Dhttps%253A%252F%252Fs.yimg.com%252Fos%252Fcreatr-uploaded-images%252F2018-12%252Faa317e20-0810-11e9-b7ed-7f967d1466d5%26client%3Da1acac3e1b3290917d92%26signature%3D1dbcbead82a2d92731a5683550abd27e1ad1a034&client=amp-blogside-v2&signature=d0760d5930565d869cc9eaddf1ccf9045e847c7d'
  }
];

// Stocker les donnes dans le localStorage
if(!localStorage.getItem('voitures')) {
  localStorage.setItem('voitures', JSON.stringify(voitures));
}

// Initialiser l'application
const app = new App(document.getElementById('root'));
app.render();
