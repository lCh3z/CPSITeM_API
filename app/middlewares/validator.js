class Validator {
  static get regex() {
    return {
      word: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]{3,}$/,
      email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
    return data !== undefined && data !== null && String(data).length;
  }

  static email(data) {
    return (Validator.regex.email.test(data));
  }

  static integer(data) {
    try {
      return parseInt(data);
    } catch (e) {
      return false;
    }
  }

  static unsigned(data) {
    return (Validator.regex.unsignedInteger.test(data));
  }

  static rfc(data) {
    return (Validator.regex.rfc.test(data));
  }

  static file(data) {
    return(Validator.regex.file.test(data));
  }

  static image(data) {
    return(Validator.regex.image.test(data));
  }

  static secret(data) {
    return(Validator.regex.secret.test(data));
  }

  static minNumber(min, toEval) {
    return (toEval >= min);
  }

  static maxNumber(max, toEval) {
    return (toEval <= max);
  }

  static minLength(min, toEval) {
    return (toEval.length >= min);
  }

  static maxLength(max, toEval) {
    return (toEval.length <= max);
  }

  static equal(secret, toEval) {
    return (secret === toEval);
  }

  static recValidation(req, res, next, input, error) {
    console.log('\nR', typeof (req));
    console.log('I', typeof (input));
    console.log('req', req);
    console.log('in', input);
    if (input && req) {
      if (Array.isArray(input) && Array.isArray(req)) {
        for (const element in input) {
          this.recValidation(req[element], res, next, input[element], error);
        }
      } else if (typeof (input) === 'object' && typeof (req) === 'object' && !Array.isArray(input) && !Array.isArray(req)) {
        Object.keys(input).forEach((k) => {
          let missing = true;
          Object.keys(req).forEach((l) => {
            console.log('\nK', k);
            console.log('L', l);
            if (k === l) {
              missing = false;
              if (!this.recValidation(req[l], res, next, input[k], error)) {
                missing = true;
              }
            }
          });
          if (missing) {
            if (Array.isArray(error.details[k])) {
              error.details[k].push(`${k} is missing or unexpected type`);
            } else {
              error.details[k] = [`${k} is missing or invalid type`];
            }
          }
        });
      } else if (typeof (input) === 'string' && input.length) {
        const validators = input.split(',');
        validators.forEach((rule) => {
          const sub_rule = rule.split(':');
          let flag = false;
          if (sub_rule.length === 2) {
            if (req && Validator[sub_rule[0]](sub_rule[1], req)) flag = true;
          } else {
            if (req && Validator[rule](req)) flag = true;
          }
          if (!flag) {
            if (Array.isArray(error.details[req])) {
              error.details[req].push(`${req} is not a valid ${input}`);
            } else {
              error.details[req] = [`${req} is not a valid ${input}`];
            }
          }
        });
      } else {
        return false;
      }
    } else if (input) {
      return false;
    }
    return true;
  }

  static purge(req, res, next, input, error) {
    if (req && input) {
      if (Array.isArray(req)) {
        for (const element in req) {
          this.purge(req[element], res, next, input[element], error);
        }
      } else if (typeof (req) === 'object') {
        Object.keys(req).forEach((k) => {
          let deletion = true;
          Object.keys(input).forEach((l) => {
            if (k === l) {
              deletion = false;
              this.purge(req[k], res, next, input[l], error);
            }
          });
          if (deletion) {
            delete req[k];
          }
        });
      }
    }
  }

  static  validate(req, res, next, rules, error) {
    error = {
      message: 'Validation Error',
      status: 409,
      details: {},
    };
    this.recValidation(req, res, next, rules, error);
    this.purge({ body: req.body, params: req.params }, res, next, rules);
    Object.keys(error.details).length ? next(error) : next();
  }
}

module.exports = Validator;
