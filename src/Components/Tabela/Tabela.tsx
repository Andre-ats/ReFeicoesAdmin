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
}

export function Tabela(props: ITabela) {
    const [ordenacao, setOrdenacao] = useState("desc");
    const [pagina, setPagina] = useState<number>();

    async function handleOrdenacao(item: string) {
        if (ordenacao === "asc") {
            setOrdenacao("desc");
        } else {
            setOrdenacao("asc");
        }
        await props.setOrdenacao({ ordenacao, item });
    }

    useEffect(() => {
        props.setPagina(pagina! + 1);
    }, [pagina]);

    const handlePageChange = (selected: { selected: number }) => {
        setPagina(selected.selected);
    };

    return (
        <Fragment>
            {/* Table Section */}
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
                                    <div className="flex items-center justify-between">
                                        {item}
                                        <button onClick={() => handleOrdenacao(props.atributosBody[key])}>
                                            {ordenacao === "asc" ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                                    <path d="M440-800v487L216-537l-56 57 320 320 320-320-56-57-224 224v-487h-80Z" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                                                    <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                </th>
                            ))}
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
                                        {item[atributo]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mb-4">
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
                </div>
            </div>
        </Fragment>
    );
}
