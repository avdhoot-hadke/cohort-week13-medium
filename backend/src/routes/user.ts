import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@avdhoothadke/medium-common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_secret_key: string;
    },
    Variables: {
        prisma: any
    }
}>();

userRouter.post('/signup', async (c) => {

    const { email, name, password } = await c.req.json();
    const { success } = signUpInput.safeParse({ email, name, password });
    if (!success) {
        c.status(403);
        return c.json({ message: "Wrong input types." })
    }

    const prisma = c.get("prisma")
    try {
        const user = await prisma.user.create({ data: { email, name, password }, });
        const token = await sign({ id: user.id }, c.env.JWT_secret_key);
        return c.json({ token, message: "Successfully signed up." });

    } catch (error) {
        console.log(error);
        c.status(403);
        return c.json({ error, message: "Invalid" });
    }
});


userRouter.post('/signin', async (c) => {
    const { email, password } = await c.req.json();
    const { success } = signInInput.safeParse({ email, password });
    if (!success) {
        c.status(403);
        return c.json({ message: "Wrong input types." })
    }

    const prisma = c.get("prisma")
    try {
        const user = await prisma.user.findFirst({ where: { email, password }, });

        if (!user) {
            c.status(403);
            return c.text("Invalid credentials")
        }

        console.log(user);
        const token = await sign({ id: user.id }, c.env.JWT_secret_key);
        return c.json({ token, message: "Successfully signed in" });

    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({ error, message: "Invalid" });
    }
});

export default userRouter;