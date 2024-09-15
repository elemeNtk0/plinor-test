import { z } from "zod";

export const ValidationSchema = z.object({
  title: z
    .string({ required_error: "Введите название" })
    .min(1, "Введите название"),
  description: z
    .string({ required_error: "Введите описание" })
    .min(1, "Введите описание"),

  size: z.coerce
    .number()
    .min(3, "Размер должен быть не менее 3") // Сообщение об ошибке для min
    .max(12, "Размер не может превышать 12"), // Сообщение об ошибке для max
});

export type ValidationType = z.infer<typeof ValidationSchema>;
