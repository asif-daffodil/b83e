import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import JesonServer from "../Components/JesonServer";
import { useForm } from "react-hook-form";


const JsonServerPage = () => {
    const getProduct = async () => {
        const { data } = await axios.get('http://localhost:3000/products');
        return data;
    }
    const { data, isFetched, refetch } = useQuery({ queryKey: ['getProduct'], queryFn: getProduct });

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async (data) => {
        const addProduct = await axios.post('http://localhost:3000/products', data);
        if(addProduct){
            refetch();
            reset();
        }
    }
    return (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <h2 className="text-center text-4xl py-5">Add Product</h2>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            className="w-full p-2 border-2 border-gray-300 rounded-lg"
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Product Name is required'
                                }
                            })}
                        />
                        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Product Price"
                            className="w-full p-2 border-2 border-gray-300 rounded-lg"
                            {...register('price', {
                                required: {
                                    value: true,
                                    message: 'Product Price is required'
                                },
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: 'Product Price must be a number'
                                }
                            })}
                        />
                        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                    </div>
                    <button className="w-full p-2 bg-blue-500 text-white rounded-lg">
                        Add Product
                    </button>
                </form>
            </div>
            {isFetched && (
                <div>
                    <h2 className="text-center text-4xl py-5">Products Data</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.map((product) => (
                            <JesonServer
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                className="bg-white p-4 rounded-lg shadow-md"
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JsonServerPage;