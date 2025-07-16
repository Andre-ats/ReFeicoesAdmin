import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { Stepper } from "../../../Components/Stepper/Stepper";
import { ComponentItem } from "./Component/ComponentItem";
import { ComponentImagem } from "./Component/ComponentImagem";
import { useState } from "react";

export function CriarItem(){

    const [passoatual, /*setPassoatual*/] = useState(0)

    return(
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
                    <ComponentItem/>
                }
                {passoatual == 1 &&
                    <ComponentImagem/>
                }
            </LayoutAdmin>
        </Fragment>
    )
}