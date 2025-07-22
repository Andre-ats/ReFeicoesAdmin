import z from "zod";

export const schemaCriarItem = z.object({
    nome: z.string().min(1, "Nome não pode ser nulo!"),
    descricao: z.string().min(1, "Descrição não pode ser nula!"),
    preco: z.number().positive("Preço não pode ser menor ou igual a 0!"),
    status: z.boolean(),
    categoriaItem: z.string().min(1, "Categoria não pode ser nula!"),
    ingredientes: z.array(z.string()).nonempty("Ingredientes não podem estar vazios!"),
});