const type_check_v1 = (data, type) => {
  switch (typeof data) {
    case "number":
    case "string":
    case "boolean":
    case "undefined":
    case "function":
      return type === typeof data;
    case "object":
      switch (type) {
        case "null":
          return data === null;
        case "array":
          return Array.isArray(data);
        default:
          return data !== null && !Array.isArray(data);
      }

  }

  return false;
};

const type_check_v2 = (data, conf) => {
  for (let key of Object.keys(conf)) {
    switch (key) {
      case 'type':
        if (!type_check_v1(data, conf[key])) return false;
        break;
      case 'value':
        if (JSON.stringify(data) !== JSON.stringify(conf[key])) return false;
        break;
      case 'enum':
        let valid = false;
        for (let value of conf[key]) {
          valid = type_check_v2(data, { value });
          if (valid) break;
        }
        if (!valid) return false;
    }
  }

  return true;
};

const type_check = (data, conf) => {
  for (let key of Object.keys(conf)) {
    switch (key) {
      case 'type':
      case 'value':
      case 'enum':
        let newConf = {};
        newConf[key] = conf[key];
        if (!type_check_v2(data, newConf)) return false;
        break;
      case 'properties':
        for (let prop of Object.keys(conf[key])) {
          if (data[prop] === undefined) return false;
          if (!type_check(data[prop], conf[key][prop])) return false;
        }
        break;
    }
  }

  return true;
};

export {
  type_check,
  type_check_v1,
  type_check_v2
};
