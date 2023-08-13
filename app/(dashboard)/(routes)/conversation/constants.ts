import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Zyada tez mat chl kuch likhega nhi toh bataunga kaise"
  })
});