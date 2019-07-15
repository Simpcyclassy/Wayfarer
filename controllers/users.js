import securePassword from '../helpers/password';
import Model from '../models/connection';
import { createToken } from '../helpers/token';


class User {
    static model() {
    return new Model('users');
    }

    static async signUp(req, res) {
      try {
        const {
          email, first_name, last_name
        } = req.body;

        let { password } = req.body;
        const token = createToken({
          email, first_name, last_name
        });
        password = securePassword.hashPassword(password);
        const rows = await User.model().insert(
          `email, first_name, last_name, password`,
          `'${email}', '${first_name}', '${last_name}', '${password}'`
        );

        return res.status(201).json({
          status: 'success',
          data: {
            token,
            id: rows[0].id,
            email: rows[0].email,
            first_name: rows[0].first_name,
            last_name: rows[0].last_name
          }
        });

      } catch (e) {
        return res.status(500).json({
          error: e.message
        })
      }
    }
}

export default User;

// const { Users } = models;

// export default {
//   signup: async (req, res) => {
//     const {
//       first_name, last_name, email
//     } = req.body;

//     password = securePassword.hashPassword(password);
//     const checkUserexist = Users.list.find(user => user.email === email);
//     if (checkUserexist) return res.jsend.fail('Email already exist');

//     const user = {
//       id: Users.list.length + 1,
//       first_name: checkUserexist[0].first_name,
//       last_name: checkUserexist[0].last_name,
//       email: checkUserexist[0].email,
//     };

//     // persist user to database
//     Users.create(user);

//     // sign jwt and wrap in a cookie
//     const token = jwt.sign({ userId: user.id }, process.env.SECRET_TOKEN);
//     res.cookie('token', token, { expires: new Date(Date.now() + 3600000), httpOnly: true });

//     return res.jsend.success(token);
//   },
// };
