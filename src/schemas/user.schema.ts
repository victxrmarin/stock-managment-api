import { z } from 'zod'

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  isAdmin: z.boolean().default(false),
})

export const updateUserSchema = userSchema.partial()


export type userInput = z.infer<typeof userSchema>