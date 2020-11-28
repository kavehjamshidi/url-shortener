const request = require('supertest');

const app = require('../../app');

let server;

describe('GET /about', () => {
  beforeEach(() => {
    server = app.listen(process.env.PORT || 5000);
  });
  afterEach(async () => {
    await server.close();
  });

  it('should render about page', async () => {
    const res = await request(server).get('/about');

    expect(res.status).toBe(200);
  });
});
