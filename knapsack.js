//Barang	Berat	Nilai
// B	3	12
// C	4	15
// A	1	8
const data = [{
    name: 'B',
    weight: 4,
    value: 12
  },
  {
    name: 'A',
    weight: 2,
    value: 8
  },
  {
    name: 'C',
    weight: 6,
    value: 15
  }
];

function knapsack01(data, maxWeight) {
  const dp = Array.from({
    length: data.length + 1
  }, () => Array.from({
    length: maxWeight + 1
  }, () => ({
    totalWeight: 0, // -1 means not calculated yet
    totalValue: 0,
    items: [],
  })));

  for (let i = 1; i <= data.length; i++) {
    const item = data[i - 1];

    for (let w = 1; w <= maxWeight; w++) {
      const previousRow = i - 1;
      const previousRowItem = dp[previousRow][w];

      // by default, always take previous row item
      dp[i][w] = previousRowItem;


      // if item weight fits, then calculate the remaining weight value + current row item value, then compare with previous row item
      if (item.weight <= w) {
        const remainingWeight = w - item.weight;
        const remainingWeightCombinationItem = dp[previousRow][remainingWeight];
        const remainingWeightCombinationItemValue = remainingWeightCombinationItem?.totalValue || 0;
        const remainingWeightCombinationItemWeight = remainingWeightCombinationItem?.totalWeight || 0;
        const newValue = item.value + remainingWeightCombinationItemValue;

        if (newValue > previousRowItem.totalValue) {
          const mergedCombinationItem = {
            totalWeight: item.weight + remainingWeightCombinationItemWeight,
            totalValue: newValue,
            items: [...remainingWeightCombinationItem?.items, item],
          }

          dp[i][w] = mergedCombinationItem;
        }
      }
    }
  }

  return dp[data.length][maxWeight];
}

function knapsack01Exact(data, maxWeight) {
  const bestCombination = knapsack01(data, maxWeight);

  if (bestCombination.totalWeight === maxWeight) {
    return bestCombination;
  }

  return null;
}

function knapsackUnbounded(data, maxWeight) {
  const dp = Array.from({ length: maxWeight + 1 }, () => ({
    totalWeight: 0,
    totalValue: 0,
    items: [],
  }));

  for (let w = 1; w <= maxWeight; w++) {
    for (const item of data) {
      if (item.weight <= w) {
        const remainingWeight = w - item.weight;
        const remainingWeightCombinationItem = dp[remainingWeight];
        const remainingWeightCombinationItemValue = remainingWeightCombinationItem?.totalValue || 0;
        const remainingWeightCombinationItemWeight = remainingWeightCombinationItem?.totalWeight || 0;
        const newValue = item.value + remainingWeightCombinationItemValue;

        if (newValue > dp[w].totalValue) {
          dp[w] = {
            totalWeight: item.weight + remainingWeightCombinationItemWeight,
            totalValue: newValue,
            items: [...remainingWeightCombinationItem?.items, item],
          }
        }
      }
    }
  }

  return dp[maxWeight];
}

console.log(knapsack01Exact(data, 6));

const data2 = [{
  name: 'B',
  weight: 4,
  value: 12
},
{
  name: 'A',
  weight: 3,
  value: 4
},
{
  name: 'C',
  weight: 6,
  value: 15
}
];
console.log(knapsackUnbounded(data2, 7));