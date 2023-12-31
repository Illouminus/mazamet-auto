import React, {memo, useCallback, useEffect, useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from "axios";
import {Sidebar} from "@/components/AdminPage/Sidebar/Sidebar";
import {Toaster, toast} from "react-hot-toast";
import {useAppDispatch} from "@/lib/useAppDispatch/useAppDispatch";
import {Loader} from "@/components/Loader/Loader";


type FormValues = {
    brand: string,
    newBrand: string,
    model: string,
    newModel: string,
    category: string,
    newCategory: string,
    name: string,
    price: string,
    quantity: string,
    description: string,
    images: File[]
};

type BrandValues = {
    id: string
    name: string
}

export const AddProductForm = memo(() => {
    const { register, handleSubmit, watch, reset } = useForm<FormValues>();
    const [brands, setBrands] = useState<BrandValues[]>([]);
    const [models, setModels] = useState<BrandValues[]>([]);
    const [categories, setCategories] = useState<BrandValues[]>([]);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch()

    const brand = watch('brand');
    const model = watch('model');


    const apiCall = useCallback(async (url: string, setter: React.Dispatch<React.SetStateAction<BrandValues[]>>) => {
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setter(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    }, []);



    useEffect(() => {
        apiCall('/api/filter/brands', setBrands);
    }, [apiCall]);

    useEffect(() => {
        if (brand && brand !== 'other') {
            apiCall(`/api/filter/models?brand=${brand}`, setModels);
        } else {
            setModels([]);
        }
    }, [brand, apiCall]);

    useEffect(() => {
        if (model && model !== 'other') {
            apiCall(`/api/filter/categories?model=${model}`, setCategories);
        } else {
            setCategories([]);
        }
    }, [model, apiCall]);

    async function getPresignedUrl(name: string, type: string) {
        const response = await axios.post('/api/products/uploadaws', { name, type });
        return response.data.url;
    }

     function getUploadedUrl(name: string) {
         const BUCKET_URL = "https://les-amoureuses.s3.eu-west-3.amazonaws.com/";
            return BUCKET_URL + name
    }

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsLoading(true);

        try {
            let result = { ...data };

            const brandObj = brands.find(brand => brand.id === data.brand);
            const modelObj = models.find(model => model.id === data.model);
            const categoryObj = categories.find(category => category.id === data.category);

            result.brand = brandObj ? brandObj.name : (result.brand === 'other' ? result.newBrand : result.brand);
            result.model = modelObj ? modelObj.name : (result.model === 'other' ? result.newModel : result.model);
            result.category = categoryObj ? categoryObj.name : (result.category === 'other' ? result.newCategory : result.category);

            const { newBrand, newModel, newCategory, images, ...rest } = result;

            const imagesArray = Array.from(images);
            const urls = await Promise.all(imagesArray.map(file => getPresignedUrl(file.name, file.type)));
            const uploadedURL = imagesArray.map(file => getUploadedUrl(file.name));

            await Promise.all(urls.map((url, index) => {
                return axios.put(url, imagesArray[index], {
                    headers: {
                        'Content-Type': imagesArray[index].type,
                        "Access-Control-Allow-Origin": "*",
                    }
                });
            }));

            const finalData = { ...rest, images: uploadedURL };
            const response = await axios.post('/api/products', finalData);

            if (response.status === 200) {
                toast.success('Votre article à été ajouté');
                setStep(1);
                reset();
            } else {
                toast.error('Une erreur est survenue');
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error('Une erreur est survenue lors de l’ajout du produit');
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <div className="flex h-full">
            <Toaster/>
            <Sidebar />
        <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto overflow-hidden flex flex-col items-center justify-center h-screen mt-6">
            {isLoading ? (
                <div className="flex items-center justify-center h-full">
                        <Loader />
                </div>
            ):
                (
                    <form className="bg-white shadow-md overflow-hidden rounded px-4 sm:px-6 md:px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            {step === 1 && (
                                <div>
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2" htmlFor="brand">
                                        Marque:
                                    </label>
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('brand')}>
                                        {brands.length > 0 ?  brands.map((brand, index) => <option
                                                key={index}
                                                value={brand.id}
                                            >{brand.name}</option>)
                                            : null
                                        }
                                        <option value="other">Autre</option>
                                    </select>
                                    {watch('brand') === 'other' || brands.length === 0 ? (
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" id="otherBrand" type="text" {...register('newBrand')} placeholder="Entrer une nouvelle marque" />
                                    ) : (
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" id="otherBrand" type="text" style={{ visibility: 'hidden' }} placeholder="Entrer une nouvelle marque" />
                                    )}
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2 mt-4" htmlFor="model">
                                        Model:
                                    </label>
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('model')}>
                                        {models.length > 0 ? models.map((model, index) => <option key={index} value={model.id}>{model.name}</option>) : null}
                                        <option value="other">Autre</option>
                                    </select>
                                    {watch('model') === 'other' || models.length === 0 ? (
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" id="otherModel" type="text" {...register('newModel')} placeholder="Entrer nouveau modèle" />
                                    ) : (
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" id="otherModel" type="text" style={{ visibility: 'hidden' }} placeholder="Entrer nouveau modèle" />
                                    )}
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4" type="button" onClick={() => setStep(2)}>
                                        Continuer
                                    </button>
                                </div>
                            )}
                            {step === 2 && (
                                <div>
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2" htmlFor="category">
                                        Categorie:
                                    </label>
                                    <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register('category')}>
                                        {categories.length > 0 ? categories.map((category, index) => <option key={index} value={category.id}>{category.name}</option>) : null}
                                        <option value="other">Autre</option>
                                    </select>
                                    {watch('category') === 'other'  || categories.length === 0 ?(
                                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" id="otherCategory" type="text" {...register('newCategory')} placeholder="Ajouter une nouvelle categorié" />
                                        ) :
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" id="otherCategory" type="text" style={{ visibility: 'hidden' }} placeholder="Ajouter une nouvelle categorié"  />
                                    }
                                    <div className="flex justify-between mt-4">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setStep(1)}>
                                            Precedent
                                        </button>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setStep(3)}>
                                            Continuer
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div className="mt-20">
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2 mt-4" htmlFor="name">
                                        Le nom de la piece:
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" {...register('name')} />
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2 mt-4" htmlFor="price">
                                        Prix:
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" {...register('price')} />
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2 mt-4" htmlFor="quantity">
                                        Quantité:
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="quantity" type="number" {...register('quantity')} />
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2 mt-4" htmlFor="description">
                                        Description:
                                    </label>
                                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" {...register('description')} />
                                    <label className="block text-gray-700 text-sm sm:text-base font-bold mb-2 mt-4" htmlFor="images">
                                        Images:
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="images" type="file" {...register('images')} multiple />
                                    <div className="flex justify-between mt-4">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setStep(2)}>
                                            Precedent
                                        </button>
                                        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Envoyer" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </form>
                )
            }

            <div className="bg-gray-300 w-full rounded h-2">
                <div className={`bg-blue-500 rounded h-2 transition-all duration-500 ease-in-out ${step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'}`}></div>
            </div>
        </div>
        </div>
    );
});

export const fetchCache = 'force-no-store';
