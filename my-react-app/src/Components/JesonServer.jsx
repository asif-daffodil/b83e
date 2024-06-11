

const JesonServer = ({name, price}) => {
    return (
        <>
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
                <h3 className="font-semibold text-lg">{name}</h3>
                <p className="text-sm">Price: {price}</p>
            </div>   
        </>
    );
};

export default JesonServer;