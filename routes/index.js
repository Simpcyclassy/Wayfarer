import {validateSingupCredentials} from '../middlewares/validate';
import users from '../controllers/users';

export default function(router) {
    router.post('/signup', validateSingupCredentials, users.signup);

    return router;
}
