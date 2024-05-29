const crypto = require('crypto');
const express = require("express");
const app = express();
const { singleThread } = require("./single/singleThreadServer")
const { multiTread } = require("./multi/multhiThreadServer")
const { matrix } = require('./matrix/matrix');
const { matrixMath } = require('./matrix/matrix-math');

function cryproAsync(start) {
  
  const crypto1 = new Promise((resolve) => {
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`1 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  
  
  const crypto2 = new Promise((resolve) => {
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`2 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  
  const crypto3 = new Promise((resolve) => {
      console.log('alo vadim')
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`3 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  
  const crypto4 = new Promise((resolve) => {
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`4 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  
  const crypto5 =  new Promise(async (resolve) => {
      await crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`5 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  
  return Promise.all([crypto1, crypto2, crypto3, crypto4, crypto5])
}
app.get("/crypto", async (req, res) => {
  const start = Date.now();

  cryproAsync(start)
    .then(() => {
      const countTime = Date.now() - start;
      res.status(200).json(`finished in ${countTime}ms`)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send()
    })
  
})

const findSimpleNums = number => {
  return new Promise(resolve => {
    let isSimple = true
    for (let i = 3; i < number; i++) {
      if (number % i === 0) {
        isSimple = false
        break
      }
    }
    
    resolve(isSimple)
  })
}
app.get("/issimple", async (req, res) => {
  const startTime = Date.now();
  const result = await findSimpleNums(parseInt(req.query.number));
  const endTime = Date.now();
  
  res.status(200).json({
    number: parseInt(req.query.number),
    isSimple: result,
    time: endTime - startTime + "ms",
  })
})

app.get("/single-thread", singleThread)

app.get("/multi-thread", multiTread)

app.get("/matrix", matrix)

app.get("/matrix-math", matrixMath)

module.exports = app;