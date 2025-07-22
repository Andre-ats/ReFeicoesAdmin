import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Stepper } from "../../../Components/Stepper/Stepper";
import { ComponentItem } from "./Component/ComponentItem";
import { ComponentImagem } from "./Component/ComponentImagem";
import { useEffect, useState } from "react";
import { PostCriarItem } from "../../../Api/Itens/PostCriarItem";
import { PostCriarImagem } from "../../../Api/Itens/PostCriarImagem";
import { Spinner } from "../../../Components/Spinner/Spinner";
import Modal from "../../../Components/Modal/Modal";

export function CriarItem() {

    const [passoatual, setPassoatual] = useState(0)
    const [itemDados, setItemDados] = useState()
    const [imagem, setImagem] = useState<File | null>(null);

    const [erroImagem, setErroImagem] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (itemDados) {
            setPassoatual(1)
        }
    }, [itemDados])

    console.log(itemDados)

    async function handleCriarItem() {
        if (!imagem) {
            setErroImagem(true)
            return
        }
        setLoading(true)

        const response = await PostCriarItem(itemDados!);

        if (response.itemId) {
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
                    />
                }
                {passoatual == 1 &&
                    <Fragment>
                        <ComponentImagem
                            setImagem={setImagem}
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={() => handleCriarItem()}
                                className="bg-amareloReFeicoes text-black py-2 px-4 rounded-md w-1/4 mt-24">Criar Item</button>
                        </div>
                    </Fragment>
                }
            </LayoutAdmin>
            {loading == true &&
                <Spinner />
            }
            {erroImagem &&
                <Modal
                    isOpen
                    onClose={() => setErroImagem(false)}
                    tituloModal="Imagem Inválida"
                >
                    <div>
                        <p className="text-gray-600 text-sm">
                            A imagem é obrigatória. Se o problema persistir, por favor, tente novamente mais tarde ou entre em contato com o suporte.
                        </p>
                    </div>
                </Modal>
            }
        </Fragment>
    )
}