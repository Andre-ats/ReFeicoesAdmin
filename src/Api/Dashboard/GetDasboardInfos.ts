import { API_URL } from "../API_URL";

export interface IDashboardInfo {
    quantidadeUsuario: number;
    quantidadePedidoPendente: number;
    quantidadePedidoEntregue: number;
    quantidadePedidoTotal: number;
    quantidadeItens: number;
    quantidadeItensAtivos: number;
    quantidadeItensInativos: number;
    receitaTotal: number;
}

export async function GetDashboardInfos() {
    try {
        const response = await fetch(`${API_URL}/Admin/GetDashboardInfos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = "/login"
                return
            }
            throw new Error("Erro na requisição");
        }

        const data: IDashboardInfo = await response.json();

        return data;

    } catch (error) {
        console.error("Erro ao buscar os itens:", error);
        throw error;
    }
}