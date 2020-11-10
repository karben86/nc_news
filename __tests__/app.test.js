process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/data/connection");

describe("/api", () => {
  afterAll(() => connection.destroy());
  describe("/topics", () => {
    test("GET responds with 200 when topics is requested and format is correct", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          //  console.log(res.body)
          expect(res.body.topics).toEqual(expect.any(Array));
          expect(Object.keys(res.body.topics[0])).toEqual(
            expect.arrayContaining(["description", "slug"])
          );
          expect(res.body.topics.length).toBe(3);
        });
    });

    //<--------------->ERROR HANDLING<--------------->
    test('', () => {
      
    })
  });
});
