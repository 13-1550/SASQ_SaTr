import React, { useState } from 'react';
import {
  Bell,
  CircleUser,
  ArrowLeft,
  Upload,
  RefreshCw,
  Award,
  Building,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Button from "../../Components/Common/Button/Button";

export default function EmployeeCertificates() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page employee-dashboard">
      <Sidebar role="employee" label="Certificates" />

      <main className="dashboard-content">
        {/* Page Header */}
        <header className="page-header">
          <div>
            <h1 className="page-header-title">
              Certificate Details
            </h1>
            <p className="page-header-subtitle">
              View complete certificate information and validity status.
            </p>
          </div>

          <div className="page-header-user">
            <button type="button" className="notification-btn" aria-label="Notifications">
              <Bell size={24} />
              <span className="notification-badge">1</span>
            </button>

            <CircleUser size={46} className="user-avatar" />

            <div className="user-info">
              <span className="user-name">Omar Mohammed</span>
              <span className="user-role">Employee</span>
            </div>
          </div>
        </header>

        {/* Back Link */}
        <div className="mb-4">
          <button 
            type="button" 
            onClick={() => navigate("/employee/main")}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl">
          
          {/* Certificate Preview Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1 flex flex-col">
            <h2 className="text-sm font-semibold mb-3 text-gray-800">Certificate Preview</h2>
            <div className="bg-gray-100 border border-gray-200 p-4 rounded-xl min-h-[260px] flex items-center justify-center flex-1 shadow-inner">
              <span className="text-xs text-gray-400 text-center">[ Certificate Document Preview ]</span>
            </div>
          </div>

          {/* Certificate Metadata List */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              
              <div className="p-3 border rounded-xl flex items-start gap-3 bg-gray-50/50">
                <Award size={20} className="text-emerald-700 mt-0.5" />
                <div>
                  <p className="text-gray-400">Certificate Name</p>
                  <p className="font-bold text-gray-800">Certified Information Security Manager (CISM)</p>
                </div>
              </div>

              <div className="p-3 border rounded-xl flex items-start gap-3 bg-gray-50/50">
                <Building size={20} className="text-emerald-700 mt-0.5" />
                <div>
                  <p className="text-gray-400">Issued By</p>
                  <p className="font-bold text-gray-800">SAUDIA Training Academy</p>
                </div>
              </div>

              <div className="p-3 border rounded-xl flex items-start gap-3 bg-gray-50/50">
                <Calendar size={20} className="text-emerald-700 mt-0.5" />
                <div>
                  <p className="text-gray-400">Issue Date</p>
                  <p className="font-bold text-gray-800">12 Jan 2024</p>
                </div>
              </div>

              <div className="p-3 border rounded-xl flex items-start gap-3 bg-gray-50/50">
                <Calendar size={20} className="text-emerald-700 mt-0.5" />
                <div>
                  <p className="text-gray-400">Expiry Date</p>
                  <p className="font-bold text-gray-800">11 Jan 2027</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-xl bg-gray-50/50 text-xs">
              <span className="font-medium text-gray-600">Status</span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 border rounded-xl bg-gray-50/50 text-xs">
              <span className="font-medium text-gray-600">Certificate ID</span>
              <span className="font-bold text-gray-800">CISM-SEC-2024-001</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <Button type="green" className="flex-1 flex items-center justify-center gap-2" onClick={() => navigate("/employee/upload")}>
                <Upload size={16} /> Upload Certificate
              </Button>
              <Button type="white" className="flex-1 flex items-center justify-center gap-2 border border-emerald-700 text-emerald-800">
                <RefreshCw size={16} /> Renew Certificate
              </Button>
            </div>
          </div>

          {/* Timeline Component */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 lg:col-span-3">
            <h3 className="text-xs font-semibold mb-6 text-gray-700">Certificate Timeline</h3>
            <div className="flex items-center justify-between relative px-6">
              <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gray-200 -z-0 -translate-y-1/2" />
              
              <div className="z-10 bg-white px-2 text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1 text-xs font-bold">☁</div>
                <p className="text-xs font-bold text-gray-800">Uploaded</p>
                <p className="text-[10px] text-gray-400">19 Jul 2026</p>
              </div>

              <div className="z-10 bg-white px-2 text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-1 text-xs font-bold">✓</div>
                <p className="text-xs font-bold text-gray-800">Verified</p>
                <p className="text-[10px] text-gray-400">19 Jul 2026</p>
              </div>

              <div className="z-10 bg-white px-2 text-center">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center mx-auto mb-1 text-xs font-bold">★</div>
                <p className="text-xs font-bold text-emerald-700">Ongoing</p>
                <p className="text-[10px] text-emerald-600 font-medium">Currently Active</p>
              </div>

              <div className="z-10 bg-white px-2 text-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto mb-1 text-xs font-bold">📅</div>
                <p className="text-xs font-bold text-gray-800">Expiry Date</p>
                <p className="text-[10px] text-gray-400">11 Jan 2027</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}