const formatPercentage = (percentage: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  })

  return formatter.format(percentage)
}

const getPercentageByValue = (value: number, total: number) => (100 * value) / total

export { formatPercentage, getPercentageByValue }
