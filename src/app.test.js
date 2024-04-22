const app = require("./app")
const supertest = require("supertest")
const request = supertest(app);

describe("/test access crypto", () => {
  it("should return a response", async () => {
    const response = await request.get("/crypto")
    expect(response.status).toBe(200)
  })
})

describe("/test access issimple", () => {
  it("should return a response", async () => {
    const response = await request.get("/issimple?number=644029")
    expect(response.status).toBe(200)
  })
})

describe("/test single", () => {
  it("should return a response", async () => {
    const response = await request.get("/single-thread")
    expect(response.status).toBe(200)
  })
})

describe("/test multi", () => {
  it("should return a response", async () => {
    const response = await request.get("/multi-thread")
    expect(response.status).toBe(200)
  })
})