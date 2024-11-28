import { isImageUrl } from "@/helpers/validator";
import { useState } from "react";

interface FormProductProps {
  reloadProducts: () => Promise<void>;
  setAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	buttonName: string;
}

const url = process.env.beUrl as string;

export const FormProduct: React.FC<FormProductProps> = ({ reloadProducts, setIsOpen, buttonName }) => {
	const [category, setCategory] = useState('');
	const [name, setName] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [description, setDescription] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
	const [isImageValid, setIsImageValid] = useState(true);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setIsOtherSelected(selectedCategory === 'otro');
  };

	const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setImageUrl(value);
		setIsImageValid(isImageUrl(value));
	};

	const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${url}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          imageUrl,
          description,
          category,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`Error al publicar los datos: ${JSON.stringify(data)}`);
      }

      await reloadProducts();
      setIsOpen(false);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

	return (								
		<form onSubmit={handleFormSubmit} className="p-4 md:p-5">
			<div className="grid gap-4 mb-4 grid-cols-2">
				<div className="col-span-2">
					<label
						htmlFor="name"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Nombre <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="name"
						id="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="Escribe el nombre del producto"
						required
						value={name}
  					onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="col-span-2 sm:col-span-1">
					<label
						htmlFor="imageUrl"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						URL de la Imagen <span className="text-red-500">*</span>
					</label>
					<input
						type="text"
						name="imageUrl"
						id="imageUrl"
						placeholder="https://example.com/image.jpg"
						required
						value={imageUrl}
						onChange={handleImageUrlChange}
						className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${
							isImageValid ? 'border-gray-300' : 'border-red-500'
						}`}
					/>
					{!isImageValid && <p className="text-red-500 text-sm">Por favor, ingresa una URL de imagen válida.</p>}
				</div>
				<div className="col-span-2 sm:col-span-1">
					<label
						htmlFor="category"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Categoría
					</label>
					<select
						id="category"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						value={category}
						onChange={handleCategoryChange}
					>
						<option value="">Seleccionar categoría</option>
						<option value="almacen">Almacén</option>
						<option value="bebidas">Bebidas</option>
						<option value="comida-preparada">Comida preparada</option>
						<option value="congelados">Congelados</option>
						<option value="frescos">Frescos</option>
						<option value="otro">Otro</option>
					</select>

					{isOtherSelected && (
						<input
							type="text"
							placeholder="Especificar otra categoría"
							className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						/>
					)}
				</div>
				<div className="col-span-2">
					<label
						htmlFor="description"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Descripción del producto
					</label>
					<textarea
						id="description"
						className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
						placeholder="Escribe la descripción del producto"
						value={description}
  					onChange={(e) => setDescription(e.target.value)}
					></textarea>
				</div>
			</div>
			<button
				type="submit"
				className="justify-center align-content: center text-white inline-flex text-center hover:text-center items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				<svg
					className="me-1 -ms-1 w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
						clipRule="evenodd"
					></path>
				</svg>
				{buttonName}
			</button>
		</form>
	)
}