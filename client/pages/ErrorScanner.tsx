"use client";

import { useState, useRef } from "react";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/ui/page-layout";
import { useLanguage } from "@/lib/LanguageContext";
import { useNavigate } from "react-router-dom";

interface AnalysisResult {
  severity: "error" | "warning" | "info";
  title: string;
  description: string;
  suggestion: string;
}

interface DocumentAnalysis {
  fileName: string;
  status: "analyzing" | "complete";
  results: AnalysisResult[];
}

export default function ErrorScanner() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analyses, setAnalyses] = useState<DocumentAnalysis[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const mockAnalysis = (fileName: string): AnalysisResult[] => {
    const results: AnalysisResult[] = [];

    // Random checks for demonstration
    const checks = [
      {
        severity: "error" as const,
        title: "Image Quality Too Low",
        description: "The image resolution is below 300 DPI",
        suggestion: "Re-scan or re-photograph the document with better quality",
      },
      {
        severity: "warning" as const,
        title: "Possible Blur Detected",
        description: "Parts of the document appear slightly blurred",
        suggestion: "Ensure the document is in focus and well-lit before uploading",
      },
      {
        severity: "warning" as const,
        title: "Document Partially Cut Off",
        description: "Corners of the document are not fully visible",
        suggestion: "Make sure the entire document is captured in the image",
      },
      {
        severity: "error" as const,
        title: "Text Not Legible",
        description: "Some text areas are too dark or unclear to read",
        suggestion: "Improve lighting and try capturing the document again",
      },
      {
        severity: "info" as const,
        title: "Document Expiry Soon",
        description: "This document is expiring within 6 months",
        suggestion: "Plan to renew this document before it expires",
      },
      {
        severity: "warning" as const,
        title: "Color Issues Detected",
        description: "The document color appears faded or discolored",
        suggestion: "Use better lighting conditions and adjust contrast if needed",
      },
    ];

    // Randomly select 2-4 issues for demo
    const numIssues = Math.floor(Math.random() * 3) + 2;
    const shuffled = checks.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numIssues);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };

  const handleAnalyze = async () => {
    if (uploadedFiles.length === 0) return;

    setIsAnalyzing(true);

    // Simulate analysis process
    const newAnalyses: DocumentAnalysis[] = uploadedFiles.map((file) => ({
      fileName: file.name,
      status: "analyzing",
      results: [],
    }));
    setAnalyses(newAnalyses);

    // Simulate delay and get results
    setTimeout(() => {
      const completedAnalyses = uploadedFiles.map((file) => ({
        fileName: file.name,
        status: "complete" as const,
        results: mockAnalysis(file.name),
      }));
      setAnalyses(completedAnalyses);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    setAnalyses(analyses.filter((_, i) => i !== index));
  };

  const getTotalErrors = () => {
    return analyses.reduce((count, analysis) => {
      return count + analysis.results.filter((r) => r.severity === "error").length;
    }, 0);
  };

  const getTotalWarnings = () => {
    return analyses.reduce((count, analysis) => {
      return count + analysis.results.filter((r) => r.severity === "warning").length;
    }, 0);
  };

  const getSeverityColor = (severity: "error" | "warning" | "info") => {
    switch (severity) {
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
    }
  };

  const getSeverityIcon = (severity: "error" | "warning" | "info") => {
    switch (severity) {
      case "error":
        return "❌";
      case "warning":
        return "⚠️";
      case "info":
        return "ℹ️";
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <button
        onClick={() => navigate("/sarkari-dost")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
      >
        ← Back
      </button>

      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Document Error Scanner</h1>
        <p className="text-blue-200 text-lg">Upload your government documents and let AI scan for potential errors, quality issues, and missing information</p>
      </div>

      {analyses.length === 0 ? (
        <>
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-8">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all"
            >
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Upload Documents</h3>
              <p className="text-slate-600 mb-4">Click here or drag and drop your documents</p>
              <p className="text-sm text-slate-500">Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
            </div>
            <input ref={fileInputRef} type="file" multiple onChange={handleFileUpload} title="Upload documents for scanning" aria-label="Upload documents for scanning" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Files Ready for Analysis ({uploadedFiles.length})</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📎</span>
                        <div>
                          <p className="font-semibold text-slate-800">{file.name}</p>
                          <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => handleRemoveFile(index)} className="text-red-500 hover:text-red-700 font-semibold">Remove</button>
                    </div>
                  ))}
                </div>

                {/* Analyze Button */}
                <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full mt-8 px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-400 transition-colors font-bold text-lg flex items-center justify-center gap-2">
                  {isAnalyzing ? (
                    <>
                      <span className="animate-spin">⚙️</span>
                      Analyzing Documents...
                    </>
                  ) : (
                    <>🔍 Scan for Errors</>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <p className="text-3xl mb-2">❌</p>
              <p className="font-bold text-slate-800">Quality Check</p>
              <p className="text-sm text-slate-600 mt-2">Detects blur, lighting, and resolution issues</p>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 text-center">
              <p className="text-3xl mb-2">⚠️</p>
              <p className="font-bold text-slate-800">Completeness</p>
              <p className="text-sm text-slate-600 mt-2">Checks if all required parts are visible</p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 text-center">
              <p className="text-3xl mb-2">ℹ️</p>
              <p className="font-bold text-slate-800">Validation</p>
              <p className="text-sm text-slate-600 mt-2">Verifies document authenticity markers</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Analysis Results */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <p className="text-4xl font-bold text-red-600">{getTotalErrors()}</p>
                <p className="text-slate-600 font-semibold">Critical Errors</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <p className="text-4xl font-bold text-yellow-600">{getTotalWarnings()}</p>
                <p className="text-slate-600 font-semibold">Warnings</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <p className="text-4xl font-bold text-blue-600">{uploadedFiles.length}</p>
                <p className="text-slate-600 font-semibold">Documents Scanned</p>
              </div>
            </div>
          </div>

          {/* Individual Document Results */}
          <div className="space-y-8">
            {analyses.map((analysis, docIndex) => (
              <div key={docIndex} className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-slate-200">
                  <h3 className="text-2xl font-bold text-slate-800">{analysis.fileName}</h3>
                  {analysis.status === "complete" && <span className="text-sm font-semibold text-green-600">✓ Analysis Complete</span>}
                </div>

                {analysis.results.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-3xl mb-3">🎉</p>
                    <p className="text-xl font-bold text-green-600">No Issues Found!</p>
                    <p className="text-slate-600 mt-2">This document looks good to submit.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {analysis.results.map((result, resultIndex) => (
                      <div key={resultIndex} className={`border-2 rounded-xl p-6 ${getSeverityColor(result.severity)}`}>
                        <div className="flex gap-4">
                          <div className="text-3xl">{getSeverityIcon(result.severity)}</div>
                          <div className="flex-1">
                            <h4 className="font-bold text-slate-800 mb-1">{result.title}</h4>
                            <p className="text-slate-700 mb-3">{result.description}</p>
                            <div className="bg-white bg-opacity-60 rounded p-3 text-sm text-slate-700">
                              <strong>What to do:</strong> {result.suggestion}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex gap-4 justify-center">
            <button onClick={() => { setUploadedFiles([]); setAnalyses([]); }} className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">Scan More Documents</button>
            <button onClick={() => navigate("/step-by-step-guides")} className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">View Detailed Guides</button>
          </div>
        </>
      )}
    </PageLayout>
  );
}
