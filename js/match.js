// var shuffle = require("lodash.shuffle");

function updateAppearsMore(pairs, neighbours, processedIds) {
  let match = false;
  return neighbours.map((neighbourIds, currentId) => {
    if (neighbourIds.length === 0 || processedIds.has(currentId)) {
      return [];
    } else if (neighbourIds.length > 1) {
      const neighbourId = neighbourIds[0];
      if (processedIds.has(neighbourId) || match) {
        return neighbourIds;
      } else {
        pairs.push([currentId, neighbourId].sort());
        processedIds.add(currentId);
        processedIds.add(neighbourId);
        match = true;
        return neighbourIds.slice(1);
      }
    } else {
      return neighbourIds.filter((id) => !processedIds.has(id));
    }
  });
}
function updateAppearsOnce(pairs, neighbours, processedIds) {
  return neighbours.map((neighbourIds, currentId) => {
    if (neighbourIds.length === 0 || processedIds.has(currentId)) {
      return [];
    } else if (neighbourIds.length === 1) {
      const neighbourId = neighbourIds[0];
      if (!processedIds.has(neighbourId)) {
        pairs.push([currentId, neighbourId].sort());
        processedIds.add(currentId);
        processedIds.add(neighbourId);
      }
      return [];
    } else {
      return neighbourIds.filter((id) => !processedIds.has(id));
    }
  });
}

function findAdjacentPairs(neighbours, ids, idPairs) {
  const allIds = new Set();
  neighbours.forEach((_, currentId) => allIds.add(currentId));
  const pairs = [];
  const processedIds = new Set();

  if (idPairs) {
    idPairs.forEach(([id1, id2]) => {
      const i1 = ids.indexOf(id1);
      const i2 = ids.indexOf(id2);
      pairs.push([i1, i2].sort());
      processedIds.add(i1);
      processedIds.add(i2);
      neighbours[i1] = neighbours[i1].filter((x) => x !== i2);
      neighbours[i2] = neighbours[i1].filter((x) => x !== i1);
    });
  }

  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsMore(pairs, neighbours, processedIds);

  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsMore(pairs, neighbours, processedIds);

  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsMore(pairs, neighbours, processedIds);

  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsMore(pairs, neighbours, processedIds);

  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
  neighbours = updateAppearsMore(pairs, neighbours, processedIds);

  let unmatched = Array.from(allIds).filter((id) => !processedIds.has(id));
  unmatched.forEach((x) => {
    neighbours = updateAppearsOnce(pairs, neighbours, processedIds);
    neighbours = updateAppearsMore(pairs, neighbours, processedIds);
  });

  return { pairs, unmatched };
}

// var out4 = findAdjacentPairs(n);
// out4.unmatched.length;

module.exports = findAdjacentPairs;
