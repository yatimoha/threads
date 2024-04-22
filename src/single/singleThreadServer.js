async function sumOfSimples(n) {
  let sum = 0
  let i, j
  for (i = 2; i <= n; i++) {
    for (j = 2; j <= i / 2; j++) {
      if (i % j === 0) {
        break
      }
    }
    if (j > i / 2) {
      sum += i
    }
  }
  return sum
}

async function singleThread (req, res) {
  const startTime = new Date().getTime()
  const sum = await sumOfSimples(60000);
  const endTime = new Date().getTime()
  
  res.status(200)
    .json({
      number: req.query.number,
      sum: sum,
      timeTaken: (endTime - startTime) + " ms",
    })
}

module.exports = {
  singleThread
}
