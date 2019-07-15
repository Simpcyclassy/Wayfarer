import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('User controller methods', () => {
    it('should add a new user account', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signup')
            .send({
                first_name: 'userFirstname', last_name: 'userLastname', email: 'user@mail.com', password: 'userPassword'
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
    it('should login a signed up user', (done) => {
        chai.request(app)
            .post('/api/v1/auth/signin')
            .send({
                email: 'user@mail.com', password: 'userPassword'
            })
            .end((err, res) => {
                expect(res.body).to.have.property('data');
                expect(res.body.data).to.have.property('id');
                expect(res.body.data).to.have.property('is_admin');
                expect(res.body.data).to.have.property('token');
                expect(res.status).to.equal(200);
                done();
            });
    });
});
