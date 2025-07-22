import { useEffect, useState } from "react";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Tabela } from "../../../Components/Tabela/Tabela";
import { FormularioComponent } from "../../../Components/Formulario/Formulario";
import { useNavigate } from "react-router-dom";
import { GetTodosPedidosTabela } from "../../../Api/Pedidos/GetTodosPedidosTabela";

export function ListagemPedidos() {

    const navigate = useNavigate()
    const [pedidos, setPedidos] = useState<any>([]);
    const [filtroDados, setFiltrosDados] = useState<any>([])

    const [registrosQuantia, SetRegistrosQuantia] = useState()
    const [pagina, setPagina] = useState<number>()

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const data = await GetTodosPedidosTabela();
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
            ${filtroDados[0] ? "&Nome=" + filtroDados[0] : ""}
            ${filtroDados[1] ? "&Categoria=" + filtroDados[1] : ""}
            ${filtroDados[2] ? "&PrecoMin=" + filtroDados[2] : ""}
            ${filtroDados[3] ? "&PrecoMax=" + filtroDados[3] : ""}
            ${filtroDados[4] ? "&Status=" + (filtroDados[4] === "Ativo" ? true : false) : ""}`
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

    return (
        <LayoutAdmin
            header
            atalhosHeader={["Dashboard", "Itens", "Pedidos"]}
            infoPagina
            infoPaginaTexto="Listagem de todos os pedidos que o sistema possui."
        >
            <div className="mt-8 w-full">
                <div className="w-full mb-6 pr-4">
                    <button onClick={() => navigate("/admin/itens/criarItem")} className="bg-amareloReFeicoes text-black py-2 px-12 rounded-md whitespace-nowrap">
                        + Criar item
                    </button>
                </div>
                <div className="flex">
                    <div className="w-full">
                        <FormularioComponent
                            dadosState={filtroDados}
                            label={["Pedido ID", "Email Usuario", "Status"]}
                            required={[false, false, false]}
                            setDadosState={setFiltrosDados}
                            typeInput={["text", "email", "Enum"]}
                            QuantiaElementoLinha={3}
                        />
                    </div>
                </div>
                {pedidos?.dados ? (
                    <div>
                        <Tabela
                            headerAtributos={["Pedido ID", "Usuario Email", "Preco", "Pagamento Status"]}
                            atributosBody={["id", "compradorEmail", "somaPreco","pagamentoStatus"]}
                            lastPage={pedidos?.totalPaginas}
                            objeto={pedidos?.dados}
                            posicionamentoAtributos={["center", "center", "center", "center"]}
                            bgCor={[false, false, false, true]}
                            botoesTabela={[
                                //{ label: "Ativar / Desativar", onClick: (item) => AtivarDesativarItem(item) },
                                //{ label: "Verificar", onClick: (item) => navigate("/admin/itens/verificar/" + item.Id) }
                            ]}
                            setOrdenacao={[]}
                            setPagina={setPagina}
                            setRegistroQuantia={SetRegistrosQuantia}
                        />
                    </div>
                ) : (
                    <div className="flex justify-center items-center min-h-[300px]">
                        <div className="text-center animate__animated animate__fadeIn animate__delay-1s">
                            <p className="text-xl font-semibold text-gray-600 mb-4">Nenhum pedido encontrado</p>
                            <div className="text-3xl text-yellow-500 animate-bounce">
                                <i className="fas fa-search"></i>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Por favor, verifique seu filtro ou tente novamente mais tarde.</p>
                        </div>
                    </div>
                )}
            </div>
        </LayoutAdmin>
    )
}