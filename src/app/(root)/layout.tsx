
import { redirect } from "next/navigation";
import data from "@/app/data.json";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cycles = data.cycles;

  const lastCycleId = cycles[cycles.length - 1].id

  console.log(lastCycleId)

  if (lastCycleId) {
    redirect(`/${lastCycleId}/overview`);
  } else {
    redirect("/cycles/new");
  }

  return (
    <>
      {children}
    </>
  )
}