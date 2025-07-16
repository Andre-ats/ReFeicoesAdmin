import { Fragment } from "react/jsx-runtime";
import { FormularioComponent } from "../../../../Components/Formulario/Formulario";
import { useState } from "react";

enum ECategoria {
    Teste01 = "Teste01",
    Teste02 = "Teste02"
}

export function ComponentItem() {

    const [itemDados, setItemDados] = useState<string[]>(Array(8).fill(""));
    const enumToArray = (e: any) => Object.values(e);

    return (
        <Fragment>
            <div className="w-full flex gap-4 ">
                <div className="w-1/2 h-full">
                    <FormularioComponent
                        dadosState={itemDados}
                        setDadosState={setItemDados}
                        label={["Nome", "Preço", "Categoria"]}
                        required={[true, true, true]}
                        typeInput={["text", "number", "Enum"]}
                        Enum={[null, null, enumToArray(ECategoria)]}
                        QuantiaElementoLinha={1}

                    >

                    </FormularioComponent>
                </div>
                <div className="w-1/2 flex flex-col h-full">
                    <label htmlFor="" className="mb-2">Descrição</label>
                    <textarea className="p-2 border border-gray-300 rounded-md h-full resize-none"></textarea>
                </div>
            </div>
        </Fragment>
    )
}