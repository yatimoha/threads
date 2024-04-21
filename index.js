const crypto = require('crypto');
const express = require("express");
const app = express()

app.get("/crypto", async (req, res) => {
  const start = Date.now()
  
  await crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
    console.log(`1 end, ${Date.now() - start}ms`);
  })
  
  await crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
    console.log(`2 end, ${Date.now() - start}ms`);
  })
  
  await crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
    console.log(`3 end, ${Date.now() - start}ms`);
  })
  
  await crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
    console.log(`4 end, ${Date.now() - start}ms`);
  })
  
  await crypto.pbkdf2('password123', '1', 1000000, 64, 'sha512', () => {
    console.log(`5 end, ${Date.now() - start}ms`);
  })
  
  res.json("finished")
})

app.get("/issimple", async (req, res) => {
  const startTime = Date.now();
  const result = await findSimpleNums(parseInt(req.query.number));
  const endTime = Date.now();
  res.json({
    number: parseInt(req.query.number),
    isSimple: result,
    time: endTime - startTime + "ms",
  })
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
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

app.listen(3000, () => console.log("listening on port 3000"))


