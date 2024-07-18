
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPost, updatePost } from "@avdhoothadke/medium-common";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_secret_key: string;
    },
    Variables: {
        userId: string;
        prisma: any
    }
}>();

postRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header('authorization') || "";
    try {
        const user = await verify(authHeader, c.env.JWT_secret_key);
        console.log("in middleware.")
        if (user) {
            c.set("userId", user.id)
            await next();
        } else {
            c.status(403);
            c.json({ message: "You are not logged in." })
        }
    } catch (error) {
        c.status(403);
        return c.json({ message: "Invalid jwt" })
    }

});

postRouter.post("/", async (c) => {
    const { title, content, image, publish } = await c.req.json();
    const { success } = createPost.safeParse({ title, content, image, publish });
    if (!success) {
        c.status(403);
        return c.json({ message: "Wrong input types." })
    }

    const authorId = c.get("userId");
    const prisma = c.get("prisma");
    try {
        console.log("in post")
        const post = await prisma.post.create({ data: { title, content, image, publish, authorId }, });
        return c.json({ post });
    } catch (error) {
        console.log(error)
        return c.json({ error, message: "Error while saving the post" })
    }

});

postRouter.put("/", async (c) => {
    const { id, title, content, image, publish } = await c.req.json();
    const { success } = updatePost.safeParse({ title, content, image, publish });
    if (!success) {
        c.status(403);
        return c.json({ message: "Wrong input types." })
    }

    const prisma = c.get("prisma");
    try {
        const post = await prisma.post.update({ where: { id }, data: { title, content, image, publish }, });
        return c.json({ post });
    } catch (error) {
        console.log(error)
        return c.json({ error, message: "Error while updating the post" })
    }
});

postRouter.get("/bulk", async (c) => {
    const prisma = c.get("prisma");
    console.log("in bulk");
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
        });
        return c.json({ posts });
    } catch (error) {
        return c.text("Error in fetching the posts.")
    }
});

postRouter.get("/:id", async (c) => {
    const id = c.req.param('id');
    const prisma = c.get("prisma");

    try {

        const post = await prisma.post.findFirst({
            where: { id }, include: {
                author: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
        });
        return c.json({ post });
    } catch (error) {
        return c.json({ error, message: "Could not get the post." })
    }

});



