import React, { useState } from 'react';
import { ArrowLeft, UploadCloud, CheckCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Common/Sidebar/Sidebar";
import Button from "../../Components/Common/Button/Button";

export default function EmployeeUpload() {
  const navigate = useNavigate();
  const [step, setStep] = useState('upload'); // 'upload' | 'review'
  const [file, setFile] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="dashboard-page employee-dashboard">
      <Sidebar role="employee" label="Certificates" />

      <main className="dashboard-content">
        {/* Header */}
        <header className="page-header">
          <div>
            <h1 className="page-header-title">
              {step === 'upload' ? 'Upload Certificate' : 'Review Certificate'}
            </h1>
            <p className="page-header-subtitle">
              {step === 'upload'
                ? 'Upload your training certificate for verification and approval.'
                : 'Review the extracted data and validation status before final submission.'}
            </p>
          </div>
        </header>

        {/* Back Button */}
        <div className="mb-4">
          <button 
            type="button"
            onClick={() => navigate("/employee/certificates")}
            className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft size={16} /> Back to Certificates
          </button>
        </div>

        {step === 'upload' ? (
          /* Step 1: Upload Card */
          <div className="max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-1">Upload Training Certificate</h2>
            <p className="text-xs text-gray-500 mb-4">Upload your certificate in PDF, JPG, or PNG format.</p>

            {/* Drag & Drop Box */}
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center bg-gray-50/50 hover:bg-gray-50 transition cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div className="w-12 h-12 bg-green-50 text-emerald-600 rounded-full flex items-center justify-center mb-3">
                <UploadCloud size={24} />
              </div>
              <p className="font-semibold text-gray-700 mb-2">Drag & Drop your certificate here</p>
              <Button type="white">
                Browse Files
              </Button>
              <span className="text-xs text-gray-400 mt-3">Supported formats: PDF • JPG • PNG (Max: 10 MB)</span>
            </div>

            {/* Uploaded File Item */}
            {file && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 text-red-600 font-bold rounded-lg flex items-center justify-center text-xs">
                    <FileText size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(1)} MB • <span className="text-emerald-600 font-medium">Ready</span></p>
                  </div>
                </div>
                <button onClick={() => setFile(null)} className="text-gray-400 hover:text-red-500 bg-transparent border-none cursor-pointer">
                  ✕
                </button>
              </div>
            )}

            {/* Confirmation Checkbox */}
            <div className="mt-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="confirm"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-600 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="confirm" className="text-xs text-gray-600 cursor-pointer">
                I confirm that the uploaded certificate is authentic and belongs to me.
              </label>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <Button type="white" onClick={() => navigate("/employee/certificates")}>
                Cancel
              </Button>
              <Button 
                type="green" 
                onClick={() => setStep('review')}
                disabled={!file || !confirmed}
              >
                Upload & Verify
              </Button>
            </div>
          </div>
        ) : (
          /* Step 2: Review Screen */
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Document Preview */}
              <div className="bg-gray-100 p-4 rounded-xl flex flex-col">
                <h3 className="text-xs font-semibold text-gray-500 mb-3">Document Preview</h3>
                <div className="bg-white border p-4 rounded-lg flex-1 flex items-center justify-center min-h-[250px] shadow-inner text-gray-400 text-sm">
                  [ {file ? file.name : "Certificate Preview"} ]
                </div>
              </div>

              {/* Extracted Data */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-500">Extracted Information</h3>
                <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold py-2 px-3 rounded-lg flex items-center gap-2">
                  <CheckCircle size={16} /> Validation Successful
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-2 border rounded-lg bg-gray-50">
                    <span className="text-gray-400 block">Certificate Name</span>
                    <span className="font-semibold text-gray-800">Cybersecurity Awareness Certificate</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 border rounded-lg bg-gray-50">
                      <span className="text-gray-400 block">Issue Date</span>
                      <span className="font-semibold text-gray-800">12 / 01 / 2024</span>
                    </div>
                    <div className="p-2 border rounded-lg bg-gray-50">
                      <span className="text-gray-400 block">Expiry Date</span>
                      <span className="font-semibold text-gray-800">11 / 01 / 2027</span>
                    </div>
                  </div>
                  <div className="p-2 border rounded-lg bg-gray-50">
                    <span className="text-gray-400 block">Issued By</span>
                    <span className="font-semibold text-gray-800">SAUDIA Learning Academy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <Button type="white" onClick={() => setStep('upload')}>
                Change File
              </Button>
              <Button type="green" onClick={() => navigate("/employee/certificates")}>
                Confirm & Save
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}