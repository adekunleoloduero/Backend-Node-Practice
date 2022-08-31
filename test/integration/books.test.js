const request = require('supertest');
const httpServer = require('../../src/index');
const { getDbPath } = require('../../src/utilities');
const path = require('path');

const toReplace = `${path.sep}test${path.sep}integration`;

const dbPath = getDbPath(toReplace, "text", "fixtures", "stubs");



// beforeAll(() => {
//     dbPath = dbPath.split(`${path.sep}integration`)[0];
//     dbPath = path.join(dbPath, "fixtures", "stubs");
// });



// describe('/Books routes', () => {
//     // it('Tests /book (GET)', async () => {
//     //     const response = await request(httpServer).get('/books');
//     //     expect(response.status).toBe(200);
//     //     expect(response.headers["content-type"]).toBe('application/json');
//     //     expect(response.body.length).toBe(9);
//     // });

//     it('Tests /books (DELETE)', async() => {
//         const id = 9;
//         const response = await request(httpServer).delete(`/books:${id}`);
//         expect(response.status).toBe(200);
//         expect(response.headers["conntent-type"]).toBe("application/json");
//         expect(response.headers.body).toBe(JSON.stringify({"message": "One (1) book deleted successfully."}));
//     });
// });

