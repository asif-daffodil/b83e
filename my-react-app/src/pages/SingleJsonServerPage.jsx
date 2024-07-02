import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";


const SingleJsonServerPage = () => {
    // useParams id
    const { id } = useParams();
    const [delAlert, setDelAlert] = useState("invisible, opacity-0");
    const getProduct = async () => {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        return data;
    }
    const { data, isFetched } = useQuery({ queryKey: ['getSingleProduct'], queryFn: getProduct });
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    const handleDelete = async () => {
        const deleteProduct = await axios.delete(`http://localhost:3000/products/${id}`);
        if(deleteProduct){
            toast.error('Product deleted');
            setTimeout(() => {
            navigate(-1);
            }, 2000);
        }
    }
    return (
        <div className="container mx-auto grid grid-cols-1">
            <ToastContainer autoClose={2000} theme="dark" />
            {isFetched && (
                <div>
                    <h2 className="text-4xl py-5">{data.name}</h2>
                    <div className="pb-5">
                        <p className="text-sm">Price: {data.price}</p>
                        <p className="text-sm">Description: {data.description}</p>
                    </div>
                    <div className="mb-4">
                        <Link to={`/JSON-Server-edit/${id}`}className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Edit</Link>
                        <Link className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2" onClick={()=> setDelAlert("translate-y-0, visible, opacity-1")}>Delete</Link>
                        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={() => handleBack()}>Back</button>
                    </div>
                    <div className={`transition-all duration-500 ${delAlert}`}>
                        <h2 className="text-2xl text-red-600 mb-2">Dou you really want to delete the product?</h2>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2" onClick={() => handleDelete()}>Yes</button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setDelAlert("invisible, opacity-0")}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleJsonServerPage;