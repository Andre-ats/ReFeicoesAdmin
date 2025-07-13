import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { LayoutAdmin } from "../../Components/Layout/LayoutAdmin";

export function PageDashboard(){

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (!token || token === "" || token === "null" || token === "undefined") {
            navigate("/login");
        }
    }, [navigate])

    return(
        <Fragment>
            <LayoutAdmin 
                header
                atalhosHeader={["Dashboard", "Itens", "Pedidos"]}
                infoPagina
                infoPaginaTexto="Este dashboard mostra o total de usuários registrados, pagamentos aprovados e o montante gerado."
            >
            </LayoutAdmin>
        </Fragment>
    )
}