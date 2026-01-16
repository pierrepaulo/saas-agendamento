import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { ServicesContent } from "./_components/service-content";
import { Suspense } from "react";

export default async function Services() {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    redirect("/");
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ServicesContent userId={userId} />
    </Suspense>
  );
}
