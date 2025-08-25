import { API_URL } from "../API_URL";

export interface IGetPedidoById {
    pedidoByIdUsuariosCompradorDadosDto: {
        id: string;
        compradorNome: string;
        compradorEmail: string;
        statusPedido: string;
        itens: Array<{
            id: string;
            nome: string;
            descricao: string;
            preco: number;
            status: boolean;
            quantidade: number;
        }>;
        pagamento: {
            idPagamento: string;
            clientKey: string;
            pedidoId: string;
            valor: number;
            status: string;
            metodoPagamento: string;
        };
        endereco: {
            cep: string;
            logradouro: string;
            numero: number;
            bairro: string;
            cidade: string;
            complemento: string;
        };
    };
}

export async function GetPedidoById(id: string){
    try {
        const response = await fetch(`${API_URL}/Pedido/GetPedidoById?PedidoId=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = "/login"
                return
            }
            throw new Error("Erro na requisição");
        }

        const data = await response.json();
        const pedido = data.pedidoByIdUsuariosCompradorDadosDto;

        const pedidoFormatado: IGetPedidoById = {
            pedidoByIdUsuariosCompradorDadosDto: {
                id: pedido.id,
                compradorNome: pedido.compradorNome,
                compradorEmail: pedido.compradorEmail,
                statusPedido: pedido.statusPedido,
                itens: pedido.itens.map((item: any) => ({
                    id: item.id,
                    nome: item.nome,
                    descricao: item.descricao,
                    preco: item.preco.parsedValue ?? item.preco,
                    status: item.status,
                    quantidade: item.quantidade.quantidade
                })),
                pagamento: {
                    idPagamento: pedido.pagamento.idPagamento,
                    clientKey: pedido.pagamento.clientKey,
                    pedidoId: pedido.pagamento.pedidoId,
                    valor: pedido.pagamento.valor.parsedValue ?? pedido.pagamento.valor,
                    status: pedido.pagamento.status,
                    metodoPagamento: pedido.pagamento.metodoPagamento
                },
                endereco: {
                    cep: pedido.endereco.cep,
                    logradouro: pedido.endereco.logradouro,
                    numero: pedido.endereco.numero,
                    bairro: pedido.endereco.bairro,
                    cidade: pedido.endereco.cidade,
                    complemento: pedido.endereco.complemento,
                }
            }
        };

        return pedidoFormatado;

    } catch (error) {
        console.error("Erro ao buscar os itens:", error);
        throw error;
    }
}
