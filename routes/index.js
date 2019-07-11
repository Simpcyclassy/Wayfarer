import validator from '../middlewares/validator';
import users from '../controllers/users';

export default function(router) {
    router.post('/signup', validator.auth, users.signup);

    return router;
}