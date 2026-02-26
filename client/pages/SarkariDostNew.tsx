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


const colorConfig = {
  "card-blue": "rgb(66, 133, 244)",
  "card-blue-light": "rgb(100, 160, 255)",
  gold: "rgb(255, 193, 7)",
};

export default function SarkariDost() {
  const { t } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Requirements for each service (keywords to match in filenames)
  const serviceRequirements: { [key: string]: string[] } = {
    "Driving License Application": ["aadhaar", "address", "passport", "age", "learner"],
    "Passport Application": ["aadhaar", "address", "photo", "birth", "police"],
    "PAN Card Application": ["aadhaar", "photo", "signature"],
    "Voter ID": ["aadhaar", "id", "address"],
    "Aadhaar Card": ["dob", "photo", "address", "id"],
    "Birth Certificate": ["hospital", "aadhar", "marriage"],
    "Marriage Certificate": ["aadhar", "birth", "photo", "invitation", "witness"],
    "Domicile Certificate": ["aadhaar", "address", "birth", "photo"],
    "Income Certificate": ["aadhaar", "salary", "address", "photo"],
    "Ration Card": ["aadhaar", "address", "income", "photo", "bank"],
  };

  const keywordLabels: { [key: string]: string } = {
    aadhaar: "Aadhaar Card",
    address: "Address Proof",
    passport: "Passport Photo",
    age: "Age Proof",
    learner: "Learner License",
    photo: "Passport Photo",
    birth: "Birth Certificate",
    police: "Police Clearance",
    signature: "Signature",
    id: "ID Proof",
    dob: "Date of Birth Proof",
    hospital: "Hospital Record",
    marriage: "Marriage Certificate",
    invitation: "Marriage Proof",
    witness: "Witness ID",
    salary: "Salary Slip",
    income: "Income Proof",
    bank: "Bank Passbook",
  };

  const suggestionMessages: { [key: string]: string } = {
    address: "Please upload an electricity bill, bank statement, or rent agreement as address proof.",
    aadhaar: "Please upload your Aadhaar Card.",
    photo: "Please upload a passport-sized photo.",
    birth: "Please upload your birth certificate.",
    salary: "Please upload your latest salary slip or income proof.",
    income: "Please upload valid income proof.",
    bank: "Please upload a bank passbook copy.",
    learner: "Please upload your learner license.",
    id: "Please upload a valid government ID.",
    marriage: "Please upload your marriage certificate.",
    invitation: "Please upload the marriage invitation or proof.",
    witness: "Please upload ID proof for witnesses.",
  };

  // compute detected and missing documents based on uploaded files and selected service
  const detectedDocs = new Set<string>();
  if (selectedService && serviceRequirements[selectedService]) {
    const reqs = serviceRequirements[selectedService];
    uploadedFiles.forEach((f) => {
      const name = f.name.toLowerCase();
      reqs.forEach((keyword) => {
        if (name.includes(keyword)) {
          detectedDocs.add(keyword);
        }
      });
    });
  }

  const currentReqs = selectedService ? serviceRequirements[selectedService] || [] : [];
  const missingDocs = currentReqs.filter((k) => !detectedDocs.has(k));
  const readiness = currentReqs.length > 0 ? Math.round((detectedDocs.size / currentReqs.length) * 100) : 0;
  const invalidDocs = uploadedFiles
    .filter((f) => !currentReqs.some((k) => f.name.toLowerCase().includes(k)))
    .map((f) => f.name);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement> | DragEvent) => {
    let files: FileList | null = null;
    if ((event as DragEvent).dataTransfer) {
      event.preventDefault();
      files = (event as DragEvent).dataTransfer!.files;
    } else {
      files = (event as React.ChangeEvent<HTMLInputElement>).target.files;
    }
    if (files) {
      const newFiles: UploadedFile[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
      }));
      setUploadedFiles((prev) => [...prev, ...newFiles]);
      
      // Simulate AI analysis
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    handleFileUpload(e.nativeEvent as DragEvent);
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const handleDownloadChecklist = () => {
    const lines: string[] = [];
    currentReqs.forEach((req) => {
      const ok = detectedDocs.has(req);
      lines.push(`${ok ? "✓" : "✗"} ${req}`);
    });
    const checklistText = lines.join("\n");
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
        {/* Application Assistant */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Application Assistant</h3>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
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

          {/* Service Picker */}
          <div className="border-t pt-6">
            <p className="text-slate-700 font-semibold mb-4">Select Government Service:</p>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="">-- choose service --</option>
              <option>Driving License Application</option>
              <option>Passport Application</option>
              <option>PAN Card Application</option>
              <option>Voter ID</option>
              <option>Aadhaar Card</option>
              <option>Birth Certificate</option>
              <option>Marriage Certificate</option>
              <option>Domicile Certificate</option>
              <option>Income Certificate</option>
              <option>Ration Card</option>
            </select>
          </div>
        </div>

        {/* AI Application Review */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
          <div className="flex items-start gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-xl font-bold">🔍</div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800">AI Application Review</h3>
              <p className="text-slate-600 text-sm">Document verification status</p>
            </div>
          </div>
          {!selectedService && (
            <p className="text-center text-slate-500 py-8">Please select a service to start review.</p>
          )}
          {/* Progress indicator */}
          <p className="text-sm font-medium text-slate-700 mb-2">
            Application Readiness: {readiness}%
          </p>
          <div className="w-full bg-slate-200 rounded-full h-2 mb-4">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${readiness}%` }} />
          </div>

          {/* Detected Documents */}
          <div className="space-y-3">
            {Array.from(detectedDocs).map((doc) => (
              <div key={doc} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                <span className="text-2xl text-green-600">✔</span>
                <span className="text-slate-700">
                  {keywordLabels[doc] || doc.replace(/-/g, " ")}
                </span>
              </div>
            ))}
          </div>

          {/* Missing Documents */}
          {missingDocs.length > 0 && (
            <div className="mt-6 space-y-3">
              {missingDocs.map((doc) => (
                <div key={doc} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg shadow-sm">
                  <span className="text-2xl text-red-500">✘</span>
                  <span className="text-red-600 font-semibold">
                    {keywordLabels[doc] || doc.replace(/-/g, " ")} missing
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Invalid Documents */}
          {invalidDocs.length > 0 && (
            <div className="mt-6 space-y-3">
              {invalidDocs.map((name) => (
                <div key={name} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg shadow-sm">
                  <span className="text-2xl text-yellow-600">⚠️</span>
                  <span className="text-yellow-800 font-medium">{name} not recognized</span>
                </div>
              ))}
            </div>
          )}

          {/* Suggested Fix Box */}
          {missingDocs.length > 0 && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
              <h4 className="text-sm font-semibold text-yellow-700 mb-2">Suggested Fix</h4>
              <p className="text-sm text-yellow-800">
                {suggestionMessages[missingDocs[0]] ||
                  `Please upload ${keywordLabels[missingDocs[0]] || missingDocs[0].replace(/-/g, " ")} to proceed.`}
              </p>
            </div>
          )}

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
