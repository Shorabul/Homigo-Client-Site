import React from 'react';

const MyServiceRow = ({ service, index }) => {
    console.log(service);
    const { serviceName,
        category,
        serviceImageURL,
        providerName,
        providerEmail,
        price,
    } = service;
    return (
        <tr>
            <th>{index}</th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={serviceImageURL}
                                alt={serviceName} />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{serviceName}</div>
                        <div className="text-sm opacity-50">{category}</div>
                    </div>
                </div>
            </td>
            <td>
                {providerName}
                <br />
                <span className="badge badge-ghost badge-sm">{providerEmail}</span>
            </td>
            <td>{price}</td>
            <th>
                <button className="btn btn-ghost btn-xs">Details</button>
                <button className="btn btn-ghost btn-xs">Update</button>
                <button className="btn btn-ghost btn-xs">Remove</button>
            </th>
        </tr>
    );
};

export default MyServiceRow;