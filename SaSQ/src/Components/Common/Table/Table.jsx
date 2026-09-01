import React from 'react';

const Table = ({ headers = [], data = [], className = '' }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
      <table className={`min-w-full bg-white text-left text-sm text-gray-500 ${className}`}>
        <thead className="bg-gray-100 text-gray-700 uppercase font-medium">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="px-6 py-4 text-center text-gray-400">
                لا توجد بيانات متاحة
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;