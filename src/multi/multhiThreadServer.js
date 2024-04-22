const express = require("express")
const app = express()
const { Worker } = require("worker_threads")
function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./sumOfSimplesWorker.js", {
      workerData,
    })
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

function splitWork() {
  const start1 = 2
  const end1 = 15000
  const start2 = 15001
  const end2 = 30000
  const start3 = 30001
  const end3 = 45000
  const start4 = 45001
  const end4 = 60000
  
  const worker1 = runWorker({ start: start1, end: end1 })
  const worker2 = runWorker({ start: start2, end: end2 })
  const worker3 = runWorker({ start: start3, end: end3 })
  const worker4 = runWorker({ start: start4, end: end4 })
  
  return Promise.all([worker1, worker2, worker3, worker4])
}

app.get("/", async (req, res) => {
  const startTime = new Date().getTime()
  const sum = await splitWork()
    .then((values) =>
      values.reduce((accumulator, part) => accumulator + part.result, 0)
    )
    .then(finalAnswer => finalAnswer)
  
  const endTime = new Date().getTime()
  res.json({
    number: 60000,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + " seconds",
  })
})

app.listen(7777, () => console.log("listening on port 7777"))