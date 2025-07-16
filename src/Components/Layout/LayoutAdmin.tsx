import { InfoIcon, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface ILayoutAdmin {
    header?: boolean
    atalhosHeader?: string[]
    children?: ReactNode
    infoPagina?: boolean
    infoPaginaTexto?: string
}

export function LayoutAdmin(props: ILayoutAdmin) {

    const navigate = useNavigate()

    const [mostrarIcon, setMostrarIcon] = useState(true)
    const [animacaoClasse, setAnimacaoClasse] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimacaoClasse('fade-slide-out');
            setTimeout(() => {
                setMostrarIcon(false);
            }, 500);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Fragment>
            <div className="w-full flex justify-center bg-gray-200 h-svh">
                <div className="w-4/5">
                    {props.header &&
                        <header className="w-full flex justify-between items-center h-20 px-10 bg-zinc-800 rounded-b-2xl">
                            <div className="text-white">
                                <img src="" alt="Logo" />
                            </div>
                            <div className="text-white">
                                {props.atalhosHeader?.length! > 0 && (
                                    <div className="flex gap-6">
                                        {props.atalhosHeader?.map((item, index) => (
                                            <div key={index} className="cursor-pointer">
                                                <p onClick={() => navigate("/admin/" + item.toLowerCase() + "/listagem")}>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </header>
                    }
                    {props.infoPagina && mostrarIcon && (
                        <div
                            className="flex justify-between items-center bg-blue-400 rounded-2xl py-2 px-8 mt-5 bg-opacity-90 shadow-lg"
                            style={{
                                transition: 'transform 0.5s ease, opacity 0.8s ease',
                                transform: animacaoClasse === 'fade-slide-out' ? 'translateX(100%)' : 'translateX(0)',
                                opacity: animacaoClasse === 'fade-slide-out' ? 0 : 1
                            }}
                        >
                            <div className="flex">
                                <InfoIcon color="white" className="mr-5" />
                                <p className="text-white text-lg font-medium">
                                    {props.infoPaginaTexto}
                                </p>
                            </div>
                            <X className="cursor-pointer" onClick={() => setMostrarIcon(false)} color="white"/>
                        </div>
                    )}
                    {props.children}
                </div>
            </div>
        </Fragment>
    )
}
