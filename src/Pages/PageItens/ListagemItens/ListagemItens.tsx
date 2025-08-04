import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Tabela } from "../../../Components/Tabela/Tabela";
import { useEffect, useState } from "react";
import { GetItens } from "../../../Api/Itens/GetItens";
import { UpdateAtivarDesativar } from "../../../Api/Itens/UpdateAtivarDesativar";
import { useNavigate } from "react-router-dom";
import { FormularioComponent } from "../../../Components/Formulario/Formulario";
import { Categoria } from "../../../Api/Itens/Enums/EnumCategoria";
import { Loader2 } from "lucide-react";

enum Status {
    Ativo = "Ativo",
    Inativo = "Inativo"
}

export function ListagemItens() {

    const navigate = useNavigate()

    const enumToArray = (e: any) => Object.values(e);
    const [pagina, setPagina] = useState<number>()
    const [itens, setItens] = useState<any>()
    const [registrosQuantia, SetRegistrosQuantia] = useState()
    const [filtroDados, setFiltrosDados] = useState<any>([])
    //const [ordenacao, setOrdenacao] = useState({ordenacao:undefined, item:undefined})

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const data = await GetItens();
                setItens(data);
            } catch (error) {
                console.error("Erro ao buscar os itens:", error);
            }
        };
        fetchItens();
    }, []);

    async function AtivarDesativarItem(item: any) {
        await UpdateAtivarDesativar(item.Id)
    }

    console.log(itens)

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
                const data = await GetItens(parametro);
                setItens(data);
            } catch (error) {
                console.error("Erro ao buscar os itens:", error);
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
        <Fragment>
            <LayoutAdmin
                header
                infoPagina
                infoPaginaTexto="Listagem de todos os itens que o sistema possui."
            >
                <Fragment>

                    {itens?.itens.length > 0 ? (
                        <div className="mt-8 w-full">
                            <div className="w-full mb-6 pr-4">
                                <button onClick={() => navigate("/admin/itens/criarItem")} className="bg-amareloReFeicoes text-black py-2 px-12 rounded-md whitespace-nowrap">
                                    + Criar item
                                </button>
                            </div>
                            <div>
                                <div className="flex">
                                    <div className="w-full">
                                        <FormularioComponent
                                            dadosState={filtroDados}
                                            label={["Nome", "Categoria", "Preço Min", "Preço Max", "Status"]}
                                            required={[false, false, false]}
                                            setDadosState={setFiltrosDados}
                                            typeInput={["text", "Enum", "number", "number", "Enum"]}
                                            Enum={[null, enumToArray(Categoria), null, null, enumToArray(Status)]}
                                            QuantiaElementoLinha={"gap-2 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Tabela
                                        headerAtributos={["Nome", "Categoria", "Preço", "Status"]}
                                        atributosBody={["Nome", "Categoria", "Preco", "Status"]}
                                        lastPage={itens?.totalPaginas}
                                        objeto={itens?.itens}
                                        posicionamentoAtributos={["center", "center", "center", "center"]}
                                        bgCor={[false, false, false, true]}
                                        botoesTabela={[
                                            { label: "Ativar / Desativar", onClick: (item) => AtivarDesativarItem(item) },
                                            { label: "Verificar", onClick: (item) => navigate("/admin/itens/verificar/" + item.Id) }
                                        ]}
                                        setOrdenacao={[]}
                                        setPagina={setPagina}
                                        setRegistroQuantia={SetRegistrosQuantia}
                                    />
                                </div>
                            </div>

                        </div>
                    ) :
                        <div className="flex justify-center items-center min-h-[300px]">
                            <div className="text-center animate__animated animate__fadeIn animate__delay-1s">
                                <p className="text-xl font-semibold text-gray-600 mb-4">Nenhum item encontrado</p>
                                <div className="text-3xl text-yellow-500 animate-bounce">
                                    <i className="fas fa-search"></i>
                                </div>
                                <div className="w-full mb-6 pr-4">

                                    <p className="text-sm text-gray-500 mt-2">
                                        Nenhum item foi encontrado. Por favor, cadastre um novo item ou tente novamente mais tarde.
                                    </p>
                                    <div className="flex justify-center gap-4">
                                        <button onClick={() => navigate("/admin/itens/criarItem")} className="bg-amareloReFeicoes text-black py-2 px-12 rounded-md whitespace-nowrap mt-5">
                                            + Criar item
                                        </button>
                                        <button onClick={()=>window.location.reload()} className="bg-amareloReFeicoes text-black py-2 px-12 rounded-md whitespace-nowrap mt-5 flex gap-3">
                                            <Loader2/>
                                            Recarregar Pagina
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Fragment>
            </LayoutAdmin>
        </Fragment >
    )
}