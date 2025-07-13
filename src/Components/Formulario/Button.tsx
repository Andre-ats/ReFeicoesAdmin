import { Fragment } from "react/jsx-runtime";

interface IButton{
    botaoEnvioBool?: boolean
    label: string
    cor: string
    acao?: any
    ladoBotao?: string
}

export function Button(props : IButton){

    return(
        <Fragment>
            <div style={{marginTop:"20px", display:"flex", justifyContent:`${props.ladoBotao ? props.ladoBotao : "end"}`, backgroundColor:props.cor}} className="relative rounded-md">
                <input 
                    id="btn_cadastrarConsumidorPremiado"
                    style={{cursor:"pointer", borderRadius:"8px"}}
                    type="submit" 
                    className={`text-black font-semibold w-96 h-[41px] bg-redButton disabled:opacity-60 rounded `} 
                    value={props.label}
                    onClick={props.acao}
                    //disabled={loadingValidation || props.botaoEnvioBool}
                />
            </div>
        </Fragment>
    )
}