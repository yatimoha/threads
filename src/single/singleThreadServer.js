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
  let number = 0;
  if (req.query?.number) number = req.query.number
  const startTime = new Date().getTime()
  const sum = await sumOfSimples(number);
  const endTime = new Date().getTime()
  
  console.log('single-thread ends in: ', (endTime - startTime) + " ms")
  res.status(200)
    .json({
      number: number,
      sum: sum,
      timeTaken: (endTime - startTime) + " ms",
    })
}

module.exports = {
  singleThread
}
