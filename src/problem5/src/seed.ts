import { Gender, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const seed = async () => {
    const users = [
        { name: 'Alice', email: 'alice@example.com', address: '123 Main St', gender: Gender.FEMALE },
        { name: 'Bob', email: 'bob@example.com', address: '456 Elm St', gender: Gender.OTHER },
        { name: 'Charlie', email: 'charlie@example.com', address: '789 Oak St', gender: Gender.MALE},
        { name: 'Lisa', email: 'lisa@example.com', address: '789 Oak St', gender: Gender.FEMALE},
        { name: 'Chad', email: 'chad@example.com', address: '789 Ho Chi Minh City', gender: Gender.MALE},
        { name: 'Jessica', email: 'jessica@example.com', address: '789 Ha Noi', gender: Gender.FEMALE}
    ]
    const user = await prisma.user.createMany({
        data: users
    });
};

seed()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });