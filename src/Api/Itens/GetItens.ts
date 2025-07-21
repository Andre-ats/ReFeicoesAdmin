import { API_URL } from "../API_URL";

interface IGetItens {
    paginaAtual: number;
    quantidadePorPagina: number;
    totalPaginas: number;
    totalRegistros: number;
    itens: {
        Id: string;
        Nome: string;
        Categoria: string;
        Preco: string;
        Status: string;
    }[];
}

export async function GetItens(parametro?: string) {
    try {
        const response = await fetch(API_URL + `/Item/GetItens${parametro ? parametro : ""}`, {
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

        const dataInterface: IGetItens = {
            paginaAtual: data.paginaAtual,
            quantidadePorPagina: data.quantidadePorPagina,
            totalPaginas: data.totalPaginas,
            totalRegistros: data.totalRegistros,
            itens: data.dados.map((item: any) => ({
                Id: item.id,
                Nome: item.nome,
                Categoria: item.categoriaItem,
                Preco: "R$ " + item.preco.toFixed(2),
                Status: item.status === false ? "Inativo" : "Ativo",
            }))
        };

        return dataInterface;
    } catch (error) {
        console.error('Erro ao buscar os itens:', error);
        throw error;
    }
}