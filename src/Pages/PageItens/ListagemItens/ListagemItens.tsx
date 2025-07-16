import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Tabela } from "../../../Components/Tabela/Tabela";
import { useEffect, useState } from "react";
import { GetItens } from "../../../Api/Itens/GetItens";

export function ListagemItens() {

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

    return (
        <Fragment>
            <LayoutAdmin
                header
                atalhosHeader={["Dashboard", "itens", "Pedidos"]}
                infoPagina
                infoPaginaTexto="Listagem de todos os itens que o sistema possui."
            >
                <div className="mt-14">
                    <Tabela
                        headerAtributos={["Nome", "Categoria", "Preço", "Status"]}
                        atributosBody={["Nome", "Categoria", "Preco", "Status"]}
                        lastPage={itens?.totalPaginas}
                        objeto={itens}
                        posicionamentoAtributos={["center", "center", "center", "center"]}
                        bgCor={[false, false, false, true]}
                        botoesTabela={[
                            { label: "Ativar", onClick: (item) => console.log("Ativar", item) },
                            { label: "Desativar", onClick: (item) => console.log("Desativar", item) }
                        ]}
                        setOrdenacao={[]}
                        setPagina={setPagina}
                    />
                </div>
            </LayoutAdmin>
        </Fragment>
    )
}