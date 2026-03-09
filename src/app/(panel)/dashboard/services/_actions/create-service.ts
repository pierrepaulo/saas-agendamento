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
  name: z.string().min(1, { message: "O nome do servico e obrigatorio" }),
  price: z.number().min(1, { message: "O preco do servico e obrigatorio" }),
  duration: z.number(),
});

type FromSchema = z.infer<typeof formSchema>;

export async function createNewService(
  formData: FromSchema,
): Promise<
  ServiceActionResult<Awaited<ReturnType<typeof prisma.service.create>>>
> {
  const user = await getServiceActionUser("Falha ao cadastrar servico");
  if ("error" in user) {
    return user;
  }

  const parsed = parseServiceActionData(formSchema, formData);
  if ("error" in parsed) {
    return parsed;
  }

  try {
    const newService = await prisma.service.create({
      data: {
        name: parsed.data.name,
        price: parsed.data.price,
        duration: parsed.data.duration,
        userId: user.userId,
      },
    });

    revalidateServices();

    return {
      data: newService,
    };
  } catch {
    return {
      error: "Falha ao cadastrar servico",
    };
  }
}
