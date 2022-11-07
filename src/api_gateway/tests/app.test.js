const request = require('supertest');
const { app, server } = require('../server');

describe('GET /ping', function () {
    it('responds with pokemon', async function () {
        const response = await request(app)
            .get('/ping')
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        server.close()
    });
});