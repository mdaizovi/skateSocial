export const getInitialState = (fieldKeys) => {
  const state = {};
  fieldKeys.forEach((key) => {
    state[key] = '';
  });
  return state;
};

export const validateContent = (text) => {
  if (!text) {
    return "Can't be blank";
  }
};

export const validateLength = (text) => {
  if (text && text.length < 4) {
    return 'Must be 4 characters or more.';
  }
};

export const validateField = (validators, value) => {
  let error = '';
  validators.forEach((validator) => {
    const validationError = validator(value);
    if (validationError) {
      error = validationError;
    }
  });
  return error;
};

export const validateFields = (fields, values, validationSchema) => {
  const errors = {};
  //const fieldKeys = Object.keys(fields);
  data = fieldValues(fields, values);
  try {
    validationSchema.validateSync(data, { abortEarly: false });
    return {}
  } catch (e) {
    //console.log(JSON.stringify(e, null, 2));
    const errorList = e.inner;
    for (const element of errorList) { // You can use `let` instead of `const` if you like
      let path = element.path;
      let message = element.message;
      errors[path] = message;
    }
    
  }
  return errors;
};


export const fieldValues = (fields, values) => {
  const fieldValueDict = {};
  const fieldKeys = Object.keys(fields);
  fieldKeys.forEach((key) => {
    const field = fields[key];
    const value = values[key];
    fieldValueDict[key] = value
  });

  return fieldValueDict;
};


export const hasValidationError = (errors) => {
  return Object.values(errors).find((error) => error.length > 0);
};