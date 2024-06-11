import { useState } from 'react';
import pionsData from '../json/generated.json';

const Pions = () => {
    const [pions] = useState(pionsData);
    return (
        <div className='container mx-auto'>
            <h2 className="text-center text-4xl py-5">Pions Data</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pions.map((pion) => (
                    <div key={pion._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                        <h3 className="font-semibold text-lg">{pion.name}</h3>
                        <p className="text-sm">Age: {pion.age}</p>
                        <p className="text-sm">Gender: {pion.gender}</p>
                        <p className="text-sm">Phone: {pion.phone}</p>
                        <p className="text-sm">Address: {pion.address}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pions;