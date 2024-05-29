const math = require('mathjs');

function multiplyMatrix(matrix) {
  console.log('matrix: ', matrix)
  
  const matA = new Array(matrix).fill(0).map(() => new Array(matrix).fill(0));
  const matB = new Array(matrix).fill(0).map(() => new Array(matrix).fill(0));
  
  // Рандомные значения для matA и matB
  for (let i = 0; i < matrix; i++) {
    for (let j = 0; j < matrix; j++) {
      matA[i][j] = Math.floor(Math.random() * 10);
      matB[i][j] = Math.floor(Math.random() * 10);
    }
  }
  
  const workerStartTime = performance.now()
  const res = math.multiply(matA, matB)
  const workerEndTime = performance.now();
  
  return {
    multipliedMatrix: res,
    time: workerEndTime - workerStartTime
  }
  
}
function matrixMath(req, res) {
  let matrix = 2;
  if (req.query?.matrix) matrix = req.query.matrix
  
  const { multipliedMatrix, time } = multiplyMatrix(+matrix)
  
  console.log("Multiplication of A and B");
  for (let i = 0; i < matrix; i++) {
    console.log(multipliedMatrix[i].join(" "));
  }
  
  res.status(200)
    .json({
      matrixLength: matrix,
      time: time,
      multiplied: JSON.stringify(multipliedMatrix),
    })
}

module.exports = {
  matrixMath
}
