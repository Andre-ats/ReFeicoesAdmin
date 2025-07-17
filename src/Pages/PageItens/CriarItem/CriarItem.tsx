import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Stepper } from "../../../Components/Stepper/Stepper";
import { ComponentItem } from "./Component/ComponentItem";
import { ComponentImagem } from "./Component/ComponentImagem";
import { useEffect, useState } from "react";
import { IPostCriarItem, PostCriarItem } from "../../../Api/Itens/PostCriarItem";
import { PostCriarImagem } from "../../../Api/Itens/PostCriarImagem";
import { Spinner } from "../../../Components/Spinner/Spinner";

export function CriarItem() {

    const [passoatual, setPassoatual] = useState(0)
    const [itemDados, setItemDados] = useState()
    const [ingredientes, setIngredientes] = useState()
    const [descricao, setDescricao] = useState()
    const [imagem, setImagem] = useState<File | null>(null);

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (itemDados) {
            setPassoatual(1)
        }
    }, [itemDados])

    async function handleCriarItem() {
        const objeto: IPostCriarItem = {
            nome: itemDados?.[0] || "",
            descricao: descricao || "",
            preco: parseFloat(itemDados?.[1] || "0"),
            status: true,
            categoriaItem: itemDados?.[2] || "",
            ingredientes: ingredientes || [],
        };

        setLoading(true)
    
        const response = await PostCriarItem(objeto);

        if(response.itemId){
            await PostCriarImagem(response.itemId, imagem!)
        }

        setLoading(false)
    
        if (response.error) {
            console.error(response.error);
        } else {
            console.log("Item criado com sucesso", response);
        }
    }

    return (
        <Fragment>
            <LayoutAdmin
                header
                atalhosHeader={["Dashboard", "itens", "Pedidos"]}
                infoPagina
                infoPaginaTexto="Criação de itens que ficam visíveis para todos os usuários."
            >
                <Stepper
                    passos={[
                        { label: "Cadastrar item" },
                        { label: "Cadastrar imagem" }
                    ]}
                    passoAtual={passoatual}
                />
                {passoatual == 0 &&
                    <ComponentItem
                        setDados={setItemDados}
                        setIngredientes={setIngredientes}
                        setDescricao={setDescricao}
                    />
                }
                {passoatual == 1 &&
                    <Fragment>
                        <ComponentImagem
                            setImagem={setImagem}
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={()=>handleCriarItem()}
                                className="bg-amareloReFeicoes text-black py-2 px-4 rounded-md w-1/4 mt-24">Criar Item</button>
                        </div>
                    </Fragment>
                }
            </LayoutAdmin>
            {loading == true &&
                <Spinner/>
            }
        </Fragment>
    )
}