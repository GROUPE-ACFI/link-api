import request from 'supertest';
import { APP_URL, ADMIN_EMAIL, ADMIN_PASSWORD } from '../utils/constants';

describe('Companies Module', () => {
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

  it('should create company', async () => {
    const payload = {
      name: 'ACME',
      legalForm: 'SARL',
      siren: '123456789',
      siret: '12345678901234',
      tvaNumber: 'FRXX999999999',
      creationDate: new Date().toISOString(),
      isActive: true,
      email: 'company@example.com',
      phone: '0123456789',
    };
    return request(app)
      .post('/api/v1/companies')
      .auth(token, { type: 'bearer' })
      .send(payload)
      .expect(201)
      .expect(({ body }) => {
        expect(body.id).toBeDefined();
      });
  });
});
