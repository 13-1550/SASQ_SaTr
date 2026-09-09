import React from "react";

const Table = ({ headers = [], data = [], className = "" }) => {
    return (
        <div className={`table-container ${className}`}>
            <table className="table">
                
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {Object.values(row).map((cell, cellIndex) => (
                                    <td key={cellIndex}>
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={headers.length}
                                className="table-empty"
                            >
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