# Northcoders News API

This API was created for the purpose of accessing application data programmatically. The intention here was to mimick the building of a real world backend service (such as reddit) which should provide this information to the front end architecture.

The database used was PSQL, and it was interact with by using [Knex](https://knexjs.org).

## Step 1 - Data

The data to be interacted with can be separated into 4 areas each with its own idiosyncracies and endpoints which are stored in separate psql tables:

- `topics`
- `articles`
- `users`
- `comments`

### Routes

A list of the available routes can be shown as follows:

```http
GET /api/topics
GET /api/users/:username
DELETE /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id
POST /api/articles/:article_id/comments
GET /api/articles/:article_id/comments
GET /api/articles
POST /api/articles
PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id
GET /api
DELETE /api/articles/:article_id
POST /api/topics
```

_**All endpoints send their responses in an object, with a key name of what it is that is being sent. E.g.**_

```json
{
  "topics": [
    {
      "description": "Code is love, code is life",
      "slug": "coding"
    },
    {
      "description": "FOOTIE!",
      "slug": "football"
    },
    {
      "description": "Hey good looking, what you got cooking?",
      "slug": "cooking"
    }
  ]
}
```

Details of the requests are given below:

---

```http
GET /api/topics
```

Responds with

- an array of topic objects, each of which should have the following properties:
  - `slug`
  - `description`

---

```http
GET /api/users/:username
```

Responds with

- a user object which should have the following properties:
  - `username`
  - `avatar_url`
  - `name`

---

```http
GET /api/articles/:article_id
```

Responds with

- an article object, which should have the following properties:

  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `body`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

---

```http
PATCH /api/articles/:article_id
```

Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -100 }` would decrement the current article's vote property by 100

Responds with

- the updated article

---

```http
POST /api/articles/:article_id/comments
```

Request body accepts

- an object with the following properties:
  - `username`
  - `body`

#### Responds with

- the posted comment

---

```http
GET /api/articles/:article_id/comments
```

Responds with

- an array of comments for the given `article_id` of which each comment should have the following properties:
  - `comment_id`
  - `votes`
  - `created_at`
  - `author` which is the `username` from the users table
  - `body`

Accepts queries

- `sort_by`, which sorts the comments by any valid column (defaults to created_at)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

---

```http
GET /api/articles
```

Responds with

- an `articles` array of article objects, each of which should have the following properties:
  - `author` which is the `username` from the users table
  - `title`
  - `article_id`
  - `topic`
  - `created_at`
  - `votes`
  - `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

Should accept queries

- `sort_by`, which sorts the articles by any valid column (defaults to date)
- `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)
- `author`, which filters the articles by the username value specified in the query
- `topic`, which filters the articles by the topic value specified in the query

---

```http
PATCH /api/comments/:comment_id
```

Request body accepts

- an object in the form `{ inc_votes: newVote }`

  - `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current comment's vote property by 1

  `{ inc_votes : -1 }` would decrement the current comment's vote property by 1

Responds with

- the updated comment

---

```http
DELETE /api/comments/:comment_id
```

Should delete a comment

- delete the given comment by `comment_id`

Responds with

- status 204 and no content

---

```http
GET /api
```

Responds with

- JSON describing all the available endpoints on your API
