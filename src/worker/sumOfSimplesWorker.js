const { workerData, parentPort } = require("worker_threads")
const start = workerData.start
const end = workerData.end

let sum = 0
let i, j
for (i = start; i <= end; i++) {
  for (j = 2; j <= i / 2; j++) {
    if (i % j === 0) {
      break
    }
  }
  if (j > i / 2) {
    sum += i
  }
}

parentPort.postMessage({
  start: start,
  end: end,
  result: sum,
})
