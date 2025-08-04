import { InfoIcon, Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import logoRefeicoes from "../../Imagens/Logo/LogoRefeicoes.png"

interface ILayoutAdmin {
    header?: boolean
    children?: ReactNode
    infoPagina?: boolean
    infoPaginaTexto?: string
}

export function LayoutAdmin(props: ILayoutAdmin) {

    const navigate = useNavigate()

    const [mostrarIcon, setMostrarIcon] = useState(true)
    const [animacaoClasse, setAnimacaoClasse] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const [linkHeader,] = useState(["/admin/dashboard", "/admin/itens/listagem", "/admin/pedidos/listagem", "/login"])
    const [header,] = useState(["Dashboard", "Itens", "Pedidos", "Sair"])

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
                            <div className="text-white flex items-center gap-4">
                                <img onClick={() => navigate("/admin/dashboard")} className="w-[70px] cursor-pointer" src={logoRefeicoes} alt="Logo" />
                                <p className="hidden lg:block">Admin Refeições Marmitas Congeladas</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="block rounded-sm bg-zinc-800 hover:bg-zinc-700 p-2.5 text-white transition lg:hidden"
                            >
                                <span className="sr-only">Toggle menu</span>
                                {isMobileMenuOpen ? (
                                    <X className="size-5" />
                                ) : (
                                    <Menu className="size-5" />
                                )}
                            </button>
                            <div className="text-white hidden lg:block">
                                {props.header && (
                                    <div className="flex gap-6">
                                        {header?.map((item, index) => (
                                            <div key={index} className="cursor-pointer">
                                                <p onClick={() => navigate(linkHeader[index])}>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </header>
                    }
                    <div className="w-full flex justify-end">
                        {isMobileMenuOpen && (
                            <div className="bg-zinc-800 mt-1 rounded-md pr-10 pl-3 py-3 lg:hidden">
                                {props.header && (
                                    <div className="block">
                                        {header?.map((item, index) => (
                                            <div key={index} className="cursor-pointer mb-2">
                                                <p className="text-white" onClick={() => navigate(linkHeader[index])}>{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
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
                            <X className="cursor-pointer" onClick={() => setMostrarIcon(false)} color="white" />
                        </div>
                    )}
                    {props.children}
                </div>
            </div>
        </Fragment>
    )
}
