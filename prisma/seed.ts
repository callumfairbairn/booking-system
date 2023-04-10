// import { bobDole, bumblebeeGuySlot, hankScorpioSlot, jimboJonesSlot, markCook, troyMcClureSlot } from "./seedData"

const seedData = require("./seedData");
const { PrismaClient } = require('@prisma/client')
//@ts-ignore
const prisma = new PrismaClient()

const employees = [
  seedData.bobDole,
  seedData.markCook,
]

const createEmployees = async () => {
  employees.forEach(async (thisEmployee, index) => {
    const employee = await prisma.employee.upsert({
      where: { id: index + 1 },
      create: thisEmployee,
      update: thisEmployee,
    })
    console.log('Created: ', employee);
  })
}

const bookedSlots = [
  seedData.jimboJonesSlot,
  seedData.troyMcClureSlot,
  seedData.bumblebeeGuySlot,
  seedData.hankScorpioSlot,
]

const createBookedSlots = async () => {
  bookedSlots.forEach(async (thisSlot, index) => {
    const bookedSlot = await prisma.booked_slot.upsert({
      where: { id: index + 1 },
      create: thisSlot,
      update: thisSlot,
    })
    console.log('Created: ', bookedSlot);
  })
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
