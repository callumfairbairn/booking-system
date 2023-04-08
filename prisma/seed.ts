const { PrismaClient } = require('@prisma/client')
//@ts-ignore
const prisma = new PrismaClient()

const createEmployees = async () => {
  const bobDole = await prisma.employee.create({
    data: {
      email: 'bob.dole@gmail.com',
      name: 'Bob Dole',
      phone_number: '0123456789',
    }
  })
  console.log('Created: ', bobDole);
  const markCook = await prisma.employee.create({
    data: {
      email: 'mark.cook@gmail.com',
      name: 'Mark Cook',
      phone_number: '1234567890',
    }
  })
  console.log('Created: ', markCook);
}

async function main() {
  await createEmployees();
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
