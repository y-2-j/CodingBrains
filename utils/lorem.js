const lorem = require("lorem-ipsum");

module.exports = {
    word: () => lorem({ count: 1, units: "words" }),
    words: (count) => lorem({ count, units: "words" }),
    paragraph: (minSentences = 5) => lorem({ count: 1, units: "paragraph", paragraphLowerBound: minSentences })
};