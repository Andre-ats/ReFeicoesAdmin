import { API_URL } from "../API_URL";

export interface IPostCriarItem {
    nome: string;
    descricao: string;
    preco: number;
    status: boolean;
    categoriaItem: string;
    ingredientes: string[];
}

export async function PostCriarItem(props: IPostCriarItem) {
    try {
        const response = await fetch(`${API_URL}/Item/CriarItem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                nome: props.nome,
                descricao: props.descricao,
                preco: props.preco,
                status: props.status,
                categoriaItem: props.categoriaItem,
                ingredientes: props.ingredientes,
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
