import z from "zod";

export const signUpInput = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    password: z.string().min(6)
})

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const createPost = z.object({
    title: z.string(),
    content: z.string(),
    image: z.string().optional(),
    publish: z.boolean().optional()
})

export const updatePost = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    image: z.string().optional(),
    publish: z.boolean().optional()
})

export type SignUpInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type CreatePost = z.infer<typeof createPost>
export type UpdatePost = z.infer<typeof createPost>