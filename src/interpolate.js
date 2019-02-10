import prop_access from './prop-access.js';

String.prototype.interpolate = function(obj) {
  const regex = /{([^}]*)}/;
  const found = this.match(regex)[1].split('{ ')[1].trim();
  const value = prop_access(obj, found);
  return this.replace(`{${this.match(regex)[1]}}}`, value);
};
