const request = require('supertest');
const home = require('../../controllers/home');

describe('Test the home GET path', () => {
    test('It should response the GET index method', () => {
        return request(home).get('/').then(response => {
            expect(response).toBe("Successful GET to home router");
        })
    })
})