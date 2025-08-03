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
            throw new Error('Falha ao criar a imagem');
        }

        const responseData = await response.json();
        return responseData || false;

    } catch (error: any) {
        return { error: error.message || 'Erro desconhecido' };
    }
}
