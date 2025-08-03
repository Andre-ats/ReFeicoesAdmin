interface IStep {
    label: string;
}

interface IStepper {
    passos: IStep[];
    passoAtual: number;
}

export function Stepper(props: IStepper) {
    return (
        <div className="flex items-center justify-between w-full max-w-xl mx-auto py-8">
            {props.passos.map((step, index) => {
                const isPast = index < props.passoAtual;
                const isCurrent = index === props.passoAtual;

                let circleStyle = "";
                if (isPast) {
                    circleStyle = "bg-marromReFeicoes text-white border-marromReFeicoes";
                } else if (isCurrent) {
                    circleStyle = "bg-amareloReFeicoes text-white border-amareloReFeicoes";
                } else {
                    circleStyle = "bg-white text-gray-400 border-white";
                }

                let lineStyle = "";
                if (isPast) {
                    lineStyle = "bg-amareloReFeicoes";
                } else if (isCurrent) {
                    lineStyle = "bg-amareloReFeicoes";
                } else {
                    lineStyle = "bg-amareloReFeicoes";
                }

                return (
                    <div key={index} className="flex-1 flex flex-col items-center relative">
                        {index !== props.passos.length - 1 && (
                            <div
                                className={`absolute top-4 left-1/2 w-full h-0.5 z-0 ${lineStyle}`}
                            />
                        )}
                        <div
                            className={`z-10 w-8 h-8 rounded-full flex items-center justify-center border text-sm font-semibold ${circleStyle}`}
                        >
                            {index + 1}
                        </div>
                        <span className="mt-2 text-sm text-gray-700">{step.label}</span>
                    </div>
                );
            })}
        </div>
    );
}
