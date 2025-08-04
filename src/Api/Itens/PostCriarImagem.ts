import { API_URL } from "../API_URL";

export async function PostCriarImagem(id: string, imagem: File) {
    const formData = new FormData();
    formData.append("ItemId", id);
    formData.append("File", imagem);

    try {
        const response = await fetch(`${API_URL}/Item/CriarImagem`, {
            method: 'POST',
            headers: {
               'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: formData,
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
