const { Worker } = require("worker_threads")

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./src/worker/sumOfSimplesWorker.js", {
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

function splitWork(taskArr) {
  if (taskArr.length === 1) return runWorker(taskArr[0])
  const workers = taskArr.map((item) => runWorker(item))
  return Promise.all(workers)
}

function splitTask(number, threads) {
  const res = [];
  
  if (threads === 1) return res.push({
    start: 1,
    end: number,
  })
  
  for (let i = 1; i <= threads; i++) {
    const workerData = {
      start: Math.floor(number * ((i - 1) / threads) + 1),
      end: Math.floor(number * (i / threads)),
    }
    res.push(workerData)
  }
  
  return res
}


async function multiTread(req, res) {
    let number = 0;
    let threads = 1;
    if (req.query?.number) number = +req.query.number;
    if (req.query?.threads) threads = req.query.threads;
    const taskArr = splitTask(number, threads);
    const startTime = new Date().getTime();
    
    await splitWork(taskArr)
      .then((values) =>
          values.reduce((accumulator, part) => accumulator + part.result, 0)
      )
      .then((finalAnswer) => {
        const endTime = new Date().getTime();
        res
          .status(200)
          .json({
            number: number,
            sum: finalAnswer,
            timeTaken: (endTime - startTime) + " ms",
          })
        console.log('multi-thread ends in: ', (endTime - startTime) + " ms")
      })
      .catch((err) => {
        console.log(err)
        res.status(400).send()
      })
  }

module.exports = {
  multiTread
}

