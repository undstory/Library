import { PrismaClient, Prisma, STATUS, CATEGORY, OWNER } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Aganieszka',
    email: 'cho@chochocho.pl',
    password: "123",
    books: {
      create: [
        {
          title: 'Join the MongoDB Community',
          author: "XYZ",
          status: STATUS.WAITING,
          category: CATEGORY.CLASSIC,
          owner: OWNER.OWN,
        },
      ],
    },
  },
  {
    name: 'bella',
    email: 'bella@ciao.pl',
    password: "123",
    books: {
      create: [
        {
            title: 'HEllo',
            author: "XYZ",
            status: STATUS.WAITING,
            category: CATEGORY.CLASSIC,
            owner: OWNER.OWN,
          },
      ],
    },
  }
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })