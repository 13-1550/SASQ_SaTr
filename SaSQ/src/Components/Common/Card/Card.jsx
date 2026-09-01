import React from 'react';
import './Card.css'; // لو فيه ملف تصميم خاص فيه، أو نكتفي بالـ Tailwind/CSS العام

const Card = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 border border-gray-200 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;