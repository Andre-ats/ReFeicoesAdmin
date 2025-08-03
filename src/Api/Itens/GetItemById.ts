import { API_URL } from "../API_URL";

export interface IGetItemById {
    Id: string
    Nome: string
    Categoria: string
    Descricao: string
    Preco: number
    Status: string
    Ingredientes: string[]
    UrlImagem: string[]
}

export async function GetItemById(id: string) {
    try {
        const response = await fetch(`${API_URL}/Item/GetItemById?ItemId=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        console.log(data)

        const dataInterface: IGetItemById[] = [{
            Id: data.item.id,
            Nome: data.item.nome,
            Categoria: data.item.categoriaItem,
            Descricao: data.item.descricao,
            Preco: data.item.preco,
            Status: data.item.status === false ? "Inativo" : "Ativo",
            Ingredientes: data.item.ingredientes,
            UrlImagem: data.item.urlImagem
        }];

        return dataInterface;
    } catch (error) {
        console.error('Erro ao buscar os itens:', error);
        throw error;
    }
}