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
          email, first_name, last_name, is_admin
        } = req.body;

        let { password } = req.body;
        const token = createToken({
          email, first_name, last_name, is_admin
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
            last_name: rows[0].last_name,
            is_admin: rows[0].is_admin
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
