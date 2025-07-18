import { useEffect, useState } from "react";
import { LayoutAdmin } from "../../../Components/Layout/LayoutAdmin";
import { useParams } from "react-router-dom";
import { GetItemById, IGetItemById } from "../../../Api/Itens/GetItemById";
import { ServicoImagemURL } from "../../../Api/ServicoImagemURL";

export function VerificarItens() {

    const { id } = useParams();

    const [item, setItem] = useState<IGetItemById | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const itemData = await GetItemById(id!);
                setItem(itemData[0]);
            } catch (error) {
                console.error("Erro ao carregar o item:", error);
            }
        };

        fetchItem();
    }, [id]);

    console.log(item)

    return (
        <LayoutAdmin
            header
            atalhosHeader={["Dashboard", "itens", "Pedidos"]}
            infoPagina
            infoPaginaTexto="Veja todas as informações detalhadas sobre um item específico."
        >
            <div className="w-full mt-8">
                <div className="flex">
                    <div className="w-1/2">
                        <img
                            className="rounded-lg shadow-xl border-2 border-amareloReFeicoes hover:scale-105 transition-transform duration-500 h-[300px] w-[500px] object-cover"
                            src={ServicoImagemURL + item?.UrlImagem}
                            alt="Imagem do serviço"
                        />
                    </div>
                    <div className="w-3/4">
                        <div className="flex flex-col bg-white p-6 rounded-lg shadow-xl w-full space-y-6">
                            <div className="bg-amareloReFeicoes w-fit px-3 py-1 rounded-full font-medium">
                                <p>{item?.Categoria}</p>
                            </div>
                            <div className="text-gray-800">
                                <h1 className="text-xl font-semibold text-gray-900 mb-2">Nome:</h1>
                                <p className="text-lg font-medium text-gray-700">{item?.Nome}</p>
                            </div>
                            <div className="text-gray-800">
                                <h1 className="text-xl font-semibold text-gray-900 mb-2">Descrição:</h1>
                                <p className="text-lg font-medium text-gray-700">{item?.Descricao}</p>
                            </div>
                            <div className="text-gray-800">
                                <h1 className="text-xl font-semibold text-gray-900 mb-2">Preço:</h1>
                                <p className="text-lg font-medium text-gray-700">{item?.Preco ? `R$ ${item?.Preco.toFixed(2)}` : "Preço não disponível"}</p>
                            </div>
                            <div className="text-gray-800">
                                <h1 className="text-xl font-semibold text-gray-900 mb-2">Status:</h1>
                                <p className={`text-lg font-medium text-black w-fit rounded-full px-3 py-1 ${item?.Status == "Ativo" ? "bg-green-500" : "bg-red-500"}`}>{item?.Status}</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col bg-white p-6 rounded-lg shadow-xl w-full space-y-6 mt-6">
                                <div className="text-gray-800">
                                    <h1 className="text-xl font-semibold text-gray-900 mb-4">Ingredientes:</h1>
                                    <div className="space-y-2">
                                        {item?.Ingredientes?.length! > 0 ? (
                                            item?.Ingredientes.map((ingrediente, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                                                >
                                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                                    <p className="text-lg font-medium text-gray-700">{ingrediente}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-600 text-lg">Nenhum ingrediente adicionado.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </LayoutAdmin>
    )
}