import jwt from 'jsonwebtoken';
import securePassword from '../helpers/password';
import models from '../models';

const { Users } = models;

export default {
  signup: async (req, res) => {
    const {
      first_name, last_name, email
    } = req.body;

    password = securePassword.hashPassword(password);
    const checkUserexist = Users.list.find(user => user.email === email);
    if (checkUserexist) return res.jsend.fail('Email already exist');

    const user = {
      id: Users.list.length + 1,
      first_name: checkUserexist[0].first_name,
      last_name: checkUserexist[0].last_name,
      email: checkUserexist[0].email,
    };

    // persist user to database
    Users.create(user);

    // sign jwt and wrap in a cookie
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN);
    res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    return res.jsend.success(token);
  },
};
