// src/app/api/test-db/route.js

import prisma from '../../../lib/prisma'

export async function GET() {
  try {
    await prisma.$connect()
    return new Response('Successfully connected to database')
  } catch (error) {
    console.error('Database connection failed:', error)
    return new Response('Database connection failed', { status: 500 })
  }
}
