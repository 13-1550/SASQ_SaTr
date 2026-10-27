import React, { useState } from "react";
import {
  Bell, CircleUser, ArrowLeft, Upload, RefreshCw, Award, Store, CalendarDays,
  CircleAlert, FileBadge, CloudUpload, ShieldCheck, ListChecks, Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Button from "../../Components/Common/Button/Button";

// TODO: load from the API (e.g. by certificate id from the route)
const certificate = {
  name: "Certified Information Security Manager (CISM)",
  issuedBy: "SAUDIA Training Academy",
  issueDate: "12 Jan 2024",
  expiryDate: "11 Jan 2027",
  status: "Active",
  id: "CISM-SEC-2024-001",
  previewSrc: null, // e.g. import cismPreview from "../../../assets/cism-certificate.png"
};

const timeline = [
  { icon: CloudUpload, label: "Uploaded", date: "19 Jul 2026", time: "10:30 AM" },
  { icon: ShieldCheck, label: "Verified", date: "19 Jul 2026", time: "11:15 AM" },
  { icon: ListChecks, label: "Ongoing", note: "Currently Active" },
  { icon: Calendar, label: "Expiry Date", date: "11 Jan 2027", time: "11:59 PM" },
];

function DetailRow({ icon: Icon, label, value, children }) {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
      <Icon size={32} strokeWidth={1.6} className="text-emerald-800 shrink-0" />
      <div className="flex-1">
        <p className="font-bold">{label}</p>
        {value && <p className="text-sm">{value}</p>}
      </div>
      {children}
    </div>
  );
}

export default function EmployeeCertificates() {
  const navigate = useNavigate();
  const [isRenewing, setIsRenewing] = useState(false);

  const handleRenew = () => {
    setIsRenewing(true);
    // TODO: call the renew endpoint
    setTimeout(() => setIsRenewing(false), 800);
  };

  return (
    <div className="dashboard-page employee-dashboard">
      <Sidebar role="employee" />

      <main className="dashboard-content">
        <header className="page-header">
          <div>
            <h1 className="page-header-title">Certificate Details</h1>
            <p className="page-header-subtitle">View complete certificate information and validity status.</p>
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

        <div className="mb-4">
          <button
            type="button"
            onClick={() => navigate("/employee/certificates")}
            className="flex items-center gap-2 font-semibold text-emerald-800 hover:underline bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to My Certificates
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
          {/* Preview */}
          <div className="bg-white p-5 rounded-xl">
            <h2 className="text-lg font-bold mb-4">Certificate Preview</h2>
            <div className="bg-gray-100 rounded-lg p-3 min-h-[20rem] flex items-center justify-center">
              {certificate.previewSrc ? (
                <img src={certificate.previewSrc} alt="Certificate preview" className="w-full bg-white shadow" />
              ) : (
                <span className="text-xs text-gray-400">[ Certificate Document Preview ]</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-xl self-start">
            <DetailRow icon={Award} label="Certificate Name" value={certificate.name} />
            <DetailRow icon={Store} label="Issued By" value={certificate.issuedBy} />
            <DetailRow icon={CalendarDays} label="Issue Date" value={certificate.issueDate} />
            <DetailRow icon={CalendarDays} label="Expiry Date" value={certificate.expiryDate} />
            <DetailRow icon={CircleAlert} label="Status">
              <span className="px-4 py-1 bg-emerald-200 text-emerald-900 text-sm font-medium rounded-full">
                {certificate.status}
              </span>
            </DetailRow>
            <DetailRow icon={FileBadge} label="Certificate ID" value={certificate.id} />

            <div className="flex gap-3 p-3">
              <Button type="green" className="flex-1 flex items-center justify-center gap-2" onClick={() => navigate("/employee/upload")}>
                <Upload size={18} /> Upload Certificate
              </Button>
              <Button
                type="white"
                className="flex-1 flex items-center justify-center gap-2 text-emerald-800"
                onClick={handleRenew}
                disabled={isRenewing}
              >
                <RefreshCw size={18} className={isRenewing ? "animate-spin" : ""} /> Renew Certificate
              </Button>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white px-6 py-5 rounded-xl lg:col-span-2">
            <h2 className="text-lg font-bold mb-4">Certificate Timeline</h2>
            <div className="relative flex justify-around">
              <div className="absolute top-6 left-[12%] right-[12%] border-t border-dashed border-gray-400" />
              {timeline.map(({ icon: Icon, label, date, time, note }) => (
                <div key={label} className="relative z-10 flex flex-col items-center text-center">
                  <span className="w-14 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-1">
                    <Icon size={24} className="text-emerald-800" />
                  </span>
                  <p className="font-bold">{label}</p>
                  {note ? (
                    <p className="text-xs font-bold text-emerald-700">{note}</p>
                  ) : (
                    <p className="text-sm leading-snug">{date}<br />{time}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}