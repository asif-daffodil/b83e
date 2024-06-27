import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const EditJsonServerPage = () => {
    const { id } = useParams();
    const getProduct = async () => {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        return data;
    }
    const { data, isFetched } = useQuery({ queryKey: ['getSingleProductEdit'], queryFn: getProduct });
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    useEffect(() => {
        reset({
            name: data?.name,
            price: data?.price,
            description: data?.description
        });
    }, [data, isFetched, reset]);
    const onSubmit = async (data) => {
        const updateProduct = await axios.put(`http://localhost:3000/products/${id}`, data);
        if(updateProduct){
            console.log('Product updated');
        }
    }

    return (
        <div className="container mx-auto grid md:grid-cols-2 gap-4 py-6">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        {...register('name', {
                            required: {
                                value: true,
                                message: 'Name is required'
                            }
                        })}
                    />
                    {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="text"
                        placeholder="Enter price"
                        {...register('price', {
                            required: {
                                value: true,
                                message: 'Price is required'
                            },
                            pattern: {
                                value: /^[0-9]+$/,
                                message: 'Price must be a number'
                            }
                        })}
                    />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        type="text"
                        placeholder="Enter description"
                        {...register('description', {
                            required: {
                                value: true,
                                message: 'Description is required'
                            },
                            minLength: {
                                value: 10,
                                message: 'Description must be at least 10 characters'
                            }
                        })}
                    >
                    </textarea>
                    {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
            <div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At illum dolorum rem quod tempore quos ipsam provident perferendis deserunt iste, qui sint. Corrupti similique ratione odit nostrum, blanditiis unde vel incidunt praesentium itaque ut voluptas, dolor est laboriosam voluptate assumenda nesciunt eos velit asperiores atque dicta ducimus architecto explicabo dignissimos. Aliquam modi vel ullam tenetur laborum rem vero ex nihil.
            </div>
        </div>
    );
};

export default EditJsonServerPage;