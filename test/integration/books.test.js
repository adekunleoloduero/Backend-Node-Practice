const request = require('supertest');
const httpServer = require('../../src/index');

console.log(httpServer);

describe('Books routes', () => {
    it('Test /book (GET)', async () => {
        const response = await request(httpServer).get('/books');
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toBe('application/json');
        expect(response.body.length).toBe(9);
    });
});