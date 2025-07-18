import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  price: z.number().nonnegative(),
})

export const updateProductSchema = productSchema.partial()

export type ProductInput = z.infer<typeof productSchema>
