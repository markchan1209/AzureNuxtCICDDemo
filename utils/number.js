export function formatMoneyInt(val) {
  try {
    var parts = val.toString().split('.')[0]
    parts = parts.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return parts
  } catch (e) {
    return ''
  }
}

export const toFixed = (value, offset = 2) => {
  // 為什麼要多創一個toFixed?
  // 因為原生的toFixed 的四捨五入有bug
  // console.log((1.235).toFixed(2)) // 1.24, 預期為1.24 V
  // console.log((1.2345).toFixed(3)) // 1.234, 預期為1.235 X

  const number = Number(value)
  if (isNaN(number)) {
    console.warn('toFixed: 傳入的value 轉成數字失敗!')
    return value
  }
  if (typeof offset !== 'number') {
    console.warn('toFixed: 傳入的offset 僅可是數字!')
    return value
  }
  const rate = Math.pow(10, offset)

  return (Math.round(number * rate) / rate).toFixed(offset)
}

export const formatMoney = (value, { defaultValue = '-' } = {}) => {
  const number = Number(value)
  if (isNaN(number)) {
    console.warn('formatMoney: 傳入的value 轉成數字失敗!')
    return defaultValue
  }

  const [intNumber, floatNumber = ''] = value.toString().split('.')
  const hasDot = floatNumber ? '.' : ''
  return `${Number(intNumber).toLocaleString()}${hasDot}${floatNumber}`
}

// 整數加上逗號並截取小數點第 n 位數
export const formatNumberWithFixed = (number, fixed = 2) => {
  const validNumber = Number(number)
  if (fixed < 1) {
    // console.error('formatNumberWithFixed 第二個參數請大於 0')
    return formatMoneyInt(validNumber)
  }
  if (Number.isNaN(validNumber)) {
    return number
  } else {
    const [, numberFixed] = toFixed(validNumber, fixed).split('.')
    return formatMoneyInt(validNumber) + '.' + numberFixed
  }
}

// 加總 table 資料某個 key 值
export const countTableTotal = (tableData, key) => {
  return tableData
    .map(item => item[key])
    .reduce((prev, curr) => {
      const value = Number(curr)
      if (!isNaN(value)) {
        return prev + value
      } else {
        return prev
      }
    }, 0)
}
