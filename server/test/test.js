import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('App', () => {
    it('should allow user to sign up', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'userFirstName', last_name: 'userLastName', email: 'user@mail.com', password: 'userPassword'
            })
            .end((err, res) => {
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('is_admin');
                expect(res.body.data).to.have.property('token');
                expect(res.status).to.equal(201);
                done();
            });
    });
});
