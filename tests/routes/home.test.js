const request = require('supertest');
const axios = require('axios');
const app = require('../../app');
const URL = require('../../models/urlModel');

let server;
let shortUrl;

describe('/', () => {
  beforeEach(async () => {
    server = app.listen(process.env.PORT || 5000);
    await URL.create({ url: 'google.com' });
    ({ shortUrl } = await URL.findOne({ url: 'http://google.com' }));
  });
  afterEach(async () => {
    await server.close();
    await URL.deleteMany();
  });

  describe('GET /', () => {
    it('should render home.ejs', async () => {
      const res = await request(server).get('/');

      expect(res.status).toBe(200);
      expect(res.text).toContain('<title>URL Shortener</title>');
    });
  });

  describe('GET /favicon.ico', () => {
    it('should return favicon', async () => {
      const res = await request(server).get('/favicon.ico');

      expect(res.status).toBe(200);
    });
  });

  describe('GET /:id', () => {
    it('should return 404 if no page found with given short slug', async () => {
      const res = await request(server).get('/a1b2');

      expect(res.status).toBe(404);
      expect(res.text).toContain('<title>404 | URL Shortener</title>');
      expect(res.text).toContain('Can&#39;t find requested URL.');
    });

    it('should successfully redirect to another destination', async () => {
      const res = await axios.get(process.env.DOMAIN_NAME + shortUrl);

      expect(res.data).toContain('content="text/html');
      expect(res.status).toBe(200);
    });
  });
});
