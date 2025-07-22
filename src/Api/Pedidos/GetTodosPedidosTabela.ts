import { API_URL } from "../API_URL";

export interface IGetTodosPedidosTabela {
    paginaAtual: number,
    quantidadePorPagina: number,
    totalPaginas: number,
    totalRegistros: number,
    dados: {
        id: string;
        compradorNome: string;
        compradorEmail: string;
        pagamentoStatus: string;
        somaPreco: number;
    }
}

export async function GetTodosPedidosTabela(parametro?: string) {
    try {
        const response = await fetch(API_URL + `/Pedido/GetTodosPedidos${parametro ? parametro : ""}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        const objPedido = {
            paginaAtual: data.paginaAtual,
            quantidadePorPagina: data.quantidadePorPagina,
            totalPaginas: data.totalPaginas,
            totalRegistros: data.totalRegistros,
            dados: data.dados.map((pedido: any) => {
                const somaPreco = pedido.itens.reduce((total: number, item: any) => {
                    return total + (item.preco * item.quantidade.quantidade);
                }, 0);

                return {
                    id: pedido.id,
                    compradorNome: pedido.compradorNome,
                    compradorEmail: pedido.compradorEmail,
                    pagamentoStatus: pedido.pagamento.status,
                    somaPreco: "R$ " + somaPreco.toFixed(2)
                };
            })
        };


        return objPedido;

    } catch (error) {

    }
}