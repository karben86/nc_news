const {
  formatDates,
  formatAuthor,
  formatTitle,
  createTitleRef,
} = require("../db/utils/data-manipulation");

describe("formatted date", () => {
  test("Test that formatDates returns a new array given an array as input", () => {
    const input = [];
    const expectedOutput = [];
    const actualOutput = formatDates(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
  test("Given an array with a single object as input we should receive an array where created_at_property is a date instance", () => {
    const input = formatDates([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ]);
    const actualOutput = input[0].created_at;
    expect(actualOutput).toBeInstanceOf(Date);
  });
  test("Given an array with multiple objects as input we should receive an array where created_at_property is a date instance", () => {
    const input = formatDates([
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Living in the shadow of a great man",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389,
      },
    ]);
    const actualOutput = input[0].created_at;
    expect(actualOutput).toBeInstanceOf(Date);
  });
  test("Test that formatDates does not mutate the original array", () => {
    const arrayObj = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389,
      },
    ];
    formatDates(arrayObj);
    expect(arrayObj).toEqual(arrayObj);
  });
});

//<-------------->FORMAT AUTHOR<-------------->

describe("formatAuthor", () => {
  test("Test that formatAuthor returns a new array given an array as input", () => {
    const input = [];
    const expectedOutput = [];
    const actualOutput = formatAuthor(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
  test("Given an array with a single object as input we should return an array with created_by property replace with Author", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ];
    const expectedOutput = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ];
    expect(formatAuthor(input)).toEqual(expectedOutput);
  });
  test("Given an array with multiple array objects as input we should return an array with created_by property replace with Author", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
      {
        body:
          "Facilis corporis animi et non non minus nisi. Magnam et sequi dolorum fugiat ab assumenda.",
        belongs_to: "Which current Premier League manager was the best player?",
        created_by: "tickle122",
        votes: 12,
        created_at: 1468201097851,
      },
    ];
    const expectedOutput = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
      {
        body:
          "Facilis corporis animi et non non minus nisi. Magnam et sequi dolorum fugiat ab assumenda.",
        belongs_to: "Which current Premier League manager was the best player?",
        author: "tickle122",
        votes: 12,
        created_at: 1468201097851,
      },
    ];
    expect(formatAuthor(input)).toEqual(expectedOutput);
  });
  test("Test that formatAuthor does not mutate the original array", () => {
    const arrayObj = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        created_by: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ];
    formatAuthor(arrayObj);
    expect(arrayObj).toEqual(arrayObj);
  });
});

//<-------------->FORMAT TITLE<-------------->

describe("formatTitle", () => {
  test("Test that formatTitle returns a new array given an array as input", () => {
    const input = [];
    const expectedOutput = [];
    const actualOutput = formatTitle(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
  test("Given an array with a single object as input we should return an array with belongs_to property replace with title", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ];
    const expectedOutput = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        title: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ];
    expect(formatTitle(input)).toEqual(expectedOutput);
  });
  test("Given an array with multiple array objects as input we should return an array with belongs_to property replaced with title", () => {
    const input = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
      {
        body:
          "Facilis corporis animi et non non minus nisi. Magnam et sequi dolorum fugiat ab assumenda.",
        belongs_to: "Which current Premier League manager was the best player?",
        author: "tickle122",
        votes: 12,
        created_at: 1468201097851,
      },
    ];
    const expectedOutput = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        title: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
      {
        body:
          "Facilis corporis animi et non non minus nisi. Magnam et sequi dolorum fugiat ab assumenda.",
        title: "Which current Premier League manager was the best player?",
        author: "tickle122",
        votes: 12,
        created_at: 1468201097851,
      },
    ];
    expect(formatTitle(input)).toEqual(expectedOutput);
  });
  test("Test that formatTitle does not mutate the original array", () => {
    const arrayObj = [
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256,
      },
    ];
    formatTitle(arrayObj);
    expect(arrayObj).toEqual(arrayObj);
  });
});

//<-------------->CREATETITLEREF<-------------->

describe("createTitleRef", () => {
  test("returns an empty object when passed an empty array", () => {
    const actual = createTitleRef([]);
    expect(actual).toEqual({});
  });
  test("returns an object with key of title and value of article_id", () => {
    const actual = createTitleRef([
      { title: "Running a Node App", article_id: 1 },
    ]);
    expect(actual).toEqual({ "Running a Node App": 1 });
  });
  test("returns object with multiple keys of title and value of article_id", () => {
    const actual = createTitleRef([
      { title: "Running a Node App", article_id: 1 },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        article_id: 2,
      },
    ]);
    expect(actual).toEqual({
      "Running a Node App": 1,
      "The Rise Of Thinking Machines: How IBM's Watson Takes On The World": 2,
    });
  });
  test("does not mutate original array", () => {
    const input = [
      { title: "Running a Node App", article_id: 1 },
    ]
    createTitleRef(input)
    expect(input).toEqual([
      { title: "Running a Node App", article_id: 1 },
    ]);
  });
});
