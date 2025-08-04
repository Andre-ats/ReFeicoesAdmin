import { API_URL } from "../API_URL";

export async function UpdateAtivarDesativar(id: string){
    try {
        const response = await fetch(`${API_URL}/Item/AtualizarStatusItem?ItemId=${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({}),
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = "/login"
                return
            }
            throw new Error("Erro na requisição");
        }

        const data = await response.json();
        window.location.reload()

        return data;

    } catch (error) {
        console.error('Erro ao atualizar o item:', error);
        throw error;
    }
}