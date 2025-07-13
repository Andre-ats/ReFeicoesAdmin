import { ChevronDown, Eye, EyeOff } from "lucide-react";
import { FocusEvent, useEffect, useState } from "react";
import ReactInputMask from "react-input-mask";

interface InputForms {
  dadosState: string[];                   // estado externo
  setDadosState: (v: string[]) => void;

  /* aparência / validação */
  QuantiaElementoLinha?: number;
  typeInput: string[];                    // "text" | "email" | "password" | "Enum"…
  label: string[];
  required: boolean[];
  disabled?: boolean[];
  placeholder?: string[];
  regex?: string[];
  inputMask?: (string | undefined)[];

  /* feedback de erro */
  erro?: boolean[];
  descricaoErro?: string[];

  /* blur handlers */
  onBlur?: ((e: FocusEvent<HTMLInputElement>) => void)[];

  /* enum para selects */
  Enum?: any[];                           // array de arrays
}

export function FormularioComponent(props: InputForms) {
  /* estado interno espelhando dadosState */
  const [getValue, setValue] = useState<string[]>(props.dadosState ?? []);

  /* controle de visibilidade de senha */
  const [showPassword, setShowPassword] = useState<boolean[]>(
    props.typeInput.map(() => false)
  );

  const togglePassword = (idx: number) => {
    setShowPassword(prev => {
      const arr = [...prev];
      arr[idx] = !arr[idx];
      return arr;
    });
  };

  /* onChange genérico p/ input & select */
  const setController = (val: string, idx: number) => {
    setValue(prev => {
      const arr = [...prev];
      arr[idx] = val;
      props.setDadosState(arr);
      return arr;
    });
  };

  /* sincroniza quando pai altera */
  useEffect(() => setValue(props.dadosState), [props.dadosState]);

  /* ---------------------------------------------------------------- */
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${props.QuantiaElementoLinha ?? 2}, 1fr)`,
        gap: "8px",
        width: "100%"
      }}
    >
      {props.label.map((lab, idx) => {
        const value = getValue[idx] ?? "";
        const isEmpty = value === "";
        const isEnum = props.typeInput[idx] === "Enum";

        return (
          <div key={idx} className="w-full mb-4">
            <label className="block text-black text-sm font-medium mb-1">
              {lab}
            </label>

            {isEnum && Array.isArray(props.Enum?.[idx]) && (
              <div className="relative w-1/2"> {/* mantém w-1/2 aqui */}
                <select
                  className={`
        block w-full bg-white rounded-lg border px-4 py-2 mt-3 h-10 text-sm
        pr-10 appearance-none                         /* esconde seta nativa */
        ${props.erro?.[idx] === false ? "border-red-300" : "border-light-500"}
        ${isEmpty ? "text-neutral-400" : "text-black"}
        disabled:opacity-75 disabled:bg-neutral-200/60
        focus:outline-none focus:border-neutral-400 focus:ring-neutral-400 focus:ring-0
      `}
                  value={value}
                  required={props.required[idx]}
                  disabled={props.disabled?.[idx]}
                  onChange={e => setController(e.target.value, idx)}
                >
                  <option disabled value="">Selecione uma opção...</option>
                  {props.Enum[idx].map((opt: string, i: number) => (
                    <option key={i} value={opt} className="text-black text-sm">
                      {opt}
                    </option>
                  ))}
                </select>

                {/* Ícone customizado */}
                <ChevronDown
                  size={18}
                  className="pointer-events-none text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2"
                />
              </div>
            )}


            {/* --------- INPUT normal/masked --------- */}
            {!isEnum && (
              <div className="relative w-full">
                <ReactInputMask
                  className={`
                    w-full bg-white text-sm rounded-lg border mt-2 pl-2 h-10
                    ${props.erro?.[idx] === false ? "border-red-300" : "border-light-500"}
                    rounded-[12px] disabled:opacity-75 disabled:bg-neutral-200/60
                    placeholder:text-muted focus:outline-none focus:border-neutral-400 focus:ring-neutral-400 focus:ring-0
                  `}
                  placeholder={
                    props.placeholder?.[idx] ?? `${props.label[idx]}...`
                  }
                  type={
                    props.typeInput[idx] === "password"
                      ? showPassword[idx]
                        ? "text"
                        : "password"
                      : props.typeInput[idx]
                  }
                  value={value}
                  onChange={e => setController(e.target.value, idx)}
                  disabled={props.disabled?.[idx]}
                  pattern={props.regex?.[idx]}
                  mask={props.inputMask?.[idx] ?? ""}
                  maskChar={null}
                  required={props.required[idx]}
                  onBlur={props.onBlur?.[idx]}
                />

                {props.typeInput[idx] === "password" && (
                  <button
                    type="button"
                    onClick={() => togglePassword(idx)}
                    className="absolute mt-1.5 right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                    tabIndex={-1}
                  >
                    {showPassword[idx] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                )}
              </div>
            )}

            {/* mensagem de erro campo-a-campo */}
            {props.erro?.[idx] === false && (
              <p className="font-semibold text-xs text-red-600 ml-2 w-full break-words mt-2">
                {props.descricaoErro?.[idx]}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}