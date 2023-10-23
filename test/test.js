/**
 * We have to do a bit of work upfront to allow the tests
 * to run in the browser and in Node.js. 
 */
let assert, expect;
let testItems = {};
if (typeof window === 'object') {
  // Run tests in browser
  assert = chai.assert;
  expect = chai.expect;
  mocha.setup('bdd');
  testItems = {
    highScore: typeof highScore !== 'undefined' ? highScore : undefined,
    myScrabbleTiles: typeof myScrabbleTiles !== 'undefined' ? myScrabbleTiles : undefined,
    removedTile: typeof removedTile !== 'undefined' ? removedTile : undefined,
    calculateScore: typeof calculateScore !== 'undefined' ? calculateScore : undefined,
    myScore: typeof myScore !== 'undefined' ? myScore : undefined,
  };
} else {
  // Run tests in Node.js
  assert = require('assert');
  expect = require('chai').expect;
  testItems = require('../script.js');
}

/**
 * Put all tests within this describe.
 */
describe('Automated tests', function () {

  describe(`highScore exists and is a number`, function () {
    it(`highScore exists and is a number`, function () {
      let { highScore } = testItems;
      expect(highScore).to.exist;
      expect(highScore).to.be.a('number');
    });
  });

  describe(`myScrabbleTiles exists and is an array`, function () {
    it(`myScrabbleTiles exists and is an array`, function () {
      let { myScrabbleTiles } = testItems;
      expect(myScrabbleTiles).to.exist;
      expect(myScrabbleTiles).to.be.an('array');
    });
  });

  describe(`removedTile is {tile: 'A', score: 1}`, function () {
    it(`removedTile is {tile: 'A', score: 1}`, function () {
      let { removedTile } = testItems;
      expect(removedTile).to.exist;
      expect(removedTile).to.be.an('object');
      expect({tile: 'A', score: 1}).to.deep.equal(removedTile);
    });
  });

  describe(`myScrabbleTiles is populated with the correct tile objects`, function () {
    it(`myScrabbleTiles is populated with the correct tile objects`, function () {
      let { myScrabbleTiles } = testItems;
      const correctScrabbleTiles = [
        { tile: 'N', score: 1 },
        { tile: 'K', score: 5 },
        { tile: 'Z', score: 10 },
        { tile: 'X', score: 8 },
        { tile: 'D', score: 2 },
        { tile: 'F', score : 4 }
      ];
      expect(myScrabbleTiles).to.exist;
      expect(myScrabbleTiles).to.be.an('array');
      expect(myScrabbleTiles).to.have.lengthOf(6)
      expect(myScrabbleTiles).to.deep.equal(correctScrabbleTiles);
    });
  });

  describe(`calculateScore returns the total score of an array of tile objects`, function () {
    it(`calculateScore returns the total score of an array of tile objects`, function () {
      let { myScrabbleTiles, calculateScore } = testItems;
      const alternateTiles = [
        { tile: 'P', score: 1 },
        { tile: 'R', score: 2 },
        { tile: 'I', score: 3 },
        { tile: 'M', score: 4 },
        { tile: 'E', score: 5 },
      ]
      expect(calculateScore(myScrabbleTiles), 'the function must return a value').to.exist;
      expect(calculateScore(myScrabbleTiles), 'the function must return a number').to.be.a('number');
      expect(calculateScore(myScrabbleTiles)).to.equal(30)
      // make sure the function isn't hardcoded to return 30:
      expect(calculateScore(alternateTiles)).to.equal(15)
    });
  });

  describe(`myScore exists and was calculated correctly`, function () {
    it(`myScore exists and was calculated correctly`, function () {
      let { myScore } = testItems;
      expect(myScore).to.exist;
      expect(myScore).to.be.a('number');
      expect(myScore).to.equal(30)
    });
  });

  describe(`highScore has been reassigned the value of 30`, function () {
    it(`highScore has been reassigned the value of 30`, function () {
      let { highScore } = testItems;
      expect(highScore).to.exist;
      expect(highScore).to.be.a('number');
      expect(highScore).to.equal(30)
    });
  });
  
});

/**
 * If running the tests in the browser, call mocha.run()
 */
if (typeof window === 'object') {
  console.log('blahblah')
    mocha.run();
}
