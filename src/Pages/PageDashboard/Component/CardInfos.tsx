import { Fragment } from "react/jsx-runtime";

interface ICardInfos {
    dados?: any
    icon?: any[]
    camposNome?: string[]
}

export function CardInfos(props: ICardInfos) {
    return (
        <Fragment>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                {props.dados ? (
                    Object.entries(props.dados).map(([key, value], index) => (
                        <div key={key} className="w-full p-10 bg-white text-black rounded-lg shadow-lg flex flex-col items-center">
                            <div className="text-4xl">
                                <div className="flex justify-center mb-4">
                                    {props.icon?.[index]}
                                </div>
                            </div>
                            <div className="text-2xl font-semibold">
                                <p>{value as number}</p>
                            </div>
                            <div className="text-lg mt-2">
                                <p>{props.camposNome?.[index]}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-black">Sem dados!</p>
                )}
            </div>
        </Fragment>

    );
}