import { API_URL } from "../API_URL";


export async function PutStatusPedido(idPedido: string | undefined, status: string) {
    try {
        const response = await fetch(`${API_URL}/Pedido/MudarStatusPedido`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                idPedido,
                status
            }),
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = "/login"
                return
            }
            throw new Error("Erro na requisição");
        }

        const responseData = await response.json();

        return responseData || false;
        
    } catch (error: any) {
        return { error: error.message || 'Erro desconhecido' };
    }
}
