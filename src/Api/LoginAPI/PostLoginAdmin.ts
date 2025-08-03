import { API_URL } from "../API_URL";

export interface IPostLoginAdmin {
    email: string;
    senha: string;
}

export async function PostLoginAdmin(props: IPostLoginAdmin){
    try {
        
        const response = await fetch(`${API_URL}/Admin/LoginAdmin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: props.email,
                senha: props.senha,
            }),
        });
    
        if (!response.ok) {
            throw new Error('Erro na autenticação');
        }
    
        const responseData = await response.json();

        if (responseData) {
            return responseData
        }
        else{
            return false
        }
      } catch (error: any) {
          return { error: error.message || 'Erro desconhecido' };
      }
}