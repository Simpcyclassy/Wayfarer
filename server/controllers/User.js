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
        console.log(password);
        // const rows = await User.model().insert(
        //   `email, first_name, last_name, password`,
        //   `'${email}', '${first_name}', '${last_name}', '${password}'`
        // );
        
        return res.status(201).json({
          status: 'success',
          data: {
            token,
            // id: id,
            email: email,
            first_name: first_name,
            last_name: last_name
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
