import React from 'react';

export default function Card(props) {
    const { _id, CategoryName, name, img, options, description } = props.item;

    // Check if options is an array and contains objects
    const renderOptions = () => {
        if (Array.isArray(options) && options.length > 0) {
            return (
                <>
                    {options.map((option, index) => (
                        <option key={index} value={option.half || option.full}>
                            {option.half ? `Half - ${option.half}` : `Full - ${option.full}`}
                        </option>
                    ))}
                </>
            );
        }
        return <option value="">No options available</option>;
    };

    return (
        <div>
            <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
                <img
                    className="card-img-top"
                    src={img}
                    alt={name}
                    style={{
                        width: '100%',
                        height: '180px', // Fixed height for the image
                        objectFit: 'cover', // Ensures the image covers the area without distortion
                    }}
                />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <div className='container' style={{ width: "100%" }}>
                        <select className='m-2 h-100 bg-success'>
                            {renderOptions()}
                        </select>
                        <div className='d-inline fs-5'>Total price</div>
                    </div>
                </div>
            </div>
        </div>
    );
}


