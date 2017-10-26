const request = require('supertest');
const garage = require('../../controllers/garages');

describe('Test the garage GET ALL path', () => {
    test('It should response the GET ALL method', () => {
        return request(garage).get('/').then(response => {
            expect(response.statusCode).toBe(200);
        })
    });
})

/*
describe('Test the garage GET ONE path', () => {
    let testingID = 7;
    test('It should response the GET ONE method', () => {
        return request(garage).get('/' + testingID).then(response => {
            expect(response).toBe({
                "id": 7,
                "Address": "007 2B Earth Avenue",
                "Renting_Price": 300,
                "Size": "95 x 105",
                "createdAt": "2017-10-25T23:30:57.247Z",
                "updatedAt": "2017-10-26T00:01:40.204Z",
                "UserId": null
            })
        })
    })
})


describe('Test the garage CREATE path', () => {
    test('It should response the CREATE ONE method', () => {
        return request(garage).post('/').then(response => {
            console.log(response);  // Testing
        })
    })
})


describe('Test the geolocation path', () => {
    test('It should response the latitude and longtitude', () => {
        return request(garage).post('geolocation').then(response => {
            response.accepted({'zip': '11220'}).then(response => {
                expect(response).toBe({
                    
                })
            })
        })
    })
})
*/