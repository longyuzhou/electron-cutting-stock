/**
 * First Fit Decreasing
 * 
 * @param {number} capacity apacity of bin
 * @param {number} gap gap between items（eg: item, gap, item, gap ... item）
 * @param {Array} items items' sizes
 */
function firstFitDecreasing(capacity, gap, items) {
  // all the bins
  const bins = []

  // calculate occupied space of bin
  const occupiedSpace = (bin) => {
    return bin.reduce((p, c) => p + c, 0) + (bin.length - 1) * gap
  }

  // sort items in non-increasing order of their sizes
  items.sort((x, y) => y - x)

  items.forEach(size => {
    // find the first bin that can accommodate the item
    const bin = bins.find(b => occupiedSpace(b) + gap + size <= capacity)
    // found, place the item
    if (bin) {
      bin.push(size)
    }
    // not found, place the item within a new bin
    else {
      bins.push([size])
    }
  })
  return bins
}

function testFirstFitDecreasing() {
  const orders = [
    [1380, 22],
    [1520, 25],
    [1560, 12],
    [1710, 14],
    [1820, 18],
    [1880, 18],
    [1930, 20],
    [2000, 10],
    [2050, 12],
    [2100, 14],
    [2140, 16],
    [2150, 18],
    [2200, 20],
  ]
  const capacity = 5600
  const gap = 0
  const items = []
  orders.reduce((p, c) => {
    for (let i = 0; i < c[1]; i++) {
      p.push(c[0])
    }
    return p
  }, items)
  const bins = firstFitDecreasing(capacity, gap, items)
  console.log(bins.length === 82)
}