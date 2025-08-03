import { useState } from "react";

interface IComponentImagem {
    setImagem: (imagem: File | null) => void;
}

export function ComponentImagem({ setImagem }: IComponentImagem) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        
        if (file) {
            setImagem(file);
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };

            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full mt-10 p-6 border-2 border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <label className="block text-lg font-semibold text-gray-700 mb-4">Escolha uma imagem</label>
            <div className="w-full flex justify-center items-center">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="upload-image"
                />
                <label
                    htmlFor="upload-image"
                    className="cursor-pointer w-40 h-40 flex justify-center items-center bg-gray-200 border-2 border-gray-300 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Imagem selecionada"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <span className="text-gray-500 text-center">Clique para selecionar</span>
                    )}
                </label>
            </div>

            {imagePreview && (
                <div className="mt-4 text-sm text-gray-600">
                    <p>Imagem selecionada</p>
                </div>
            )}
        </div>
    );
}
