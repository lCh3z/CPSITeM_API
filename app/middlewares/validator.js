class Validator {
  static get regex() {
    return {
      word: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}$/,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      integer: /^[+-]?[0-9]+$/,
      unsigned: /^\d+(\.\d+)?$/,
      rfc: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
      file: /([a-zA-Z0-9\s_\\.\-\(\):])+(\.xml|\.pdf)$/,
      image: /([a-zA-Z0-9\s_\\.\-\(\):])+(\.jpg|\.jpeg|\.png)$/,
      secret: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)([a-zA-Z\d\W]{8,})/,
    };
  }

  static word(data) {
    return (Validator.regex.word.test(data));
  }

  static required(data) {
    return data !== undefined && data !== null && data.length;
  }

  static email(data) {
    return (Validator.regex.email.test(data));
  }

  static integer(data){
    return (Validator.regex.integer.test(data));
  }

  static unsigned(data){
    return (Validator.regex.unsignedInteger.test(data));
  }

  static rfc(data){
    return (Validator.regex.rfc.test(data));
  }

  static file(data){
    return(Validator.regex.file.test(data));
  }

  static image(data){
    return(Validator.regex.image.test(data));
  }

  static secret(data){
    return(Validator.regex.secret.test(data));
  }

  static minNumber(min, toEval){
    return (toEval < min);
  }

  static maxNumber(max, toEval){
    return (toEval > max);
  }

  static minMaxNumber(min, max, toEval){
    return (toEval < min && toEval > max);
  }

  static minLength(min, toEval){
    return (toEval.length >= min);
  }

  static maxLength(max, toEval){
    return (toEval.length <= max);
  }

  static minMaxLength(min, max, toEval){
    return (toEval.length >= min && toEval.length <= max);
  }

  static equal(secret, toEval){
    return (secret === toEval);
  }

  static validate(req, res, next, rules) {
    const error = {
      message: 'Validation Error',
      status: 409,
      details: {},
    };

    for (const element in rules) {
      for (const field in rules[element]) {
        if (Array.isArray(rules[element][field])){
          const subElements = rules[element][field];
          subElements.forEach((sub_element, index) => {
            for (const sub_field in sub_element) {
              const sub_validators = sub_element[sub_field].split(',');
              sub_validators.forEach((sub_f) => {
                if(req[element][field]){
                  req[element][field].forEach((item, pos) => {
                    if (!Validator[sub_f](item[sub_field])) {
                      if (Array.isArray(error.details[sub_field])) {
                        error.details[sub_field].push(`The field ${item[sub_field]} should be a valid ${sub_f}`);
                      } else {
                        error.details[sub_field] = [`The field ${item[sub_field]} should be a valid ${sub_f}`];
                      }
                    }
                  });
                }
              });
            }
          });
        } else if (typeof(rules[element][field]) === 'object') {
          console.log(rules[element][field]);
            const sub_element = rules[element][field];
            for (const sub_field in sub_element) {
              const sub_validators = sub_element[sub_field].split(',');
              sub_validators.forEach((sub_f) => {
                if (req[element][field] && !Validator[sub_f](req[element][field][sub_field])) {
                  if (Array.isArray(error.details[sub_field])) {
                    error.details[sub_field].push(`The field ${req[element][field][sub_field]} should be a valid ${sub_f}`);
                  } else {
                    error.details[sub_field] = [`The field ${req[element][field][sub_field]} should be a valid ${sub_f}`];
                  }
                }
              });
            }
        } else {
          const validators = rules[element][field].split(',');
          validators.forEach((f) => {
            if (req[element] && !Validator[f](req[element][field])) {
              if (Array.isArray(error.details[field])) {
                error.details[field].push(`The field ${field} should be a valid ${f}`);
              } else {
                error.details[field] = [`The field ${field} should be a valid ${f}`];
              }
            }
          });
        }
      }
    }
    Object.keys(error.details).length ? next(error) : next();
  }
}

module.exports = Validator;
