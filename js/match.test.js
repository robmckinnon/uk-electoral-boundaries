const findAdjacentPairs = require("./match");

test("leaves pair", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs([[1, 2]]);

  expect(pairs).toStrictEqual([[1, 2]]);
  expect(unmatched).toStrictEqual([]);
  //   expect(appearsOnce).toStrictEqual([1, 2]);
});

test("ignores odd", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs([[1, 2, 3]]);
  expect(pairs).toStrictEqual([[1, 2]]);
  expect(unmatched).toStrictEqual([3]);
  //   expect(appearsOnce).toStrictEqual([1, 2, 3]);
});

test("adds single first", () => {
  const { pairs, unmatched, appearsOnce } = findAdjacentPairs([
    [1, 2, 3],
    [1, 2, 5],
    [4, 6],
  ]);
  expect(pairs[0]).toStrictEqual([2, 3]);
  expect(pairs[2]).toStrictEqual([1, 5]);
  expect(pairs[1]).toStrictEqual([4, 6]);
  expect(unmatched).toStrictEqual([]);
  //    expect(appearsOnce).toStrictEqual([3]);
});
