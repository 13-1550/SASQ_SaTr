import React from "react";

const Table = ({
    headers = [],
    data = [],
    fields = [],
    className = "",
    actions
}) => {
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
            {actions && <th>Details</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick?.(row)}
                            >
                                {fields.map((field, cellIndex) => (
                                    <td key={cellIndex}>
                                        {Array.isArray(row[field])
                                            ? row[field].join(", ")
                                            : row[field]}
                                    </td>
                                ))}

                                {actions && (
                    <td>
                        {actions(row)}
                    </td>
                )}

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