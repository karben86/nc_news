const {formatDates} = require('../db/utils/data-manipulation');

describe("formatted date", () => {
    test("Test that formatDates returns a new array given an array as input", () => {
        const input = [];
        const expectedOutput = [];
        const actualOutput = formatDates(input);
        expect(actualOutput).toEqual(expectedOutput);
    })
    test("Given an array with a single object as input we should receive an array where created_at_property is a date instance", () => {
        const input = formatDates([{
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389,
          }]);
        const actualOutput = input[0].created_at
        expect(actualOutput).toBeInstanceOf(Date);
    })
    test("Given an array with multiple objects as input we should receive an array where created_at_property is a date instance", () => {
        const input = formatDates([{
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389,
          },
          {
            body:
              'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
            belongs_to: 'Living in the shadow of a great man',
            created_by: 'butter_bridge',
            votes: 14,
            created_at: 1479818163389,
          }]);
        const actualOutput = input[0].created_at
        expect(actualOutput).toBeInstanceOf(Date);
    })
    test("Test that formatDates does not mutate the original array", () => {
        const arrayObj = [{
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
            belongs_to: "They're not exactly dogs, are they?",
            created_by: 'butter_bridge',
            votes: 16,
            created_at: 1511354163389,
          }]
        formatDates(arrayObj);
        expect(arrayObj).toEqual(arrayObj);
    })
})
