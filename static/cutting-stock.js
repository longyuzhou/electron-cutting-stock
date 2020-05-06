/**
 * 使用First Fit Decreasing算法求解装箱问题
 * 
 * @param {number} capacity 箱子容量
 * @param {number} gap 物品间距
 * @param {Array} items 所有物品的大小
 */
function firstFitDecreasing(capacity, gap, items) {
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
    const bin = bins.find(b => binSize(b) + gap + size <= capacity)
    // 如果有，则放入
    if (bin) {
      bin.push(size)
    }
    // 如果没有，则放入新箱子
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
  const padding = 0
  const items = []
  orders.reduce((p, c) => {
    for (let i = 0; i < c[1]; i++) {
      p.push(c[0])
    }
    return p
  }, items)
  const bins = firstFitDecreasing(capacity, padding, items)
  console.log(bins.length === 82)
}