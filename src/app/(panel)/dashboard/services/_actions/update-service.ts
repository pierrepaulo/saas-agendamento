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
  serviceId: z.string().min(1, { message: "O id do servico e obrigatorio" }),
  name: z.string().min(1, { message: "O nome do servico e obrigatorio" }),
  price: z.number().min(1, { message: "O preco do servico e obrigatorio" }),
  duration: z.number(),
});

type FromSchema = z.infer<typeof formSchema>;

export async function updateService(
  formData: FromSchema,
): Promise<ServiceActionResult<string>> {
  const user = await getServiceActionUser("Falha ao atualizar servico");
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
        name: parsed.data.name,
        price: parsed.data.price,
        duration: parsed.data.duration < 30 ? 30 : parsed.data.duration,
      },
    });

    revalidateServices();

    return {
      data: "Servico atualizado com sucesso",
    };
  } catch {
    return {
      error: "Falha ao atualizar servico",
    };
  }
}
