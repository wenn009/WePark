const request = require('supertest');
const app = require('../../app');

describe('Test the home GET path', () => {
    test('It should response the GET index method', () => {
        return request(app).get('/').then(response => {
            expect(response.statusCode).toBe(200);
        })
    })
})