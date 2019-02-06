/**
 * Créer un element html
 *
 * @param {string}     type       type de balise ('div', 'input', 'h1'...)
 * @param {array}      classList  tableau de classes html
 * @param {attributes} attributes object d'attributs ('id', 'href', 'name', 'type'...)
 * @param {string}     innerHTML  valeur dans la balise <balise>valeur</balise>
 */
const createDOMElement = (type, classList = [], attributes = {}, innerHTML = '') => {
  // Creer l'element
  const element = document.createElement(type);

  // Ajouter les classes html
  classList.map(className => element.classList.add(className));

  // Affecter les attributes
  for(let attr in attributes) {
    element.setAttribute(attr, attributes[attr]);
  }

  // Inserer le contenu html dans la balise
  element.innerHTML = innerHTML;

  return element;
};

export { createDOMElement };
