import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";


const SingleJsonServerPage = () => {
    // useParams id
    const { id } = useParams();
    const getProduct = async () => {
        const { data } = await axios.get(`http://localhost:3000/products/${id}`);
        return data;
    }
    const { data, isFetched } = useQuery({ queryKey: ['getSingleProduct'], queryFn: getProduct });
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    return (
        <div className="container mx-auto grid grid-cols-1">
            {isFetched && (
                <div>
                    <h2 className="text-4xl py-5">{data.name}</h2>
                    <div className="pb-5">
                        <p className="text-sm">Price: {data.price}</p>
                        <p className="text-sm">Description: {data.description}</p>
                    </div>
                    <div>
                        <Link to={`/JSON-Server-edit/${id}`}className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Edit</Link>
                        <Link className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">Delete</Link>
                        <button className="bg-black text-white px-4 py-2 rounded-lg" onClick={() => handleBack()}>Back</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SingleJsonServerPage;