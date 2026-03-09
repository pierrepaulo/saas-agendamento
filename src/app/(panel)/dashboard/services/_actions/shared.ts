import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import z from "zod";

const SERVICES_PATH = "/dashboard/services";

type ServiceActionUser = { userId: string };
type ActionError = { error: string };
type ParsedActionData<T> = { data: T };

export type ServiceActionResult<T> = {
  data?: T;
  error?: string;
};

export async function getServiceActionUser(
  errorMessage: string,
): Promise<ServiceActionUser | ActionError> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { error: errorMessage };
  }

  return { userId };
}

export function parseServiceActionData<T>(
  schema: z.ZodType<T>,
  formData: unknown,
): ParsedActionData<T> | ActionError {
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message || "Dados invalidos",
    };
  }

  return { data: parsed.data };
}

export function revalidateServices() {
  revalidatePath(SERVICES_PATH);
}
