import z from "zod";

export const taskSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(3, "Judul minimal 3 karakter"),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"]).default("MEDIUM"),
  status: z
    .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .default("PENDING"),
  deadline: z.string().datetime("Deadline harus format ISO date").optional(),
  isFavorite: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  categoryId: z.number().optional(),
  labelIds: z.array(z.number()).optional(),
});

export type TaskDataSchema = z.infer<typeof taskSchema>;
