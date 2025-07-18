import { API_URL } from "../API_URL";

interface IGetItens {
    Nome: string
    Categoria: string
    Preco: number
    Status: string
}

export async function GetItens() {
    try {
        const response = await fetch(API_URL + '/Item/GetItens', {
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

        const dataInterface: IGetItens[] = data.dados.map((item: any) => ({
            Id: item.id,
            Nome: item.nome,
            Categoria: item.categoriaItem,
            Preco: item.preco.toFixed(2),
            Status: item.status === false ? "Inativo" : "Ativo",
        }));

        return dataInterface;
    } catch (error) {
        console.error('Erro ao buscar os itens:', error);
        throw error;
    }
}