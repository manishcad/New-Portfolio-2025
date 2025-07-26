// src/lib/prisma.js
import { PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = globalThis

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    errorFormat: 'pretty',
  })
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Handle connection errors
prisma.$on('query', (e) => {
  if (process.env.NODE_ENV === 'development') {
    // console.log('Query:', e.query)
    // console.log('Params:', e.params)
    // console.log('Duration:', `${e.duration}ms`)
  }
})

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e)
})

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})

export default prisma
