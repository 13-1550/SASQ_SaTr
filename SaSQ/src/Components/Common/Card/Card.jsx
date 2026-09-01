import React from 'react';

const Card = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <div className={`bg-white shadow-sm rounded-xl p-5 border border-gray-100 transition-all ${className}`}>
      {(title || action) && (
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-50">
          <div>
            {title && <h3 className="text-base font-bold text-gray-800">{title}</h3>}
            {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;