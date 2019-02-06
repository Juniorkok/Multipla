const compare_objects = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2)

const type_check_v1 = (val, type) => {
  switch (type.toLowerCase()) {
    case 'array':
      return Array.isArray(val);
    case 'null':
      return val === null;
    case 'object':
      return !Array.isArray(val) && val !== null && typeof val === 'object';
    default:
      return typeof val === type;
  }
};

const type_check_v2 = (val, check) => {
  let ok = false;
  if (check.hasOwnProperty('type')) {
    ok = type_check_v1(val, check.type);
    if (!ok) return false;
  }
  if (check.hasOwnProperty('value')) {
    ok = typeof val === 'object' ? compare_objects(check.value, val) : check.value === val;
    if (!ok) return false;
  }
  if (check.hasOwnProperty('enum')) {
    ok = check.enum
      .find(enumVal => typeof enumVal === 'object' ?
        compare_objects(enumVal, val) :
        Object.is(enumVal, val)
      ) !== undefined;
    if (!ok) return false;
  }
  return ok;
};

const type_check = (val, check) => {
  if (check.hasOwnProperty('properties')) {
    return Object.entries(check.properties)
      .filter(([prop, propCheck]) => type_check(val[prop], propCheck))
      .length === Object.values(check.properties).length;
  }

  return type_check_v2(val, check);
};

export { type_check_v1, type_check_v2, type_check };
