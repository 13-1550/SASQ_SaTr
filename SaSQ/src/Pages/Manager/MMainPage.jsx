import { useState } from "react";

import Sidebar from "./Components/Common/Sidebar/Sidebar";
import Card from "./Components/Common/Card/Card";
import Table from "./Components/Common/Table/Table";
import StatusBadge from "./Components/Common/StatusBadge/StatusBadge";


    
    <div className="table-title">
        Training Courses
    </div>
    const headers = [
        "ID",
        "Name",
        "Valid",
        "Soon to Expire",
        "Expired",
        "Warnings"
    ];

   const data = [
    {
        id: "SA091",
        name: "Sara Omar",
        valid: 5,
        soonToExpire: 2,
        expired: 1,
        warnings: 1
    },
    {
        id: "SA092",
        name: "Ahmed Ali",
        valid: 4,
        soonToExpire: 3,
        expired: 0,
        warnings: 1
    }
];