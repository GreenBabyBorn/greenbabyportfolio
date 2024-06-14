import { PrismaClient } from "@prisma/client";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await new Argon2id().hash("123123");
  const userId = generateId(15);
  const user = await prisma.user.upsert({
    where: { username: "green" },
    create: {
      username: "green",
      id: userId,
      password: hashedPassword,
    },
    update: {},
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
