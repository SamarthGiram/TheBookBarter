const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const prisma = new PrismaClient({ log: ['error', 'warn'] });

async function test() {
  try {
    await prisma.$connect();
    console.log('DB Connected OK');
    const hash = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        name: 'Debug User',
        email: 'debug9999@test.com',
        password: hash,
        phone: '9999999999',
        location: 'Test City'
      }
    });
    console.log('User created SUCCESS:', user.id);
    await prisma.user.delete({ where: { id: user.id } });
    console.log('Cleaned up OK');
  } catch (e) {
    console.error('REGISTRATION ERROR:', e.message);
    console.error('Error code:', e.code);
    console.error('Meta:', JSON.stringify(e.meta));
    console.error('Full error:', e);
  }
  await prisma.$disconnect();
}

test().catch(console.error);
