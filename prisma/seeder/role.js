const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const ROLE = [
  {
    id: 1,
    role: "SUPERADMIN",
    createdBy: "Super Duper Admin"
  },
  {
    id: 2,
    role: "ADMIN",
    createdBy: "Super Duper Admin"
  },
  {
    id: 3,
    role: "USER",
    createdBy: "Super Duper Admin"
  },
];

async function roleSeed() {

  await prisma.roles.deleteMany();


  return await prisma.roles.createMany({
    data: ROLE,
    skipDuplicates: true,
  });
}

// Run the seeding function
roleSeed()
  .then(() => {
    console.log("Roles seeded successfully!");
    prisma.$disconnect();
  })
  .catch((error) => {
    console.error("Error seeding roles:", error);
    prisma.$disconnect();
    process.exit(1);
  });

module.exports = roleSeed;
