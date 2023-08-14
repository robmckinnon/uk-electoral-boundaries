const findAdjacentPairs = require("./match");

test("leaves pair", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs(
    [[1], [0]],
    ["zero", "one"],
    null
  );

  expect(pairs).toStrictEqual([[0, 1]]);
  expect(unmatched).toStrictEqual([]);
  //   expect(appearsOnce).toStrictEqual([1, 2]);
});

test("ignores odd", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs(
    [
      [1, 2],
      [0, 2],
      [0, 1],
    ],
    ["zero", "one", "two"],
    null
  );
  expect(pairs).toStrictEqual([[0, 1]]);
  expect(unmatched).toStrictEqual([2]);
  //   expect(appearsOnce).toStrictEqual([1, 2, 3]);
});

test("respects pre-paired", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs(
    [
      [1, 2],
      [0, 2],
      [0, 1],
    ],
    ["zero", "one", "two"],
    [["one", "two"]]
  );
  expect(pairs).toStrictEqual([[1, 2]]);
  expect(unmatched).toStrictEqual([0]);
  //   expect(appearsOnce).toStrictEqual([1, 2, 3]);
});

test("ignores odd", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs(
    [
      [1, 2],
      [0, 2],
      [0, 1],
    ],
    ["zero", "one", "two"],
    null
  );
  expect(pairs).toStrictEqual([[0, 1]]);
  expect(unmatched).toStrictEqual([2]);
  //   expect(appearsOnce).toStrictEqual([1, 2, 3]);
});

//     0  - 2
//    / \
//   1 - 4
//   |
//   3 - 5
test("adds single first", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs(
    [[1, 2, 4], [0, 3, 4], [0], [1, 5], [0, 1], [3]],
    ["zero", "one", "two", "three", "four", "five"]
  );
  expect(pairs.includes([1, 2]));
  expect(pairs.includes([0, 4]));
  expect(pairs.includes([3, 5]));
  expect(unmatched).toStrictEqual([]);
  //    expect(appearsOnce).toStrictEqual([3]);
});
