const { workerData, parentPort, Worker } = require("worker_threads")
const { from, to, matA, matB } = workerData;


// const workerStartTime = new Date().getTime()


const workerStartTime = performance.now()
const matrixIterator = new Array(matA.length).fill([]).map(() => new Array(matB[0].length).fill(0))


  const res = []
  for (let i = from; i <= to; i++) {
    const arr = new Array(matrixIterator[0].length).fill(0)
    for (let j = 0; j <= matrixIterator[0].length - 1; j++ ) {
      for (let k = 0; k <= matrixIterator.length - 1; k++) {
        arr[j] += matA[i][k] * matB[k][j];
      }
      
    }
    res.push(arr)
  }


// const workerEndTime = new Date().getTime();
const workerEndTime = performance.now();
console.log(`worker from ${from} to ${to} finished in ${workerEndTime - workerStartTime} ms!`)

// parentPort.on('message', (type) => {
//   const { heap_size_limit } = v8.getHeapStatistics();
//   console.log(`[${type}] heap_size_limit: ${heap_size_limit}`);
// });

parentPort.postMessage({
  from,
  to,
  result: res,
  matA,
  matB,
  workerTime: workerEndTime - workerStartTime,
})
