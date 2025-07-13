import { Oval } from "react-loader-spinner";

export function Spinner(){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="p-6 rounded-lg flex flex-col justify-center items-center">
                <Oval
                    height={80}
                    width={80}
                    ariaLabel="loading"
                    color="white"
                    secondaryColor="#f2b00f"
                />
            </div>
        </div>
    )
}