"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import z from "zod";

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "O id é obrigatorio" }),
});

type FromSchema = z.infer<typeof formSchema>;

export async function deleteService(formData: FromSchema) {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      error: "Falha ao deletar serviço",
    };
  }

  const schema = formSchema.safeParse(formData);
  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    await prisma.service.update({
      where: {
        id: formData.serviceId,
        userId: session?.user?.id,
      },
      data: {
        status: false,
      },
    });
    revalidatePath("/dashboard/services");
    return {
      data: "Serviço deletado com sucesso",
    };
  } catch (err) {
    return {
      error: "Falha ao deletar serviço",
    };
  }
}
