const request = require('supertest');
const server = require('../index'); // Import server utama
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const testUser = {
  email: "test@test.com",
  password: "Password1!",
};

describe("POST /api/v1/auth/signup", () => {
  it("should respond with 200 status code", async () => {
    const res = await request(server)
      .post("/api/v1/auth/signup")
      .send(testUser)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
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
        }),
      })
    );
  });

  it("should respond with 400 status code for invalid data", async () => {
    const res = await request(server)
      .post("/api/v1/auth/signup")
      .send({ email: "invalid-email", password: "" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    console.log(res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        code: 400,
        status: "Error",
        message: expect.arrayContaining([
          expect.objectContaining({
            path: "email",
            message: "\"email\" must be a valid email",
            type: "string.email",
          }),
          expect.objectContaining({
            path: "password",
            message: "\"password\" is not allowed to be empty",
            type: "string.empty",
          }),
        ]),
      })
    );
  });
});

describe("POST /api/v1/auth/signin", () => {
  it("should respond with 200 status code", async () => {
    const res = await request(server)
      .post("/api/v1/auth/signin")
      .send(testUser)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    console.log(res.body);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        code: 200,
        status: "success",
        message: "Sign in successfully",
        data: expect.objectContaining({
          user: {
            email: "test@test.com",
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
          token: expect.any(String),
        }),
      })
    );
  });

  it("should respond with 400 status code for invalid credentials", async () => {
    const res = await request(server)
      .post("/api/v1/auth/signin")
      .send({ email: "wrong@test.com", password: "wrongPassword!" })
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    console.log(res.body);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual(
      expect.objectContaining({
        code: 400,
        status: "Error",
        message: "Invalid email or password",
      })
    );
  });
});
