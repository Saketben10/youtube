// import { NextRequest } from "next/server";
// import { Webhook } from "svix";
// import { WebhookEvent } from "@clerk/nextjs/server";
// import { headers } from "next/headers";

// export async function POST(req: NextRequest) {
//   const SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     throw new Error(
//       "error Please add clerk signin secret from clerk daashboard to .env"
//     );
//   }

//   //create new svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET);

//   //GET HEADERS

//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_timestamp = headerPayload.get("svix-timestamp");
//   const svix_signature = headerPayload.get("svix-signature");

//   if (!svix_id || !svix_signature || !svix_timestamp) {
//     return new Response("Error :Misssing Svix Headers", {
//       status: 400,
//     });
//   }

//   //get body
//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   let evt: WebhookEvent;

//   //verify paylaod with headers
//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-signature": svix_signature,
//       "svix-timestamp": svix_timestamp,
//     }) as WebhookEvent;

//     // do something with payload

//     // for this guside, log paylaod to console

//     const { id } = evt.data;
//     const eventType = evt.type;
//     console.log(`Recieved webhook with id : ${id}and evet type ${eventType}`);
//     console.log("Webhook Paylaod", evt.data);

//     return new Response("Webhook Recieved", {
//       status: 200,
//     });
//   } catch (err) {
//     console.error("error : could not verify webhook", err);
//     return new Response("error verification error", {
//       status: 400,
//     });
//   }
// }

import { db } from "@/db";
import { users } from "@/db/schema";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console

    const eventType = evt.type;

    //user is being created
    if (eventType === "user.created") {
      const { data } = evt;
      await db.insert(users).values({
        clerkId: data.id,
        name: `${data.first_name} ${data.last_name}`,
        imageUrl: data.image_url,
      });
    }

    // user deleted
    if (eventType === "user.deleted") {
      const { data } = evt;
      if (!data.id) {
        return new Response("Missind user id", {
          status: 400,
        });
      }

      await db.delete(users).where(eq(users.clerkId, data.id));
    }

    // user updated
    if (eventType === "user.updated") {
      const { data } = evt;
      await db
        .update(users)
        .set({
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.image_url,
        })
        .where(eq(users.clerkId, data.id));
    }
    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
