const formatPercentage = (percentage: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  })

  return formatter.format(percentage)
}

export { formatPercentage }
