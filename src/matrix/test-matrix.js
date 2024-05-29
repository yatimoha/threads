const fs = require('node:fs');
const path = require('path');
const requests = []

for (let threads = 1; threads <= 8; threads += 1) {
      for (let matrixLen = 2; matrixLen <= 512; matrixLen += 16) {
        requests.push({
          url: `http://localhost:3000/matrix?threads=${threads}&matrix=${matrixLen}`,
          threads,
          matrixLen,
        })
      }
}

async function asyncFetch(callback) {
  const series = async () => {
    let results = '';
    for (let i = 0; i < requests.length; i++) {
      const { url, threads, matrixLen } = requests[i]
      const response = await fetch(url);
      const { maxWorkerTime, maxMemoryUsage } = await response.json()
      const resStr = `${threads} ${matrixLen} ${maxWorkerTime} ${maxMemoryUsage} `;
      results += resStr + '\n';
      console.log(`${threads} ${matrixLen} ${maxWorkerTime} ${maxMemoryUsage}`)
    }
    const dir = path.join(__dirname, 'data.txt')
    return fs.writeFile(dir, results, err => {
      if (err) {
        console.error(err);
      }
    })
  }
  const result = await series();
  callback(result);
}

asyncFetch(() => console.log('Done!'))
// logger.end()