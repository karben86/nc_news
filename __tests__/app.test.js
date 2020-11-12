process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const connection = require("../db/data/connection");

describe("/api", () => {
  afterAll(() => connection.destroy());
  beforeEach(() => connection.seed.run());
  describe("/topics", () => {
    test("GET responds with 200 when topics is requested and format is correct", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          expect(res.body.topics).toEqual(expect.any(Array));
          expect(Object.keys(res.body.topics[0])).toEqual(
            expect.arrayContaining(["description", "slug"])
          );
          expect(res.body.topics.length).toBe(3);
        });
    });
    test("Invalid Methods - 405", () => {
      const invalidMethods = ["patch", "put", "delete"];
      const requestPromises = invalidMethods.map((method) => {
        return request(app)
          [method]("/api/topics")
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).toBe("Invalid method");
          });
        });
      return Promise.all(requestPromises);
    });
  });
  describe("missing route", () => {
    test("status 404 - all methods", () => {
      const allMethods = ["get", "post", "patch", "put", "delete"];
      const methodPromises = allMethods.map((method) => {
        return request(app)
          [method]("/missingRoute")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("Route not found");
          });
      });
      return Promise.all(methodPromises);
    });
  });
  describe("/users", () => {
    test("GET responds with 200 when user is requested and format is correct", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(({body}) => {
          expect(body.user[0]).toEqual({
            username: 'butter_bridge',
            avatar_url: 'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
            name: 'jonny'
          })
        });
    });
  });
  describe("/articles", () => {
    test("GET responds with 200 when article_id is requested and format is correct", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({body}) => {
          expect(body.articles[0]).toEqual({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            topic: 'mitch',
            author: 'butter_bridge',
            body: 'I find this existence challenging',
            comment_count: "13",
            created_at: "2018-11-15T12:21:54.171Z",
            votes: 100,
          },)
        });
    });
    test("GET - status 400 - bad requests", () => {
      return request(app)
        .get("/api/articles/dog")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("PATCH responds with status 200 - patched article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: -10 })
        .expect(200)
        .then(({ body }) => {
          expect(body.updatedArticle[0]).toEqual(
            {
              article_id: 1,
              title: 'Living in the shadow of a great man',
              body: 'I find this existence challenging',
              votes: 90,
              topic: 'mitch',
              author: 'butter_bridge',
              created_at: '2018-11-15T12:21:54.171Z'
            }
          );
        });
    });
    test("PATCH responds with status 400 - Bad Request - when no inc_votes are included", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("PATCH responds with status 400 - Bad Request - when inc_votes value is invalid", () => {
      return request(app)
      .patch("/api/articles/1")
      .send({inc_votes: "cat" })
      .expect(400)
      .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
      })
    });
    test("PATCH responds with status 400 - Bad Request - when multiple entries are sent", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({inc_votes : 1, name: 'Mitch'})
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    })
    test("DELETE responds with status 204 - deleted article", () => {
      return request(app)
        .delete("/api/articles/1")
        .expect(204)
        .then(() => {
          return connection
            .select("*")
            .from("articles")
            .where("article_id", "1");
        })
        .then((response) => {
          expect(response).toEqual([]);
        });
    });
  });
  describe("/comments", () => {
    test("POST responds with status 201 - created comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          body:
            "hello",
          username: 'butter_bridge',
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.newComment[0].body).toBe("hello");
          expect(body.newComment[0].article_id).toBe(1);
          expect(body.newComment[0].author).toBe('butter_bridge');
          expect(body.newComment[0].created_at).not.toBe(null);
          expect(body.newComment[0].comment_id).toBe(19);
        });
    });
    test("GET responds with 200 when comments are requested and format is correct - sorted by created_at in descending order by default", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((res) => {
          expect(res.body.comments).toEqual(expect.any(Array));
          expect(Object.keys(res.body.comments[0])).toEqual(
            expect.arrayContaining(["body", "article_id", "author", "created_at", "comment_id"])
          );
          expect(res.body.comments.length).toBe(13);
          expect(res.body.comments).toBeSortedBy("created_at", {descending: true})
        });
    });
    test("GET responds with 200 and with the data sorted by comment_id in ascending order according to a query", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment_id&&order=asc")
        .expect(200)
        .then((res) => {
          expect(res.body.comments).toBeSortedBy("comment_id")
        });
    });
    test("GET - status 400 - for non existent column", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=comment")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
  });
});