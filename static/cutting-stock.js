// best fit decreasing
cutting_stock = (capacity, padding, weights) => {
  // 由重到轻排列
  weights.sort((x, y) => y - x)

  // 所有的bin
  const bins = []

  // 数组中元素求和
  const sum_nums = (array) => {
    return array.reduce((p, c) => p + c, 0)
  }

  weights.forEach(w => {
    // 找到能放下的bin
    const bs = bins.filter(b => {
      const sum = b.reduce((p, v) => p + v, 0)
      return sum + b.length * padding + w <= capacity
    })
    // 如果没有，则再拿一个bin
    if (bs.length === 0) {
      bins.push([w])
    }
    // 如果有，则放到最重的那个bin中
    else {
      bs.sort((x, y) => sum_nums(x) - sum_nums(y)) // 由轻到重排列
      bs.pop().push(w)
    }
  })
  return bins
}

test_cutting_stock = () => {
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
  const weights = []
  orders.reduce((p, c) => {
    for (let i = 0; i < c[1]; i++) {
      p.push(c[0])
    }
    return p
  }, weights)
  const bins = cutting_stock(capacity, padding, weights)
  console.log(bins.length === 82)
}