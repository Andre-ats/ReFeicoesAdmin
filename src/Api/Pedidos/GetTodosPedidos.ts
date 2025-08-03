import { API_URL } from "../API_URL";

export interface IGetTodosPedidos {
    paginaAtual: number;
    quantidadePorPagina: number;
    totalPaginas: number;
    totalRegistros: number;
    dados: Array<{
        id: string;
        compradorNome: string;
        compradorEmail: string;
        itens: Array<{
            id: string;
            nome: string;
            descricao: string;
            preco: number;
            status: boolean;
            quantidade: {
                quantidade: number;
            };
        }>;
        pagamento: {
            idPagamento: string;
            clientKey: string;
            pedidoId: string;
            valor: number;
            valorComTaxa: number;
            status: string;
        };
        endereco: {
            cep: string;
            logradouro: string;
            numero: number;
            bairro: string;
            cidade: string;
            complemento: string;
        };
    }>;
}

export async function GetTodosPedidos(parametro?: string) {
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

        const dataInterface: IGetTodosPedidos = {
            paginaAtual: data.paginaAtual,
            quantidadePorPagina: data.quantidadePorPagina,
            totalPaginas: data.totalPaginas,
            totalRegistros: data.totalRegistros,
            dados: data.dados.map((item: any) => ({
                id: item.id,
                compradorNome: item.compradorNome,
                compradorEmail: item.compradorEmail,
                itens: item.itens.map((itens: any) => ({
                    id: itens.id,
                    nome: itens.nome,
                    descricao: itens.descricao,
                    preco: itens.preco,
                    status: itens.status,
                    quantidade: {
                        quantidade: itens.quantidade.quantidade
                    }
                })),
                pagamento: {
                    idPagamento: item.pagamento.idPagamento,
                    clientKey: item.pagamento.clientKey,
                    pedidoId: item.pagamento.pedidoId,
                    valor: item.pagamento.valor,
                    valorComTaxa: item.pagamento.valorComTaxa,
                    status: item.pagamento.status
                },
                endereco: {
                    cep: item.endereco.cep,
                    logradouro: item.endereco.logradouro,
                    numero: item.endereco.numero,
                    bairro: item.endereco.bairro,
                    cidade: item.endereco.cidade,
                    complemento: item.endereco.complemento
                }
            }))
        };

        return dataInterface;

    } catch (error) {
        console.error('Erro ao buscar os itens:', error);
        throw error;
    }
}
