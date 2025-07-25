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
            throw new Error('Falha ao criar o item');
        }

        const responseData = await response.json();

        return responseData || false;
        
    } catch (error: any) {
        return { error: error.message || 'Erro desconhecido' };
    }
}
