import { Router } from 'express'
import {Request, Response} from 'express'
import { PrismaClient, Product } from '../generated/prisma'
import { productSchema, updateProductSchema } from '../schemas/products.schema'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await prisma.product.findMany()
    res.json(products)
  } catch (error) {
    res.status(500).json({ error: 'Error to get products' })
  }
})

//@ts-ignore
router.post('/', async (req: Request, res: Response) => {
  const result = productSchema.safeParse(req.body);

  if(!result.success) {
    return res.status(400).json({error: result.error.format()})
  }

  const {name, description, quantity, price} = result.data;

  const product: Product = await prisma.product.create({
    data: {name, description, quantity, price},
  })
 
  return res.status(201).json(product)
  }
)

//@ts-ignore
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if(isNaN(id)) {
    return res.status(403).json([{error: 'Id is not a number.'}])
  }

  const result = updateProductSchema.safeParse(req.body)

  if(!result.success) {
    return res.status(400).json({error: result.error.format()})
  }
  
  const product = await prisma.product.findUnique({where: {id: id}})

  if(!product) {
    return res.status(404).json({error: 'Product not found.'})
  }

   const updated = await prisma.product.update({
    where: { id },
    data: result.data,
  })

  return res.json(updated)
})

//@ts-ignore
router.delete('/:id', async (req: Request, res: Response) => {
  const productId: number = Number(req.params.id)

  const product = await prisma.product.findUnique({where: {id: productId}})

  if(!product) { return res.status(404).json({error: 'Product not found.'}) }

  await prisma.product.delete({where: {id: productId}})

  
  return res.status(204).send()

})

export default router