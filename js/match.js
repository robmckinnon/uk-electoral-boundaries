var shuffle = require("lodash.shuffle");

function findAdjacentPairs(inputList) {
  let pairs;
  let processedIds;
  let unmatched;
  const allIds = new Set();
  const appearsOnceIds = new Set();

  inputList.forEach((regionIds) => {
    regionIds.forEach((id) => {
      if (allIds.has(id)) {
        appearsOnceIds.delete(id);
      } else {
        appearsOnceIds.add(id);
        allIds.add(id);
      }
    });
  });

  processedIds = new Set();
  pairs = [];

  for (const regionIds of shuffle(inputList)) {
    const filteredRegionIds = regionIds.filter(
      (regionId) => !processedIds.has(regionId)
    );
    for (let i = 0; i < filteredRegionIds.length - 1; i++) {
      const regionId1 = filteredRegionIds[i];
      const regionId2 = filteredRegionIds[i + 1];
      if (
        (appearsOnceIds.has(regionId1) || appearsOnceIds.has(regionId2)) &&
        !processedIds.has(regionId1) &&
        !processedIds.has(regionId2)
      ) {
        pairs.push([regionId1, regionId2]);

        // Mark the region IDs as processed
        processedIds.add(regionId1);
        processedIds.add(regionId2);
      }
    }
  }

  for (const regionIds of inputList) {
    const filteredRegionIds = regionIds.filter(
      (regionId) => !processedIds.has(regionId)
    );
    filteredRegionIds.forEach((id) => {
      if (allIds.has(id)) {
        appearsOnceIds.delete(id);
      } else {
        appearsOnceIds.add(id);

        allIds.add(id);
      }
    });
    for (let i = 0; i < filteredRegionIds.length - 1; i += 2) {
      const regionId1 = filteredRegionIds[i];
      const regionId2 = filteredRegionIds[i + 1];

      pairs.push([regionId1, regionId2]);

      // Mark the region IDs as processed
      processedIds.add(regionId1);
      processedIds.add(regionId2);
    }
  }

  unmatched = Array.from(allIds).filter((id) => !processedIds.has(id));
  unmatchedCount = unmatched.length;
  // while (unmatchedCount > 12) {
  // }

  const appearsOnce = Array.from(appearsOnceIds);

  return { pairs, unmatched, appearsOnce };
}

// var out4 = findAdjacentPairs(n);
// out4.unmatched.length;

module.exports = findAdjacentPairs;
