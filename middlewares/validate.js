import Validator from 'validatorjs';

const errorMessages = {
  required: 'the :attribute is required',
  email: 'the email format is invalid',
  min: 'min :attribute limit is :min'
};

const validate = (req, res, next, rules) => {
  const validator = new Validator(req.body, rules, errorMessages);
  if (validator.passes()) {
    return next();
  }
  const errors = validator.errors.all();
  return res.status(400).json({
    message: 'all fields must be filled correctly',
    errors
  })
};

export const validateSignupCredentials = (req, res, next) => {
  const rules = {
    first_name: 'required|alpha',
    last_name: 'required|alpha',
    password: 'required|min:6',
    email: 'required|email'
  }
  return validate(req, res, next, rules);
};

export const validateSigninCredentials = (req, res, next) => {
  const rules = {
    password: 'required|min:6',
    email: 'required|email'
  }
  return validate(req, res, next, rules);
}; 


// import validationHelpers from '../helpers/validationHelpers';
// import { emailRegex, passwordRegex } from '../helpers/regexen';

// const { checkForEmptyFields, checkPatternedFields } = validationHelpers;

// export default {
//   auth: (req, res, next) => {
//     const errors = [];
//     const {
//       first_name, last_name, email, password
//     } = req.body;

//     if (req.path.includes('signup')) {
//       errors.push(...checkForEmptyFields('First name', first_name));
//       errors.push(...checkForEmptyFields('Last name', last_name));
//     }
//     errors.push(...checkPatternedFields('Email address', email, emailRegex));
//     errors.push(...checkPatternedFields('Password', password, passwordRegex));

//     if (errors.length) {
//       return res.jsend.error({
//         message: 'Your request contain errors',
//         data: errors
//       });
//     }
//     return next();
//   }
// };
