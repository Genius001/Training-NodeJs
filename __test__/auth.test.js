const request = require('supertest')
const server = require('../index')
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { expect } = require('@jest/globals');

const testUser = {
  email: "test@test.com",
  password: "Password1!",
};

describe("POST /api/v1/auth/signup", () => {
  it("should response with 200 status code", () => {
    request(server)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(expect.objectContaining({
          code: 200,
          status: "success",
          message: "Sign up successfully",
          data: expect.objectContaining({
            user: {
              email: "test@test.com",
              password: expect.not.stringContaining("Password1!"),
              address: null,
              avatar: null,
              birthdate: null,
              driver_license: null,
              fullname: null,
              gender: null,
              phone_number: null,
              roleId: 3,
              createdBy: null,
              createdDt: expect.any(String),
              updatedBy: null,
              updatedDt: expect.any(String),
            },
          })
        }))
      })
  })
  it("should response with 400 status code", () => {

  })
});

afterAll(() => {
  server.close()
})
