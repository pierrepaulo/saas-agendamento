import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
import { getPermissionUserToReports } from "./_data-access/get-permissions-reports";

export default async function Reports() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await getPermissionUserToReports({ userId: session?.user?.id! });

  if (!user) {
    return (
      <main>
        <h1>Você não tem permissão para acessar essa pagina</h1>
        <p>Assine o plano PROFISSIONAL para ter acesso completo!</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Página de relatórios</h1>
    </main>
  );
}
