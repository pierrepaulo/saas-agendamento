"use server";

import prisma from "@/lib/prisma";
import z from "zod";
import {
  getServiceActionUser,
  parseServiceActionData,
  revalidateServices,
  type ServiceActionResult,
} from "./shared";

const formSchema = z.object({
  serviceId: z.string().min(1, { message: "O id e obrigatorio" }),
});

type FromSchema = z.infer<typeof formSchema>;

export async function deleteService(
  formData: FromSchema,
): Promise<ServiceActionResult<string>> {
  const user = await getServiceActionUser("Falha ao deletar servico");
  if ("error" in user) {
    return user;
  }

  const parsed = parseServiceActionData(formSchema, formData);
  if ("error" in parsed) {
    return parsed;
  }

  try {
    await prisma.service.update({
      where: {
        id: parsed.data.serviceId,
        userId: user.userId,
      },
      data: {
        status: false,
      },
    });

    revalidateServices();

    return {
      data: "Servico deletado com sucesso",
    };
  } catch {
    return {
      error: "Falha ao deletar servico",
    };
  }
}
