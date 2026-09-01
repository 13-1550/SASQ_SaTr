import React from 'react';

const Table = ({ headers = [], data = [], className = '' }) => {
  return (
    <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-100">
      <table className={`min-w-full text-left text-sm text-gray-600 ${className}`}>
        <thead className="bg-[#F8F9FA] text-gray-700 uppercase text-xs font-semibold tracking-wider border-b border-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50/80 transition-colors">
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 text-gray-800 font-medium">
                    {cell === 'Active' || cell === 'نشط' ? (
                      <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-50 rounded-full border border-green-200">
                        {cell}
                      </span>
                    ) : cell === 'Expired' || cell === 'منتهي' ? (
                      <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-50 rounded-full border border-red-200">
                        {cell}
                      </span>
                    ) : cell === 'Pending' || cell === 'قيد المعالجة' ? (
                      <span className="px-3 py-1 text-xs font-semibold text-amber-700 bg-amber-50 rounded-full border border-amber-200">
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-8 text-center text-gray-400 font-normal">
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;