import { bobDole, jimboJonesSlot, markCook } from "./seedData";

const { PrismaClient } = require('@prisma/client')
//@ts-ignore
const prisma = new PrismaClient()

const createEmployees = async () => {
  const employee1 = await prisma.employee.upsert({
    where: { id: 1 },
    create: bobDole,
    update: bobDole,
  })
  console.log('Created: ', employee1);
  const employee2 = await prisma.employee.upsert({
    where: { id: 2 },
    create: markCook,
    update: markCook,
  })
  console.log('Created: ', employee2);
}

const createBookedSlots = async () => {
  const bookedSlot1 = await prisma.booked_slot.upsert({
    where: { id: 1 },
    create: jimboJonesSlot,
    update: jimboJonesSlot,
  })
  console.log('Created: ', bookedSlot1);
}

async function main() {
  await createEmployees();
  await createBookedSlots();
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
