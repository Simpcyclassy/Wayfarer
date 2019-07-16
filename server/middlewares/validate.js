import Validator from 'validatorjs';

const errorMessages = {
    required: 'the :attribute is required',
    email: 'the email format is invalid',
    min: 'Min :attribute limit is :min'
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
    });
};

export const validateSingupCredentials = (req, res, next) => {
    const rules = {
        first_name: 'required|alpha',
        last_name: 'required|alpha',
        password: 'required|min:6',
        email: 'required|email'
    };
    return validate(req, res, next, rules);
};

export default { validateSingupCredentials };
