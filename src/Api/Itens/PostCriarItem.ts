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
            throw new Error('Falha ao criar o item');
        }

        const responseData = await response.json();

        return responseData || false;
        
    } catch (error: any) {
        return { error: error.message || 'Erro desconhecido' };
    }
}
