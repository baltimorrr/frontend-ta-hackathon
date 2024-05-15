import numeral from 'numeral'

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00')
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%')
}

export function fNumber(number) {
  return numeral(number).format()
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '')
}

export function fData(number) {
  return numeral(number).format('0.0 b')
}

// https://gist.github.com/lanqy/5193417?permalink_comment_id=4379535#gistcomment-4379535
export function fFileSize(bytes) {
  const units = ['byte', 'kilobyte', 'megabyte', 'gigabyte', 'terabyte']
  const navigatorLocal =
    navigator.languages && navigator.languages.length >= 0
      ? navigator.languages[0]
      : 'en-US'
  const unitIndex = Math.max(
    0,
    Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  )

  return Intl.NumberFormat(navigatorLocal, {
    style: 'unit',
    unit: units[unitIndex],
  }).format(bytes / 1024 ** unitIndex)
}

export function fNumberWithDot(number) {
  try {
    const checkNumber = Number(number)
    if (Number.isNaN(checkNumber)) return 0

    return checkNumber.toLocaleString('it-IT')
  } catch (error) {
    return 0
  }
}
