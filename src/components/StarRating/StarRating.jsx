import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ onChange }) => {
    const [rating, setRating] = useState(0);

    const handleClick = (value) => {
        setRating(value);
        onChange(value);
    };

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => handleClick(star)}
                    className="text-2xl focus:outline-none cursor-pointer text-base-content/60"
                >
                    {star <= rating ? <FaStar className="text-red-500" /> : <FaStar className="text-neutral-300" />}
                </button>
            ))}
        </div>
    );
};

export default StarRating;
