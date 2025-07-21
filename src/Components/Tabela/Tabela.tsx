import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import ReactPaginate from 'react-paginate';

interface ITabela {
    headerAtributos: string[];
    objeto: any;
    atributosBody: string[];
    posicionamentoAtributos: ("left" | "center" | "right")[];
    setOrdenacao: any;
    setPagina: any;
    lastPage: number | undefined;
    bgCor: boolean[];
    botoesTabela: { label: string, onClick: (item: any) => void }[];
    setRegistroQuantia: any; // Adicionando função para atualizar a quantidade de registros
}

export function Tabela(props: ITabela) {
    const [pagina, setPagina] = useState<number>(0);
    const [quantiaPorPagina, setQuantiaPorPagina] = useState<number>(10); // Estado para controlar a quantidade por página

    useEffect(() => {
        props.setPagina(pagina + 1);
    }, [pagina]);

    const handlePageChange = (selected: { selected: number }) => {
        setPagina(selected.selected);
    };

    const handleQuantiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantia = parseInt(e.target.value);
        setQuantiaPorPagina(newQuantia);
        props.setRegistroQuantia(newQuantia);
    };

    return (
        <Fragment>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-separate border-spacing-0.5">
                    <thead className="bg-gray-200 text-gray-800">
                        <tr>
                            {props.headerAtributos.map((item, key) => (
                                <th
                                    style={{ width: `${100 / props.headerAtributos.length}%` }}
                                    key={key}
                                    className="text-left py-3 px-4 font-semibold text-sm uppercase tracking-wider cursor-pointer"
                                >
                                    {item}
                                </th>
                            ))}
                            {props.botoesTabela.length > 0 && (
                                <th className="text-center py-3 px-4 font-semibold text-sm uppercase tracking-wider">
                                    Ações
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white text-gray-700">
                        {props.objeto?.map((item: any, rowIndex: any) => (
                            <tr key={rowIndex} className="border-b hover:bg-gray-50 transition-colors duration-200">
                                {props.atributosBody.map((atributo, colIndex) => (
                                    <td
                                        key={colIndex}
                                        style={{ textAlign: `${props.posicionamentoAtributos[colIndex]}` }}
                                        className="py-3 px-4 text-sm font-medium text-gray-600"
                                    >
                                        {props.bgCor[colIndex] === true ? (
                                            item.Status === "Ativo" ? (
                                                <div className="bg-green-500 py-2 px-4 rounded-md text-white">
                                                    {item[atributo]}
                                                </div>
                                            ) : (
                                                <div className="bg-red-500 py-2 px-4 rounded-md text-white">
                                                    {item[atributo]}
                                                </div>
                                            )
                                        ) : (
                                            <div>
                                                {item[atributo]}
                                            </div>
                                        )}
                                    </td>
                                ))}
                                {props.botoesTabela.length > 0 && (
                                    <td key={rowIndex} className="py-3 px-4 text-center">
                                        <div className="flex space-x-2">
                                            {props.botoesTabela.map((botao, index) => (
                                                <button
                                                    key={index}
                                                    className="bg-amareloReFeicoes text-black py-2 px-4 rounded-md whitespace-nowrap"
                                                    onClick={() => botao.onClick(item)}
                                                >
                                                    {botao.label}
                                                </button>
                                            ))}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mb-4 flex items-center justify-between">
                    <ReactPaginate
                        pageCount={props.lastPage!}
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName="flex justify-start items-center space-x-2 py-4"
                        activeClassName="bg-yellow-500 text-black shadow-md"
                        previousClassName="px-4 py-2 rounded-md border border-gray-300 text-black bg-white hover:bg-yellow-500 transition-colors duration-200"
                        nextClassName="px-4 py-2 rounded-md border border-gray-300 text-black bg-white hover:bg-yellow-500 transition-colors duration-200"
                        pageClassName="px-4 py-2 rounded-md border border-gray-300 text-black bg-white hover:bg-yellow-500 transition-colors duration-200"
                        breakClassName="px-4 py-2 rounded-md border border-gray-300 text-black bg-white"
                        previousLabel="&laquo;"
                        nextLabel="&raquo;"
                    />
                    <div className="flex items-center space-x-2">
                        <label htmlFor="quantia" className="text-sm">Mostrar por:</label>
                        <select
                            id="quantia"
                            className="p-2 border border-gray-300 rounded-md"
                            value={quantiaPorPagina}
                            onChange={handleQuantiaChange}
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
