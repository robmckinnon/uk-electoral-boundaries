const findAdjacentPairs = require("./match");

test("leaves pair", () => {
  const { pairs, unmatched } = findAdjacentPairs(
    [[1], [0]],
    ["zero", "one"],
    null
  );

  expect(pairs).toStrictEqual([[0, 1]]);
  expect(unmatched).toStrictEqual([]);
  //   expect(appearsOnce).toStrictEqual([1, 2]);
});

test("ignores odd", () => {
  const { pairs, unmatched } = findAdjacentPairs(
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
});

test("respects pre-paired", () => {
  const { pairs, unmatched } = findAdjacentPairs(
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
});

test("ignores odd", () => {
  const { pairs, unmatched } = findAdjacentPairs(
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
});

//     0  - 2
//    / \
//   1 - 4
//   |
//   3 - 5
test("adds single first", () => {
  const { pairs, unmatched } = findAdjacentPairs(
    [[1, 2, 4], [0, 3, 4], [0], [1, 5], [0, 1], [3]],
    ["zero", "one", "two", "three", "four", "five"]
  );
  expect(pairs).toContainEqual([0, 2]);
  expect(pairs).toContainEqual([1, 4]);
  expect(pairs).toContainEqual([3, 5]);
  expect(pairs.length == 3);

  expect(unmatched).toStrictEqual([]);
});

//     0  - 2
//    / \
//   1 - 4
//   |
//   3 - 5
test("splits regions", () => {
  const { pairs, unmatched } = findAdjacentPairs(
    [[1, 2, 4], [0, 3, 4], [0], [1, 5], [0, 1], [3]],
    ["zero", "one", "two", "three", "four", "five"],
    [],
    ["A", "A", "B", "B", "B", "B"]
  );
  expect(pairs).toContainEqual([0, 1]);
  expect(pairs).toContainEqual([3, 5]);
  expect(pairs.length == 2);
  expect(unmatched).toStrictEqual([2, 4]);
});
