import { Fragment, useState } from "react";
import { FormularioComponent } from "../../../../Components/Formulario/Formulario";
import { Frown, Trash } from "lucide-react";
import Modal from "../../../../Components/Modal/Modal";
import { Categoria } from "../../../../Api/Itens/Enums/EnumCategoria";

interface IComponentItem {
    setDados: any;
    setIngredientes: any;
    setDescricao: any;
}

export function ComponentItem(props: IComponentItem) {

    const [itemDados, setItemDados] = useState<string[]>(Array(3).fill(""));
    const [ingredientes, setIngredientes] = useState<string[]>([]);
    const [novoIngrediente, setNovoIngrediente] = useState<string>("");
    const [descricao, setDescricao] = useState<string>(""); // Estado para a descrição
    const [showModal, setShowModal] = useState(false);
    const enumToArray = (e: any) => Object.values(e);

    const addIngrediente = () => {
        if (novoIngrediente.trim() !== "") {
            setIngredientes([...ingredientes, novoIngrediente]);
            setNovoIngrediente("");
            setShowModal(false);
        }
    };

    const removeIngrediente = (index: number) => {
        const updatedIngredientes = ingredientes.filter((_, i) => i !== index);
        setIngredientes(updatedIngredientes);
    };

    function salvarDados() {
        props.setDados(itemDados);
        props.setIngredientes(ingredientes);
        props.setDescricao(descricao);
    }

    return (
        <Fragment>
            <div className="w-full">
                <div className="flex h-full gap-4">
                    <div className="w-1/2 h-full">
                        <FormularioComponent
                            dadosState={itemDados}
                            setDadosState={setItemDados}
                            label={["Nome", "Preço", "Categoria"]}
                            required={[true, true, true]}
                            typeInput={["text", "number", "Enum"]}
                            Enum={[null, null, enumToArray(Categoria)]}
                            QuantiaElementoLinha={1}
                        />
                        <div className="w-full">
                            <label htmlFor="" className="block text-black text-sm font-medium mb-1">Descrição</label>
                            <textarea
                                id="ingrediente"
                                className="p-2 border border-gray-300 rounded-md h-[137px] resize-none mt-2 w-full"
                                value={descricao} // Vinculando o valor com o estado
                                onChange={(e) => setDescricao(e.target.value)} // Atualizando o estado ao digitar
                            />
                        </div>
                    </div>
                    <div className="border-l border-gray-300 mx-4"></div>
                    <div className="w-1/2 flex flex-col h-full">
                        <ul className="space-y-2.5">
                            <div className="flex flex-col items-start text-gray-500 space-y-2">
                                <label htmlFor="" className="block text-black text-sm font-medium">Ingredientes</label>
                                {ingredientes.length === 0 && (
                                    <div className="flex items-center space-x-2 mt-2">
                                        <Frown className="text-yellow-500" size={24} />
                                        <span className="text-sm text-gray-600 font-medium">Ainda não há ingredientes. Adicione o primeiro ingrediente para começar!</span>
                                    </div>
                                )}
                            </div>
                            {ingredientes.map((ingrediente, index) => (
                                <div key={index}>
                                    <li className="flex justify-between items-center p-2 border-b border-gray-200 rounded-md shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors">
                                        <span className="text-gray-700">{ingrediente}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeIngrediente(index)}
                                            className="text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </li>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setShowModal(true)}
                                className="bg-amareloReFeicoes text-black py-2 px-4 rounded-md"
                            >
                                + Adicionar Ingrediente
                            </button>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-24">
                    <button
                        type="button"
                        onClick={() => salvarDados()}
                        className="bg-amareloReFeicoes text-black py-2 px-4 rounded-md w-1/4"
                    >
                        Salvar item
                    </button>
                </div>
            </div>

            {showModal &&
                <Modal
                    isOpen
                    onClose={() => setShowModal(false)}
                    confirmModal
                    onConfirm={addIngrediente}
                    tituloModal="Adicionar novo ingrediente"
                >
                    <div className="mt-4">
                        <input
                            type="text"
                            value={novoIngrediente}
                            onChange={(e) => setNovoIngrediente(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md w-full"
                            placeholder="Digite o ingrediente"
                        />
                    </div>
                </Modal>
            }
        </Fragment>
    );
}
