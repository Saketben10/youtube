import { trpc } from "../trpc/server";
export default async function Home() {
  const data = await trpc.groom({ text: "hey hey hey" });

  return <div> this is data from server : {data.greeting} </div>;
}
