import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../Components/Layout/LayoutAdmin";
import { CardInfos } from "./Component/CardInfos";
import { GetDashboardInfos, IDashboardInfo } from "../../Api/Dashboard/GetDasboardInfos";
import { User, Clock, CheckCircle, Clipboard, XCircle, DollarSign, Soup } from 'lucide-react';
import DonutChart from "./Component/DonutGraficoPedido";

export function PageDashboard() {

    const navigate = useNavigate()

    const [dashboardInfo, setDashboardInfo] = useState<IDashboardInfo>()

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || token === "" || token === "null" || token === "undefined") {
            navigate("/login");
        }
    }, [navigate])

    useEffect(() => {
        const fetchItens = async () => {
            try {
                const data: IDashboardInfo = await GetDashboardInfos();
                setDashboardInfo(data);
            } catch (error) {
                console.error("Erro ao buscar os dados dashboard:", error);
            }
        };

        fetchItens();
    }, [navigate])

    console.log(dashboardInfo)

    return (
        <Fragment>
            <LayoutAdmin
                header
                infoPagina
                infoPaginaTexto="Este dashboard mostra o total de usuários registrados, pagamentos aprovados e o montante gerado."
            >
                <Fragment>
                    <div className="w-full mt-8">
                        <CardInfos
                            dados={dashboardInfo}
                            camposNome={["Usuarios", "Pedidos Pendentes", "Pedidos Entregues", "Pedidos Totais", "Itens", "Itens Ativos", "Itens Inativos", "Receita Total"]}
                            icon={[
                                <User className="text-blue-500 text-4xl" />,
                                <Clock className="text-yellow-500 text-4xl" />,
                                <CheckCircle className="text-green-500 text-4xl" />,
                                <Clipboard className="text-indigo-500 text-4xl" />,
                                <Soup className="text-teal-500 text-4xl" />,
                                <CheckCircle className="text-green-500 text-4xl" />,
                                <XCircle className="text-gray-500 text-4xl" />,
                                <DollarSign className="text-green-500 text-4xl" />
                            ]}
                        />
                    </div>
                    <div className="w-full flex justify-center gap-4">
                        <DonutChart
                            y={dashboardInfo?.quantidadePedidoPendente}
                            x={dashboardInfo?.quantidadePedidoEntregue}
                            textoY={"Pedidos Pendetes"}
                            textoX={"Pedidos Entregues"}
                        />
                        <DonutChart
                            y={dashboardInfo?.quantidadeItensInativos}
                            x={dashboardInfo?.quantidadeItensAtivos}
                            textoY={"Itens Inativos"}
                            textoX={"Itens Ativos"}
                        />
                    </div>
                </Fragment>
            </LayoutAdmin>
        </Fragment>
    )
}