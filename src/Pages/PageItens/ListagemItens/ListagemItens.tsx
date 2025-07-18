import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Tabela } from "../../../Components/Tabela/Tabela";
import { useEffect, useState } from "react";
import { GetItens } from "../../../Api/Itens/GetItens";
import { UpdateAtivarDesativar } from "../../../Api/Itens/UpdateAtivarDesativar";
import { useNavigate } from "react-router-dom";

export function ListagemItens() {

    const navigate = useNavigate()

    const [, setPagina] = useState()
    const [itens, setItens] = useState<any>()

    console.log(itens)

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

    async function AtivarDesativarItem(item: any){
        const data = await UpdateAtivarDesativar(item.Id)
        console.log(data)
    }

    return (
        <Fragment>
            <LayoutAdmin
                header
                atalhosHeader={["Dashboard", "itens", "Pedidos"]}
                infoPagina
                infoPaginaTexto="Listagem de todos os itens que o sistema possui."
            >
                <div className="mt-8 w-full">
                    <div className="w-full mb-6 pr-4">
                        <button onClick={()=>navigate("/admin/itens/criarItem")} className="bg-amareloReFeicoes text-black py-2 px-12 rounded-md whitespace-nowrap">
                            + Criar item
                        </button>
                    </div>
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
                    />
                </div>
            </LayoutAdmin>
        </Fragment>
    )
}