import request from 'supertest';
import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';

describe('Contacts Module', () => {
  const app = APP_URL;
  let token: string;

  beforeAll(async () => {
    await request(app)
      .post('/api/v1/auth/email/login')
      .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })
      .then(({ body }) => {
        token = body.token;
      });
  });

  it('should create contact', async () => {
    const payload = {
      email: 'john@example.com',
      phone: '0123456789',
      firstname: 'John',
      lastname: 'Doe',
      birthdate: new Date().toISOString(),
      job: 'CEO',
    };
    return request(app)
      .post('/api/v1/contacts')
      .auth(token, { type: 'bearer' })
      .send(payload)
      .expect(201)
      .expect(({ body }) => {
        expect(body.id).toBeDefined();
      });
  });
});
