import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_bKjFqEGdTaV42aGCOyYAGSOmHl-fW16991_I6u1pHI4dUexwFnlkHpACYhKeF42H",
});


export async function POST(request: Request) {
  const authorization = await auth()
  const user = await currentUser();

  if (!user || !authorization) {
    return new Response("Unauthorized", { status: 403 })
  }

  const { room } = await request.json()
}