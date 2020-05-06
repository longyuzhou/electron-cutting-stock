/**
 * 执行材料切割，并输出结果（使用文本表格显示）
 * 
 * @param {number} material 材料长度
 * @param {number} losses 切割损耗
 * @param {Array} orders 订单（材料长度，所需数量）
 */
function cut_and_print(material, losses, orders) {
  // 订单二维数组转一维
  const detail = orders.reduce((p, c) => {
    range(c.count).forEach(() => p.push(c.length))
    return p
  }, [])
  // 调用材料分割算法
  const result = []
  firstFitDecreasing(material, losses, detail).forEach(a1 => {
    // 如果切割方案相同，则合并计数
    const items = result.filter(a2 => same_array(a1, a2.solution))
    if (items.length > 0) {
      items[0]['count']++
    } else {
      result.push({ solution: a1, count: 1 })
    }
  })

  // 打印输入参数
  let s = `材料长度：${material}\n切割损耗：${losses}\n订单：\n`
  let table = [['序号', '尺寸', '数量']]
  orders.forEach((order, i) => {
    table.push([i + 1, order.length, order.count])
  })
  size_fn = function (r, c, v) {
    size = `${v}`.length
    return r === 0 ? size * 2 : size
  }
  alignment_fn = function (r, c, v) {
    return c === 2 ? 'right' : 'left'
  }
  s += text_table(table, size_fn, alignment_fn)

  // 打印切割方案
  table = [['序号', '尺寸', '余料', '数量']]
  const waste = {}
  result.forEach((r, i) => {
    const solution = r.solution
    const w = Math.max(0, material - solution.reduce((a, c) => a + c, 0) - solution.length * losses)
    if (w > 0) {
      waste[w] = (waste[w] ? waste[w] : 0) + r.count
    }
    table.push([i + 1, solution.join(', '), w, r.count])
  })
  const total = result.reduce((prev, curr) => prev + curr.count, 0)
  alignment_fn = function (r, c, v) {
    return c === 2 || c === 3 ? 'right' : 'left'
  }
  s += `\n切割方法：共 ${total} 根材料\n` + text_table(table, size_fn, alignment_fn) + `\n余料：\n`

  // 打印余料详情
  table = [['序号', '余料', '数量']]
  alignment_fn = function (r, c, v) {
    return c === 0 ? 'left' : 'right'
  }
  let i = 1
  for (const k in waste) {
    if (waste.hasOwnProperty(k)) {
      table.push([i++, k, waste[k]])
    }
  }
  s += text_table(table, size_fn, alignment_fn)
  return s
}

/**
 * 判断两数组是否相等（不考虑数组内元素的顺序）
 */
function same_array(a1, a2) {
  if (a1.length != a2.length) {
    return false
  }
  a2 = a2.slice()
  for (let i = 0; i < a1.length; i++) {
    const pos = a2.indexOf(a1[i])
    if (pos > -1) {
      a2.splice(pos, 1)
    } else {
      return false
    }
  }
  return true
}

/**
 * 将二维数组输出为纯文本表格
 * 
 * @param {Array} data 二维数组
 * @param {Function} size_fn function(r, c, v) {} 单元格宽度（默认字符长度）
 * @param {Function} alignment_fn function(r, c, v) {} 单元格对齐方式（left、right）（默认左对齐）
 */
function text_table(data, size_fn, alignment_fn) {
  if (typeof size_fn !== 'function') {
    size_fn = function (r, c, v) {
      return `${v}`.length
    }
  }
  if (typeof alignment_fn !== 'function') {
    alignment_fn = function (r, c, v) {
      return 'left'
    }
  }

  const width = []
  data.forEach((row, r) => {
    row.forEach((cell, c) => {
      if (c + 1 > width.length) {
        width.push(0)
      }
      width[c] = Math.max(width[c], size_fn(r, c, cell))
    })
  })

  const border = '+-' + width.map(w => '-'.repeat(w)).join('-+-') + '-+'

  let s = ''
  data.forEach((row, r) => {
    s += border + '\n'
    row.forEach((cell, c) => {
      const alignment = alignment_fn(r, c, cell)
      s += '| '
      const repeat = width[c] - size_fn(r, c, cell)
      if (alignment === 'left') {
        s += cell
        s += ' '.repeat(repeat)
      } else {
        s += ' '.repeat(repeat)
        s += cell
      }
      s += ' '
    })
    s += '|\n'
  })
  s += border
  return s
}

/**
 * range(stop)，range(start, stop[, step])
 */
function range() {
  let start = 0
  let stop = 0
  let step = 1

  const size = arguments.length
  if (size === 1) {
    stop = arguments[0]
  } else if (size >= 2) {
    start = arguments[0]
    stop = arguments[1]
  } else if (size >= 3) {
    step = arguments[2]
  }

  const nums = []
  for (let i = start; i < stop; i = i + step) {
    nums.push(i)
  }
  return nums
}
