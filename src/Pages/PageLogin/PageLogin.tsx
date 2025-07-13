import { Fragment } from "react/jsx-runtime";
import { FormularioComponent } from "../../Components/Formulario/Formulario";
import { useState } from "react";
import { Button } from "../../Components/Formulario/Button";
import { PostLoginAdmin } from "../../Api/LoginAPI/PostLoginAdmin";
import { Spinner } from "../../Components/Spinner/Spinner";

export function PageLogin() {

    const [dadosLogin, setDadosLogin] = useState<any>([])
    const [spinner, setSpinner] = useState(false)

    async function handleLogin() {
        const loginObj = {
            email: dadosLogin[0],
            senha: dadosLogin[1]
        }

        setSpinner(true)
        const responseData = await PostLoginAdmin(loginObj)
        setSpinner(false)

        localStorage.setItem('token', responseData);
    }

    return (
        <Fragment>
            <div className="w-full h-svh bg-brancoReFeicoes">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-cinzaReFeicoes rounded-lg py-5">
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-full px-4">
                            <h1 className="text-2xl pb-4 font-medium text-center border-b border-black">Login</h1>
                                <div className="mt-4">
                                    <FormularioComponent
                                        dadosState={dadosLogin}
                                        setDadosState={setDadosLogin}
                                        label={["Email:", "Senha:"]}
                                        required={[true, true]}
                                        typeInput={["email", "password"]}
                                        QuantiaElementoLinha={1}
                                        placeholder={["exemplo@email.com", "Senha..."]}
                                    />
                                </div>
                                <Button
                                    cor="#f2b00f"
                                    label="Entrar"
                                    acao={() => handleLogin()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {spinner === true &&
                <Spinner/>
            }
        </Fragment>
    )
}