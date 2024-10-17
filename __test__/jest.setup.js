// jest.setup.js
const server = require("../index");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const roleSeed = require('../prisma/seeder/role');
const userSeed = require('../prisma/seeder/user');

beforeAll(async () => {
  // Seed roles first to ensure they exist before creating users
  await roleSeed();
  await userSeed();
});


afterAll(async () => {
  await prisma.order.deleteMany();
  await prisma.cars.deleteMany();
  await prisma.users.deleteMany();
  await prisma.menus.deleteMany();
  await prisma.roles.deleteMany();
  await prisma.cars.deleteMany();

  server.close();
  console.log("end test");
})
