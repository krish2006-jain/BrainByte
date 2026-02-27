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

  // documents used by the assistant logic
  const allDocuments = [
    "Aadhaar Card",
    "PAN Card",
    "Driving License",
    "Passport",
    "Birth Certificate",
    "Marriage Certificate",
    "Domicile Certificate",
    "Income Certificate",
    "Ration Card",
  ];

  // service options for dropdown
  const serviceOptions = [
    "Driving License Application",
    "Passport Application",
    "PAN Card Application",
    "Birth Certificate",
    "Marriage Certificate",
    "Domicile Certificate",
    "Income Certificate",
    "Ration Card",
  ];

  // Map services to their required documents
  const serviceDocumentsMap: { [key: string]: string[] } = {
    "Driving License Application": [
      "Aadhar Card",
      "Address Proof",
      "Medical Certificate",
      "Passport Photograph",
      "Proof of Date of Birth",
    ],
    "Passport Application": [
      "Aadhar Card",
      "Birth Certificate",
      "Address Proof",
      "Passport Photographs",
    ],
    "PAN Card Application": [
      "Aadhar Card",
      "Passport Photograph",
      "Signature",
    ],
    "Birth Certificate": [
      "Hospital Birth Record",
      "Parents' Aadhar Card",
      "Parents' Marriage Certificate",
    ],
    "Marriage Certificate": [
      "Bride & Groom Aadhar Card",
      "Birth Certificate",
      "Passport Photographs",
      "Marriage Invitation Card",
      "Witness ID Proof",
    ],
    "Domicile Certificate": [
      "Aadhar Card",
      "Address Proof",
      "Birth Certificate",
      "Passport Photograph",
    ],
    "Income Certificate": [
      "Aadhar Card",
      "Salary Slip",
      "Address Proof",
      "Passport Photograph",
    ],
    "Ration Card": [
      "Aadhar Card",
      "Address Proof",
      "Income Certificate",
      "Passport Photographs",
      "Bank Passbook",
    ],
  };

  const [selectedService, setSelectedService] = useState<string>("");

  // analysis results
  const [detectedDocs, setDetectedDocs] = useState<string[]>([]);
  const [missingDocs, setMissingDocs] = useState<string[]>(allDocuments);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [readiness, setReadiness] = useState<number>(0);
  const [suggestedFix, setSuggestedFix] = useState<string>("");

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

  // recalc analysis whenever uploads or service changes
  useEffect(() => {
    // if no service selected, show empty state
    if (!selectedService) {
      setDetectedDocs([]);
      setMissingDocs([]);
      setWarnings([]);
      setReadiness(0);
      setSuggestedFix("");
      return;
    }

    // get required docs for selected service
    const requiredDocs = serviceDocumentsMap[selectedService] || [];

    // detect which required docs were uploaded
    // improved matching: check if any word from doc name is in filename
    const detected: string[] = [];
    uploadedFiles.forEach((file) => {
      const fileName = file.name.toLowerCase();
      // remove file extension
      const fileNameNoExt = fileName.replace(/\.[^/.]+$/, "");
      
      requiredDocs.forEach((doc) => {
        if (detected.includes(doc)) return;
        
        // split doc name into words and check if any significant word matches
        const docWords = doc.toLowerCase().split(/[\s\-_]+/).filter(w => w.length > 2);
        
        // check if at least one word from the document name appears in the filename
        const isMatch = docWords.some(word => fileNameNoExt.includes(word));
        
        if (isMatch) {
          detected.push(doc);
        }
      });
    });

    setDetectedDocs(detected);
    setMissingDocs(requiredDocs.filter((d) => !detected.includes(d)));
    setWarnings(
      uploadedFiles
        .filter((f) => f.size > 5 * 1024 * 1024)
        .map((f) => `Large file: ${f.name}`)
    );
    const ready = requiredDocs.length
      ? Math.round((detected.length / requiredDocs.length) * 100)
      : 0;
    setReadiness(ready);
    setSuggestedFix(
      detected.length < requiredDocs.length
        ? `${requiredDocs.find((d) => !detected.includes(d))} missing`
        : "All documents detected"
    );
  }, [uploadedFiles, selectedService]);

  const handleDownloadChecklist = () => {
    const lines: string[] = [];
    detectedDocs.forEach((d) => lines.push(`✓ ${d}`));
    missingDocs.forEach((d) => lines.push(`✗ ${d}`));
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

      {/* Two Column Section - Smart Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        {/* Application Assistant */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Application Assistant</h3>

          {/* Upload Area */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all mb-6"
          >
            <div className="text-4xl mb-3">📁</div>
            <p className="text-slate-700 font-semibold">Drag & drop government documents</p>
            <p className="text-slate-500 text-sm mt-2">Aadhaar, PAN, DL, Passport, Birth certificate…</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileUpload}
            title="Upload documents"
            aria-label="Upload documents"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
          />

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-slate-600 mb-3">Uploaded Documents:</p>
              <div className="space-y-2">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-lg"
                  >
                    <span className="text-sm text-slate-700">{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Service Dropdown */}
          <div className="border-t pt-6">
            <label className="block text-slate-700 font-semibold mb-2" htmlFor="service-select">
              Select Government Service:
            </label>
            <select
              id="service-select"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white"
            >
              <option value="">-- choose service --</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* AI Application Review */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">AI Application Review</h3>

          {!selectedService ? (
            <div className="text-center py-12">
              <p className="text-slate-600 text-lg">
                Please select a government service to see required documents
              </p>
            </div>
          ) : (
            <>
              {/* readiness/progress */}
              <p className="text-sm font-medium text-slate-700 mb-4">
                Application Readiness: {readiness}%
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${readiness}%` }}
                />
              </div>

              {/* Detected Documents */}
              {detectedDocs.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold text-slate-800 mb-2">Detected Documents</p>
                  <div className="space-y-2">
                    {detectedDocs.map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center gap-3 p-2 bg-white rounded-lg shadow-sm"
                      >
                        <span className="text-green-600 text-xl">✔</span>
                        <span className="text-slate-700">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Missing Documents */}
              {missingDocs.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold text-red-600 mb-2">Missing Documents</p>
                  <div className="space-y-2">
                    {missingDocs.map((doc) => (
                      <div
                        key={doc}
                        className="flex items-center gap-3 p-2 bg-red-50 rounded-lg shadow-sm"
                      >
                        <span className="text-red-600 text-xl">✗</span>
                        <span className="text-red-600">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Warnings */}
              {warnings.length > 0 && (
                <div className="mb-4">
                  <p className="font-semibold text-yellow-600 mb-2">Warnings</p>
                  <ul className="list-disc list-inside text-slate-700">
                    {warnings.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggested Fix */}
              {suggestedFix && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="font-semibold text-yellow-800 mb-1">Suggested Fix</p>
                  <p className="text-slate-700">{suggestedFix}</p>
                </div>
              )}

              {isLoading && (
                <div className="mt-6 text-center">
                  <div className="inline-block animate-spin">⚙️</div>
                  <p className="text-slate-600 text-sm mt-2">Analyzing your documents...</p>
                </div>
              )}
            </>
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
