describe('Test the root path', () => {
    test('It should response the GET method', () => {
        return request(app).get('/').expect(201);
    })
})