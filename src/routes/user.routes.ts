import { Router } from 'express'
import {Request, Response} from 'express'
import { PrismaClient, User } from '../generated/prisma'
import { userSchema, updateUserSchema } from '../schemas/user.schema'

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const users : User[] = await prisma.user.findMany()
        const result = userSchema.safeParse(users)
        res.json(result)
      } catch (error) {
        res.status(500).json({ error: 'Error to get products' })
      }
})

//@ts-ignore
router.post('/', async (req: Request, res: Response) => {
  const result = userSchema.safeParse(req.body) 

  if(!result.success) {
    return res.status(400).json({error: result.error.format})
  }

  const {name, email, password, isAdmin} = result.data;

  const user: User = await prisma.user.create({
    data: {name, email, password, isAdmin},
  })

  return res.status(201).json(user)
})

//@ts-ignore
router.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id)

  if(isNaN(id)) {
    return res.status(403).json([{error: 'Id is not a number'}]);
  }

  const result = updateUserSchema.safeParse(req.body)

    if(!result.success) {
    return res.status(400).json({error: result.error.format()})
  }

  const user = await prisma.user.findUnique({where: {id: id}})

   if(!user) {
    return res.status(404).json({error: 'User not found.'})
  }

  const updated = await prisma.user.update({
    where: {id},
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