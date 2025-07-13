import { Fragment } from "react/jsx-runtime";
import { FormularioComponent } from "../../Components/Formulario/Formulario";
import { useState } from "react";
import { Button } from "../../Components/Formulario/Button";
import { PostLoginAdmin } from "../../Api/LoginAPI/PostLoginAdmin";
import { Spinner } from "../../Components/Spinner/Spinner";
import { loginSchema } from "./SchemaLogin/SchemaLogin";

export function PageLogin() {

    const [dadosLogin, setDadosLogin] = useState<any>([])
    const [spinner, setSpinner] = useState(false)
    const [erroBool, setErroBool] = useState<boolean[]>(Array(8).fill(true));
    const [erroMsg, setErroMsg] = useState<string[]>(Array(8).fill(""));

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault();

        const payload = {
            email: dadosLogin[0],
            senha: dadosLogin[1],
        };

        const result = loginSchema.safeParse(payload);

        if (!result.success) {
            const formatted = result.error.format();
            const campos = [
                formatted.email?._errors[0],
                formatted.senha?._errors[0]
            ];

            setErroMsg(campos.map(c => c || ""));
            setErroBool(campos.map(c => !c));
            return;
        }

        setErroBool([true, true]);

        setSpinner(true)
        const responseData = await PostLoginAdmin(result.data)
        setSpinner(false)

        localStorage.setItem('token', responseData);
    }

    return (
        <Fragment>
            <div className="w-full h-svh bg-gray-200">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-gray-400 rounded-lg py-5 max-w-lg sm:w-full w-5/6 shadow-2xl bg-opacity-30 border border-gray-400">
                        <div className="w-full h-full flex justify-center items-center">
                            <div className="w-full px-4">
                                <form className="w-full" action="" onSubmit={(e) => handleLogin(e)}>
                                    <h1 className="text-2xl pb-4 font-medium text-center border-b border-gray-400">Login</h1>
                                    <div className="mt-4 w-full">
                                        <FormularioComponent
                                            dadosState={dadosLogin}
                                            setDadosState={setDadosLogin}
                                            label={["Email:", "Senha:"]}
                                            required={[true, true]}
                                            typeInput={["email", "password"]}
                                            QuantiaElementoLinha={1}
                                            placeholder={["exemplo@email.com", "Senha..."]}
                                            erro={erroBool}
                                            descricaoErro={erroMsg}
                                        />
                                    </div>
                                    <Button
                                        cor="#f2b00f"
                                        label="Entrar"
                                        ladoBotao="center"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {spinner === true &&
                <Spinner />
            }
        </Fragment>
    )
}