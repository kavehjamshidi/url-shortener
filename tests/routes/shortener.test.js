const request = require('supertest');
const app = require('../../app');
const URL = require('../../models/urlModel');

let server;
let formInput;
describe('POST /api/shortener', () => {
  beforeEach(() => {
    server = app.listen(process.env.PORT || 5000);
  });
  afterEach(async () => {
    server.close();
    await URL.deleteMany();
  });

  const happyPath = () => {
    return request(server)
      .post('/api/shortener')
      .type('form')
      .send({ url: formInput });
  };

  it('should render error page with 400 status if url is empty', async () => {
    formInput = '';
    const res = await happyPath();
    const document = await URL.findOne({ url: `http://${formInput}` });

    expect(res.status).toBe(400);
    expect(document).toBe(null);
  });

  it('should render error page with 400 status if url is invalid', async () => {
    formInput = 'a';
    const res = await happyPath();
    const document = await URL.findOne({ url: `http://${formInput}` });

    expect(res.status).toBe(400);
    expect(document).toBe(null);
  });

  it('should render success page with 200 status if url is valid', async () => {
    formInput = 'google.com';
    const res = await happyPath();
    const document = await URL.findOne({ url: `http://${formInput}` });

    expect(res.status).toBe(201);
    expect(res.text).toContain('Success');
    expect(res.text).toContain(formInput);
    expect(document).toHaveProperty('url', `http://${formInput}`);
    expect(document).toHaveProperty('shortUrl');
  });
});
