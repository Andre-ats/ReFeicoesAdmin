import { useParams } from "react-router-dom";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { useEffect, useState } from "react";
import { GetPedidoById, IGetPedidoById } from "../../../Api/Pedidos/GetPedidoById";
import { Tabela } from "../../../Components/Tabela/Tabela";
import { PutStatusPedido } from "../../../Api/Pedidos/PutStatusPedido";

export function VerificarPedido() {
    const { id } = useParams();
    const [dados, setDados] = useState<IGetPedidoById["pedidoByIdUsuariosCompradorDadosDto"] | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const pedidoData = await GetPedidoById(id!);
                setDados(pedidoData.pedidoByIdUsuariosCompradorDadosDto);
            } catch (error) {
                console.error("Erro ao carregar o pedido:", error);
            }
        };

        fetchItem();
    }, [id]);

    async function handleMudarStatusPedido(status: string){
        await PutStatusPedido(dados?.id, status)
        window.location.reload()
    }

    if (!dados) {
        return <div className="text-center mt-10 text-gray-600">Carregando pedido...</div>;
    }

    const statusStyle: Record<string, string> = {
        "Pendente": "bg-gray-300 text-black",
        "Aprovado": "bg-amareloReFeicoes text-white",
        "Cancelado": "bg-red-500 text-white",
        "Entregue": "bg-green-500 text-white"
    };

    const pagamentoStatusStyle: Record<string, string> = {
        "approved": "bg-green-500 text-white",
        "pending": "bg-gray-300 text-white",
        "rejected": "bg-red-500 text-white",
        "cancelled": "bg-gray-300 text-white",
        "in_process": "bg-amareloReFeicoes text-white"
    };

    function getStatusPagamentoPtBr(status: string): string {
        switch (status) {
            case "approved": return "Aprovado";
            case "pending": return "Pendente";
            case "rejected": return "Rejeitado";
            case "cancelled": return "Cancelado";
            case "in_process": return "Em processamento";
            default: return "Desconhecido";
        }
    }

    return (
        <LayoutAdmin
            header
            infoPagina
            infoPaginaTexto="Veja todas as informações detalhadas sobre um pedido específico."
        >
            <div className="bg-white shadow-md rounded-xl p-8 mt-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Detalhes do Pedido</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            ID: <span className="text-gray-700">{dados.id}</span>
                        </p>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyle[dados.statusPedido] || "bg-gray-300"}`}>
                            Pedido: {dados.statusPedido}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${pagamentoStatusStyle[dados.pagamento.status] || "bg-gray-300"}`}>
                            Pagamento: {getStatusPagamentoPtBr(dados.pagamento.status)}
                        </span>
                    </div>
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Dados Usuario</h2>
                <Tabela
                    headerAtributos={["Nome", "Email"]}
                    atributosBody={["compradorNome", "compradorEmail"]}
                    lastPage={1}
                    objeto={[dados]}
                    posicionamentoAtributos={["left", "left"]}
                    bgCor={[false, false]}
                    botoesTabela={[]}
                />
                <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Dados Pagamento</h2>
                <Tabela
                    headerAtributos={["Valor", "Método de pagamento"]}
                    atributosBody={["valor", "metodoPagamento"]}
                    lastPage={1}
                    objeto={[dados.pagamento]}
                    posicionamentoAtributos={["left", "left"]}
                    bgCor={[false, false]}
                    botoesTabela={[]}
                />

                <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Itens Pedido</h2>
                <Tabela
                    headerAtributos={["Nome", "Descrição", "Quantidade"]}
                    atributosBody={["nome", "descricao", "quantidade"]}
                    lastPage={1}
                    objeto={dados.itens}
                    posicionamentoAtributos={["left", "left", "left"]}
                    bgCor={[false, false]}
                    botoesTabela={[]}
                />
                <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Endereco de entrega</h2>
                <Tabela
                    headerAtributos={["CEP", "Logradouro", "Número", "Bairro", "Cidade", "Complemento"]}
                    atributosBody={["cep", "logradouro", "numero", "bairro", "cidade", "complemento"]}
                    lastPage={1}
                    objeto={[dados.endereco]}
                    posicionamentoAtributos={["left", "left", "left", "left", "left", "left",]}
                    bgCor={[false, false]}
                    botoesTabela={[]}
                />
                <div className="w-1/2 mb-6 pr-4 flex gap-5 mt-10">
                    <button onClick={()=>handleMudarStatusPedido("Entregue")} className="bg-green-500 text-white py-2 px-4 rounded-md whitespace-nowrap w-full">
                        Status Entregue
                    </button>
                    <button onClick={()=>handleMudarStatusPedido("Pendente")} className="bg-gray-400 text-white py-2 px-4 rounded-md whitespace-nowrap w-full">
                        Status Pendente
                    </button>
                    <button onClick={()=>handleMudarStatusPedido("Cancelado")} className="bg-red-500 text-white py-2 px-4 rounded-md whitespace-nowrap w-full">
                        Status Cancelado
                    </button>
                </div>
            </div>
        </LayoutAdmin>
    );
}
