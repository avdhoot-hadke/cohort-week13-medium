import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { postRouter, userRouter } from "./routes";

// import { createMiddleware } from 'hono/factory'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_secret_key: string;
  },
  Variables: {
    prisma: any
  }
}>();

//middleware
app.use(async (c, next) => {
  const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL, }).$extends(withAccelerate());
  c.set("prisma", prisma);
  await next();
})

app.route("/api/v1/user", userRouter);
app.route("/api/v1/post", postRouter);

export default app;
