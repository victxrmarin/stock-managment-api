import { Router } from 'express'
import { PrismaClient } from '../generated/prisma'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Error to get products' })
  }
})

export default router