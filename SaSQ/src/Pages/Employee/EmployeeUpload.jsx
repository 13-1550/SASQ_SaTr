import React, { useRef, useState } from "react";
import { Bell, CircleUser, UploadCloud, CheckCircle, FileText, Trash2, CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Button from "../../Components/Common/Button/Button";
import EmployeeHeader from "./EmployeeHeader";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

// TODO: replace with the AI extraction response from the API
const extracted = {
  name: "Certified Information Security Manager (CISM)",
  issueDate: "12 / 01 / 2024",
  expiryDate: "11 / 01 / 2027",
  issuedBy: "SAUDIA TRAINING ACADEMY",
  signature: "Available",
  grade: "Pass",
  validity: "3 Years",
  confidence: "95%",
};



function InfoBox({ label, value, checked }) {
  return (
    <div className="upload-info-box">
      <div>
        <p className="upload-info-label">{label}</p>
        <p className="upload-info-value">{value}</p>
      </div>
      {checked && <CircleCheck size={28} strokeWidth={1.4} className="text-emerald-700" />}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="upload-info-row">
      <span className="font-medium">{label}</span>
      <span className="text-emerald-700">{value}</span>
    </div>
  );
}

export default function EmployeeUpload() {
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const [step, setStep] = useState("upload"); // 'upload' | 'review'
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const selectFile = (selected) => {
    if (!selected) return;
    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError("Only PDF, JPG, or PNG files are supported.");
      return;
    }
    if (selected.size > MAX_SIZE) {
      setError("File size must be 10 MB or less.");
      return;
    }
    setError("");
    setFile(selected);
    setPreviewUrl(selected.type.startsWith("image/") ? URL.createObjectURL(selected) : null);
  };

  const removeFile = () => {
    setFile(null);
    setPreviewUrl(null);
    setConfirmed(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    selectFile(e.dataTransfer.files?.[0]);
  };

  const handleConfirmSave = () => {
    // TODO: send the confirmed certificate to the API
    navigate("/employee/certificates");
  };

  /* ---------------- Step 2: Review ---------------- */
  if (step === "review") {
    return (
      <div className="dashboard-page employee-dashboard">
        <Sidebar role="employee" />

        <main className="dashboard-content">
          <EmployeeHeader />  
          

          <div className="bg-white rounded-2xl shadow-sm border border-gray-300 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-gray-200">
              {/* Document Preview */}
              <div className="p-4">
                <h2 className="text-base font-bold mb-3">Document Preview</h2>
                <div className="bg-gray-100 rounded-xl p-4 h-[26rem] flex items-start justify-center overflow-hidden">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Certificate preview" className="max-h-full bg-white shadow" />
                  ) : (
                    <div className="w-full bg-white shadow py-16 flex flex-col items-center gap-2 text-gray-500">
                      <FileText size={44} />
                      <span className="text-sm">{file?.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Extracted Information */}
              <div className="p-4">
                <h2 className="text-base font-bold mb-3">Extracted Information</h2>
                <div className="space-y-2">
                  <div className="bg-emerald-200 text-emerald-900 rounded-lg py-2 flex items-center justify-center gap-3 text-sm font-medium">
                    <CheckCircle size={22} strokeWidth={1.4} /> Validation Successful
                  </div>
                  <InfoBox label="Certificate / Course Name" value={extracted.name} />
                  <div className="grid grid-cols-2 gap-2">
                    <InfoBox label="Issue Date" value={extracted.issueDate} checked />
                    <InfoBox label="Expiry Date" value={extracted.expiryDate} checked />
                  </div>
                  <InfoBox label="Issued By" value={extracted.issuedBy} />
                  <InfoRow label="Signature" value={extracted.signature} />
                  <InfoRow label="Grade" value={extracted.grade} />
                  <InfoRow label="Validity Duration" value={extracted.validity} />
                  <InfoRow label="AI Confidence" value={extracted.confidence} />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-gray-200 px-6 py-4">
              <Button type="white" onClick={() => setStep("upload")}>
                Change File
              </Button>
              <Button type="green" onClick={handleConfirmSave}>
                Confirm &amp; Save
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  /* ---------------- Step 1: Upload ---------------- */
  return (
    <div className="dashboard-page employee-dashboard">
      <Sidebar role="employee" />

      <main className="dashboard-content">
        <EmployeeHeader />

        <div className="max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-gray-300">
          <h2 className="text-lg font-bold">Upload Training Certificate</h2>
          <p className="text-xs mb-4">Upload your certificate in PDF, JPG, or PNG format.</p>

          {/* Drag & Drop */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`h-72 border border-dashed border-black rounded-2xl flex flex-col items-center justify-center text-center transition ${
              isDragging ? "bg-green-50" : "bg-white"
            }`}
          >
            <div className="w-16 h-16 bg-green-100 text-emerald-700 rounded-full flex items-center justify-center mb-8">
              <UploadCloud size={28} strokeWidth={1.5} />
            </div>
            <p className="text-lg font-semibold mb-4">Drag &amp; Drop your certificate here</p>
            <Button type="white" onClick={() => inputRef.current?.click()}>
              Browse Files
            </Button>
            <p className="text-xs text-gray-600 mt-3">Supported formats: PDF • JPG • PNG</p>
            <p className="text-xs text-gray-600">Maximum file size: 10 MB</p>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => selectFile(e.target.files?.[0])}
              className="hidden"
            />
          </div>

          {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

          {/* Uploaded file */}
          {file && (
            <div className="mt-3 px-4 py-3 rounded-xl border border-gray-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-11 bg-gray-200 rounded flex items-end justify-center pb-1">
                  <span className="bg-red-600 text-white text-[7px] font-bold px-1 rounded-sm">
                    {file.name.split(".").pop().toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600">
                    {(file.size / (1024 * 1024)).toFixed(1)} MB{" "}
                    <span className="text-emerald-700 font-semibold ml-1">■ Completed</span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                aria-label="Remove file"
                className="text-red-600 hover:text-red-700 bg-transparent border-none cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          )}

          {/* Confirmation */}
          <div className="mt-4 flex items-center gap-4">
            <input
              type="checkbox"
              id="confirm"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 accent-emerald-700 cursor-pointer"
            />
            <label htmlFor="confirm" className="text-base cursor-pointer">
              I confirm that the uploaded certificate is mine.
            </label>
          </div>

          {/* Actions */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end gap-4">
            <Button type="white" onClick={() => navigate("/employee/certificates")}>
              Cancel
            </Button>
            <Button type="green" onClick={() => setStep("review")} disabled={!file || !confirmed}>
              Upload Certificate
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}