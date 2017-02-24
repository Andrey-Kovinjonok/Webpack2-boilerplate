export function excludeField(obj, treePath) {
  if ((obj === undefined) || (treePath.length === 0)) {
    return obj;
  }

  const filteredObject = {};
  Object.keys(obj).map((field) => {
    if (field !== treePath[0]) {
      filteredObject[field] = obj[field];
    }
  });
  return (treePath.length === 1) ? filteredObject : {
    ...filteredObject,
    [treePath[0]]: excludeField(obj[treePath[0]], treePath.slice(1)),
  };
}

export function getField(obj, treePath) {
  if ((obj === undefined) || (treePath.length === 0)) {
    return obj;
  }

  if (treePath.length === 1) {
    return obj[treePath[0]];
  }
  const object = obj[treePath[0]] ? obj[treePath[0]] : {};
  return getField(object, treePath.slice(1));
}

export function setField(obj, treePath, value) {
  try {
    if ((obj === undefined) || (treePath.length === 0)) {
      return obj;
    }

    let result = {
      ...obj,
      [treePath[0]]: value,
    };

    if (treePath.length > 1) {
      const object = obj[treePath[0]] ? obj[treePath[0]] : {};
      result = {
        ...result,
        [treePath[0]]: setField(object, treePath.slice(1), value),
      };
    }
    return result;
  } catch (e) {
    console.log('E');
    console.log(e);
    return {};
  }
}
