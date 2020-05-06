/**
 * 求解装箱问题：将所有物品由大到小排序，然后使用Best-Fit算法求解
 * 
 * @param {number} capacity 箱子容量
 * @param {number} gap 物品间距
 * @param {Array} items 所有物品的大小
 */
function bestFitDecreasing(capacity, gap, items) {
  // 由大到小排列
  items.sort((x, y) => y - x)

  // 所有的箱子
  const bins = []

  // 计算箱子已使用的空间
  const binSize = (bin) => {
    return bin.reduce((p, c) => p + c, 0) + (bin.length - 1) * gap
  }

  items.forEach(size => {
    // 找到能放下当前物品的箱子
    const bs = bins.filter(b => {
      return binSize(b) + gap + size <= capacity
    })
    // 如果没有，则再拿一个新的箱子
    if (bs.length === 0) {
      bins.push([size])
    }
    // 如果有，则放到剩余空间最少的箱子中
    else {
      bs.sort((x, y) => binSize(x) - binSize(y)) // 箱子剩余空间有多到少排序
      bs.pop().push(size)
    }
  })
  return bins
}

function testBestFitDecreasing() {
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
  const padding = 0
  const items = []
  orders.reduce((p, c) => {
    for (let i = 0; i < c[1]; i++) {
      p.push(c[0])
    }
    return p
  }, items)
  const bins = bestFitDecreasing(capacity, padding, items)
  console.log(bins.length === 82)
}