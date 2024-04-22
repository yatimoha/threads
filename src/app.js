const crypto = require('crypto');
const express = require("express");
const app = express();
const { singleThread } = require("./single/singleThreadServer")
const { multiTread } = require("./multi/multhiThreadServer")

function cryproAsync(start) {
  
  const crypto1 = () => {
    return new Promise((resolve) => {
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`1 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  }
  
  const crypto2 = () => {
    return new Promise((resolve) => {
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`2 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  }
  const crypto3 = () => {
    return new Promise((resolve) => {
      console.log('alo vadim')
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`3 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  }
  const crypto4 = () => {
    return new Promise((resolve) => {
      crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`4 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  }
  const crypto5 = () => {
    return new Promise(async (resolve) => {
      await crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
        console.log(`5 end, ${Date.now() - start}ms`);
        resolve()
      })
    })
  }

  return Promise.all([crypto1, crypto2, crypto3, crypto4, crypto5])
}
app.get("/crypto", async (req, res) => {
  const start = Date.now();
  
  await cryproAsync(start)

  const countTime = Date.now() - start;
  res.status(200).json(`finished in ${countTime}ms`)
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

module.exports = app;