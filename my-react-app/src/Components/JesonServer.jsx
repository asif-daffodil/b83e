import { Link } from "react-router-dom";


const JesonServer = ({name, price, id}) => {
    return (
        <>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <Link to={`/JSON-Server/${id}`} className="font-semibold text-lg">{name}</Link>
                <p className="text-sm">Price: {price}</p>
            </div>   
        </>
    );
};

export default JesonServer;