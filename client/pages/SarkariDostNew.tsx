"use client";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/ui/page-layout";
import { useLanguage } from "@/lib/LanguageContext";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

const colorConfig = {
  "card-blue": "rgb(66, 133, 244)",
  "card-blue-light": "rgb(100, 160, 255)",
  gold: "rgb(255, 193, 7)",
};

export default function SarkariDost() {
  const { t } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    { id: "1", label: "Aadhar Card", completed: true },
    { id: "2", label: "PAN Card", completed: true },
    { id: "3", label: "PAN Card", completed: true },
    { id: "4", label: "Proof of Address", completed: false },
  ]);
  const [selectedApplication, setSelectedApplication] = useState("Driving License Aadhar Update");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      
      // Simulate AI analysis
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const handleDownloadChecklist = () => {
    const checklistText = checklist
      .map((item) => `${item.completed ? "✓" : "✗"} ${item.label}`)
      .join("\n");
    const element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(checklistText));
    element.setAttribute("download", "personalized-checklist.txt");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <PageLayout>
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-blue-700 font-bold">S</span>
          </div>
          <h1 className="text-white font-bold text-xl">Sarkari AI</h1>
        </div>
        <p className="text-blue-100 text-sm">Your Digital Guide to Government Services</p>
        <div className="bg-white bg-opacity-20 backdrop-blur px-4 py-2 rounded-full text-white text-sm font-medium">हिंदी / English</div>
      </div>

      {/* Main Title with Gold Accent */}
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl text-yellow-400">›</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Simplify Your Government Paperwork</h2>
        </div>
        <div className="h-1 w-40 rounded-full bg-yellow-400"></div>
      </div>

      {/* Feature Cards Grid - 3 boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Check Documents */}
        <Link to="/check-documents" className="no-underline">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl text-blue-500">🔍</div>
              <h3 className="text-xl font-bold text-slate-800">Check Documents</h3>
            </div>
            <p className="text-slate-600 text-sm">Verify all required documents for your application</p>
          </div>
        </Link>

        {/* Step-by-Step Guides */}
        <Link to="/step-by-step-guides" className="no-underline">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl text-blue-500">📋</div>
              <h3 className="text-xl font-bold text-slate-800">Step-by-Step Guides</h3>
            </div>
            <p className="text-slate-600 text-sm">Follow easy-to-understand instructions for each process</p>
          </div>
        </Link>

        {/* Error Scanner */}
        <Link to="/error-scanner" className="no-underline">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 h-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">🚩</div>
              <h3 className="text-xl font-bold text-slate-800">Error Scanner</h3>
            </div>
            <p className="text-slate-600 text-sm">Catch and fix errors before submitting your application</p>
          </div>
        </Link>
      </div>

      {/* Two Column Section - Document Check and AI Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Document Readiness Check */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Document Readiness Check</h3>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all mb-6"
          >
            <div className="text-4xl mb-3">📁</div>
            <p className="text-slate-700 font-semibold">Tap to Upload Aadhar, PAN, DL</p>
            <p className="text-slate-500 text-sm mt-2">Or drag and drop your documents here</p>
          </div>
          <input ref={fileInputRef} type="file" multiple onChange={handleFileUpload} title="Upload documents" aria-label="Upload documents" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-600 mb-3">Uploaded Documents:</p>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                    <span className="text-sm text-slate-700">{file.name}</span>
                    <button onClick={() => handleRemoveFile(file.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Selector */}
          <div className="border-t pt-6">
            <p className="text-slate-700 font-semibold mb-4">Applying for:</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border-2 border-blue-400 cursor-pointer">
                <div className="w-4 h-4 rounded bg-blue-500"></div>
                <span className="text-slate-800 font-medium">Driving License Aadhar Update</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer">
                <div className="w-4 h-4 rounded border-2 border-slate-300"></div>
                <span className="text-slate-600 font-medium">Paster ID</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analysis Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">✓</div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">AI Analysis</h3>
              <p className="text-slate-600 text-sm">Application Ready!</p>
            </div>
          </div>

          <p className="text-slate-700 text-sm mb-6">Your {selectedApplication.toLowerCase()} application is complete</p>

          {/* Checklist Items */}
          <div className="space-y-3">
            {checklist.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className={item.completed ? "text-2xl" : "text-2xl text-red-500"}>{item.completed ? "✓" : "✗"}</span>
                <span className={item.completed ? "text-slate-700" : "text-red-600 font-semibold"}>{item.label}</span>
              </div>
            ))}
          </div>

          {isLoading && (
            <div className="mt-6 text-center">
              <div className="inline-block animate-spin">⚙️</div>
              <p className="text-slate-600 text-sm mt-2">Analyzing your documents...</p>
            </div>
          )}
        </div>
      </div>

      {/* Download Checklist Button */}
      <div className="text-center mb-16">
        <button onClick={handleDownloadChecklist} className="px-12 py-4 rounded-full font-bold text-lg text-white shadow-lg hover:shadow-xl transition-all bg-blue-500">
          📥 Download Personalized Checklist
        </button>
      </div>

      {/* Footer links */}
      <div className="border-t border-slate-700 pt-12 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <p className="text-slate-400 font-semibold cursor-pointer hover:text-white transition-colors">FAQS</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold cursor-pointer hover:text-white transition-colors">Contact Support</p>
          </div>
          <div>
            <p className="text-slate-400 font-semibold cursor-pointer hover:text-white transition-colors">Privacy Policy</p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
