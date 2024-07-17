import express from 'express';
import { Gender, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// CRUD routes

// Create
app.post('/users', async (req, res) => {
    const { name, email, address, gender } = req.body;
    try {
        if (!name ||!email ||!address ||!gender) {
            return res.status(400).json({ error: 'Bad request: Missing required fields' });
        }
        const convertGender = gender.toLowerCase() === "male" ? Gender.MALE : gender.toLowerCase() === "female" ? Gender.FEMALE : Gender.OTHER;
        const user = await prisma.user.create({
            data: { name, email,address, gender:convertGender },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error creating user' });
    }
});

// Read
app.get('/users', async (req, res) => {
    const {page_index,search, gender} = req.query;
    try {
        const pageIndex = typeof page_index === 'string' ? Number(page_index) : 1;
        const pageSize = 5;
        const searchStr = typeof search === 'string' ? search : '';
        const genderStr = typeof gender === 'string' ? gender : '';
        const where:any = {
            OR: [
                {
                    address:{
                        contains: searchStr,
                    }
                },
                {
                    name:{
                        contains: searchStr,
                    }
                },
            ]
        }
        if(gender){
            const convertGender = genderStr.toLowerCase() === "male" ? Gender.MALE : genderStr.toLowerCase() === "female" ? Gender.FEMALE : Gender.OTHER;
            where.gender = convertGender;
        }
        const users = await prisma.user.findMany({
            where,
            take:pageSize,
            skip: (pageIndex - 1) * pageSize,
        }
        );
        const totalRecord = await prisma.user.count({where})
        const totalPage = Math.ceil(totalRecord / pageSize)
        res.json({
            total_page: totalPage,
            total_record: totalRecord,
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server' });
    }
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: Number(id) },
    });
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, address, gender } = req.body;
    try {
        if (!name ||!email ||!address ||!gender) {
            return res.status(400).json({ error: 'Bad request: Missing required fields' });
        }
        const convertGender = gender.toLowerCase() === "male" ? Gender.MALE : gender.toLowerCase() === "female" ? Gender.FEMALE : Gender.OTHER;
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email,address, gender:convertGender },
        });
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error updating user' });
    }
});

// Delete
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting user' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
