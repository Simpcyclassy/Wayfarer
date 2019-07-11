import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { Users } from '../models';

export default {
  signup: async (req, res) => {
    const {
      firstname, lastname, email, password
    } = req.body;

    const foundUser = Users.list.find(user => user.email === email);
    if (foundUser) return res.jsend.fail('Email address already exists.');

    const user = {
      id: Users.list.length + 1,
      firstname,
      lastname,
      email,
      password: await bcrypt.hash(password, 10)
    };

    Users.create(user);

    const token = jwt.sign({ userId: user.id }, process.env.SECRET);
    res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });

    return res.jsend.success(token);
  }
};
