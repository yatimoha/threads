const {Worker, parentPort} = require('worker_threads');
const {availableParallelism} = require('node:os');
const { memoryUsage } = require('node:process');
const os = require('os');



async function multiplyMatrix(matrix, maxThreads) {
  if (maxThreads > matrix) maxThreads = matrix;
  console.log('maxThreads: ', maxThreads)
  console.log('matrix: ', matrix)
  
  // const matA = new Array(matrix).fill(0).map(() => new Array(matrix).fill(0));
  // const matB = new Array(matrix).fill(0).map(() => new Array(matrix).fill(0));
  //
  // // Рандомные значения для matA и matB
  // for (let i = 0; i < matrix; i++) {
  //   for (let j = 0; j < matrix; j++) {
  //     matA[i][j] = Math.floor(Math.random() * 10);
  //     matB[i][j] = Math.floor(Math.random() * 10);
  //   }
  // }

  const matA = [
    [3, 1, 2],
    [1, 5, 7],
    [6, 9, 6],
  ]
  const matB = [
    [0, 4, 4],
    [9, 7, 6],
    [4, 6, 1],
  ]
  //
  // const expectedMatrix = "[[17,31,20],[73,81,41],[105,123,84]]";
  

  
  // Распределение задач на потоки
  const threads = new Array(maxThreads).fill([]).map((item, index, arr) => {
    const workerData = {
      from: Math.floor( (matrix / maxThreads) * index),
      to: index !== arr.length - 1 ? Math.floor( (matrix / maxThreads) * (index + 1) - 1) : matrix - 1,
      matA,
      matB
    };
    // console.log(workerData);
    return runWorker(workerData)
  });
  
  
  return Promise.all(threads)

}

async function matrix(req, res) {
  let threads = 1;
  let matrix = 2;
  if (req.query?.threads) threads = req.query.threads
  if (req.query?.matrix) matrix = req.query.matrix
  
  const numCPUs = availableParallelism();
  console.log('numCPUs: ', numCPUs)
  
    const globalStartTime = performance.now()
    await multiplyMatrix(+matrix, +threads)
      .then((values) => {
        const { matA, matB } = values[0]
        const maxWorkerTime = Math.max(...values.map((item) => item.workerTime)).toFixed(3);
        const timeTaken = performance.now() - globalStartTime;
       
        const { heapTotal  }  = memoryUsage();
        const maxMemoryUsage = heapTotal / 1024 / 1024
        // console.log(maxMemoryUsage );
        
        const multipliedMatrix = values.reduce((accumulator, currentValue) => {
          currentValue.result.forEach((item) => accumulator.push(item))
          return accumulator
        }, [])
        
        // Вывод matA
        console.log("Matrix A");
        for (let i = 0; i < matA.length; i++) {
          console.log(matA[i].join(" "));
        }
        
        // Вывод matB
        console.log("Matrix B");
        for (let i = 0; i < matB.length; i++) {
          console.log(matB[i].join(" "));
        }
        
        console.log("Multiplication of A and B");
        for (let i = 0; i < matrix; i++) {
          console.log(multipliedMatrix[i].join(" "));
        }
        
        console.log('multiplying ends in: ', maxWorkerTime + " ms");
        res.status(200)
          .json({
            threads: threads,
            matrixLength: matrix,
            maxWorkerTime,
            maxMemoryUsage,
            commonTime: timeTaken,
            matrix1: matA,
            matrix2: matB,
            multiplied: JSON.stringify(multipliedMatrix),
          })
      })
      .catch((err) => {
        console.log(err)
      });
}

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./src/matrix/worker.js", { workerData })
    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

module.exports = {
  matrix
}
