import React from 'react';

const Member = ({ name, email, phone, website, address}) => {
    return (
        <div className="bg-gray-200 p-4 rounded-lg">
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600">Email: {email}</p>
            <p className="text-gray-600">Phone: {phone}</p>
            <p className="text-gray-600">Website: {website}</p>
            <p className="text-gray-600">Address: {address.city}</p>
        </div>
    );
};

export default Member;