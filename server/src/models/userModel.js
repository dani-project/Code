const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//==============================================================//
//                    Sample User Model                         //
//==============================================================//

// Prima ORM query to get all users
module.exports.getAllUsers = async () => {
  const users = await prisma.users.findMany();
  return users;
};