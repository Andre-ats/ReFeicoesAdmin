import { Fragment, useEffect, useState } from "react";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Tabela } from "../../../Components/Tabela/Tabela";
import { FormularioComponent } from "../../../Components/Formulario/Formulario";
import { useNavigate } from "react-router-dom";
import { GetTodosPedidosTabela } from "../../../Api/Pedidos/GetTodosPedidosTabela";
import { Loader2 } from "lucide-react";

enum StatusPedido {
    Entregue = "Entregue",
    Pendente = "Pendente",
    Cancelado = "Cancelado"
}

export function ListagemPedidos() {

    const navigate = useNavigate()
    const [pedidos, setPedidos] = useState<any>([]);
    const [filtroDados, setFiltrosDados] = useState<any>([])

    const [registrosQuantia, SetRegistrosQuantia] = useState()
    const [pagina, setPagina] = useState<number>()
    const enumToArray = (e: any) => Object.values(e);

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const data = await GetTodosPedidosTabela();
                console.log(data)
                setPedidos(data);
            } catch (error) {
                console.error("Erro ao buscar os pedidos:", error);
            }
        };
        fetchItens();
    }, []);

    useEffect(() => {
        let parametro = `?${pagina ? "numeroDaPagina=" + pagina : ""}
            ${registrosQuantia ? "&numeroRegistros=" + registrosQuantia : ""}
            ${filtroDados[0] ? "&PedidoId=" + filtroDados[0] : ""}
            ${filtroDados[1] ? "&Email=" + filtroDados[1] : ""}
            ${filtroDados[2] ? "&StatusPedido=" + filtroDados[2] : ""}`
            .replace(/\?&/, "?")
            .replace(/\s+/g, "");

        const fetchItens = async () => {
            try {
                const data = await GetTodosPedidosTabela(parametro);
                setPedidos(data);
            } catch (error) {
                console.error("Erro ao buscar os pedidos:", error);
            }
        };

        fetchItens();

    }, [pagina, registrosQuantia, filtroDados]);

    useEffect(() => {
        if (registrosQuantia !== undefined || filtroDados !== undefined) {
            setPagina(1);
        }
    }, [registrosQuantia, filtroDados]);

    console.log(pedidos)

    return (
        <LayoutAdmin
            header
            infoPagina
            infoPaginaTexto="Listagem de todos os pedidos que o sistema possui."
        >
            <Fragment>
                {pedidos?.dados?.length > 0 ? (
                    <div className="mt-8 w-full">
                        <div className="flex">
                            <div className="w-full">
                                <FormularioComponent
                                    dadosState={filtroDados}
                                    label={["Pedido ID", "Email Usuario", "Status Pedido"]}
                                    required={[false, false, false]}
                                    setDadosState={setFiltrosDados}
                                    typeInput={["text", "email", "Enum"]}
                                    Enum={[false, false, enumToArray(StatusPedido)]}
                                    QuantiaElementoLinha={3}
                                />
                            </div>
                        </div>
                        <div>
                            <Tabela
                                headerAtributos={["Pedido ID", "Usuario Email", "Valor Pago", "Pedido Status"]}
                                atributosBody={["id", "compradorEmail", "somaPreco", "pedidoStatus"]}
                                lastPage={pedidos?.totalPaginas}
                                objeto={pedidos?.dados}
                                posicionamentoAtributos={["center", "center", "center", "center"]}
                                bgCor={[false, false, false, true]}
                                botoesTabela={[
                                    { label: "Verificar", onClick: (item) => navigate("/admin/pedidos/verificar/" + item.id) }
                                ]}
                                setOrdenacao={[]}
                                setPagina={setPagina}
                                setRegistroQuantia={SetRegistrosQuantia}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="text-center animate__animated animate__fadeIn animate__delay-1s">
                            <p className="text-xl font-semibold text-gray-600 mb-4">Nenhum pedido encontrado</p>
                            <div className="text-3xl text-yellow-500 animate-bounce">
                                <i className="fas fa-search"></i>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                Nenhum pedido foi encontrado até o momento. Por favor, tente novamente mais tarde.
                                <div className="flex justify-center">
                                    <button onClick={() => window.location.reload()} className="bg-amareloReFeicoes text-black py-2 px-12 rounded-md whitespace-nowrap mt-5 flex gap-3">
                                        <Loader2 />
                                        Recarregar Pagina
                                    </button>
                                </div>
                            </p>
                        </div>
                    </div>
                )}
            </Fragment>
        </LayoutAdmin>
    )
}