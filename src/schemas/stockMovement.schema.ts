import { z } from 'zod'

export const stockMovSchema = z.object({
  type: z.enum(['in', 'out']),
  amount: z.number().int().positive(),
  productId: z.number().int().nonnegative(),
})

export const updateStockMovSchema = stockMovSchema.partial()

export type stockMovInput = z.infer<typeof stockMovSchema>
