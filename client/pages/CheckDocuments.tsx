"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/ui/page-layout";
import { useLanguage } from "@/lib/LanguageContext";
import { useNavigate } from "react-router-dom";

interface DocumentRequirement {
  id: string;
  name: string;
  optional: boolean;
  description: string;
  tips: string;
}

interface ApplicationType {
  id: string;
  name: string;
  icon: string;
  description: string;
  documents: DocumentRequirement[];
}

const applications: ApplicationType[] = [
  {
    id: "driving-license",
    name: "Driving License",
    icon: "🚗",
    description: "Apply for a new or renewed driving license",
    documents: [
      {
        id: "aadhar",
        name: "Aadhar Card",
        optional: false,
        description: "Original and photocopy",
        tips: "Must be original and clearly visible",
      },
      {
        id: "address-proof",
        name: "Address Proof",
        optional: false,
        description: "Electricity bill, water bill, or rental agreement",
        tips: "Must be dated within last 3 months",
      },
      {
        id: "medical-cert",
        name: "Medical Certificate (Form 1)",
        optional: false,
        description: "Certificate from authorized medical practitioner",
        tips: "Get from RTO-approved doctor",
      },
      {
        id: "photo",
        name: "Passport-sized Photo",
        optional: false,
        description: "4 colored photographs (45mm x 35mm)",
        tips: "White background, no sunglasses",
      },
      {
        id: "dob",
        name: "Proof of Date of Birth",
        optional: false,
        description: "Birth certificate or 10th mark sheet",
        tips: "Both have equal validity",
      },
    ],
  },
  {
    id: "pan-card",
    name: "PAN Card",
    icon: "📋",
    description: "Apply for Permanent Account Number",
    documents: [
      {
        id: "aadhar",
        name: "Aadhar Card",
        optional: false,
        description: "Copy of Aadhar number",
        tips: "Mandatory for Indian citizens",
      },
      {
        id: "photo",
        name: "Passport-sized Photo",
        optional: false,
        description: "Digital color photograph (300x150 pixels)",
        tips: "JPG format, less than 100KB",
      },
      {
        id: "signature",
        name: "Signature Scan",
        optional: false,
        description: "Digital scan of your signature",
        tips: "JPG format, less than 50KB",
      },
      {
        id: "id-proof",
        name: "ID Proof",
        optional: true,
        description: "Passport, Voter ID, or Driving License",
        tips: "Optional if Aadhar is provided",
      },
    ],
  },
  {
    id: "passport",
    name: "Passport",
    icon: "🛂",
    description: "Apply for an Indian passport",
    documents: [
      {
        id: "aadhar",
        name: "Aadhar Card",
        optional: false,
        description: "Original copy",
        tips: "Most important document",
      },
      {
        id: "birth-cert",
        name: "Birth Certificate",
        optional: false,
        description: "Original or certified copy",
        tips: "From municipal corporation",
      },
      {
        id: "address",
        name: "Address Proof",
        optional: false,
        description: "Utility bill or rental agreement",
        tips: "Within last 3 months",
      },
      {
        id: "photo",
        name: "Passport Photographs",
        optional: false,
        description: "6 colored photographs (35mm x 45mm)",
        tips: "White background, no accessories",
      },
      {
        id: "police-clearance",
        name: "Police Clearance",
        optional: true,
        description: "If required by passport office",
        tips: "Check with your nearest passport office",
      },
    ],
  },
  {
    id: "voter-id",
    name: "Voter ID",
    icon: "🗳️",
    description: "Register as a voter",
    documents: [
      {
        id: "aadhar",
        name: "Aadhar Card",
        optional: false,
        description: "Copy of Aadhar",
        tips: "Fastest way to register",
      },
      {
        id: "id-proof",
        name: "ID Proof",
        optional: true,
        description: "Passport, Driving License, or Birth Certificate",
        tips: "Any government-issued ID",
      },
      {
        id: "address",
        name: "Address Proof",
        optional: true,
        description: "Utility bill or rental agreement",
        tips: "Shows your constituency",
      },
    ],
  },
];

export default function CheckDocuments() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedApp, setSelectedApp] = useState<ApplicationType | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const toggleDocCheck = (docId: string) => {
    const newChecked = new Set(checkedDocs);
    if (newChecked.has(docId)) {
      newChecked.delete(docId);
    } else {
      newChecked.add(docId);
    }
    setCheckedDocs(newChecked);
  };

  const getCompletionPercentage = () => {
    if (!selectedApp) return 0;
    const requiredDocs = selectedApp.documents.filter((d) => !d.optional);
    const checkedRequired = requiredDocs.filter((d) => checkedDocs.has(d.id)).length;
    return Math.round((checkedRequired / requiredDocs.length) * 100);
  };

  return (
    <PageLayout>
      {!selectedApp ? (
        <>
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={() => navigate("/sarkari-dost")}
              className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              ← Back
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Check Your Documents</h1>
            <p className="text-blue-200 text-lg">Select an application type and verify if you have all required documents</p>
          </div>

          {/* Application Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <button
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="text-left bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-2 border-transparent hover:border-blue-400"
              >
                <div className="text-5xl mb-4">{app.icon}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{app.name}</h3>
                <p className="text-slate-600 mb-4">{app.description}</p>
                <div className="text-sm text-blue-500 font-semibold">{app.documents.length} documents required</div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Back Button and Header */}
          <button
            onClick={() => {
              setSelectedApp(null);
              setCheckedDocs(new Set());
            }}
            className="mb-8 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
          >
            ← Back to Applications
          </button>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            {/* Title and Icon */}
            <div className="flex items-start gap-6 mb-8">
              <div className="text-6xl">{selectedApp.icon}</div>
              <div>
                <h1 className="text-4xl font-bold text-slate-800 mb-2">{selectedApp.name} Documents</h1>
                <p className="text-slate-600 text-lg">{selectedApp.description}</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-12 pb-8 border-b-2 border-slate-200">
              <div className="flex justify-between items-center mb-4">
                <p className="text-slate-700 font-semibold">Document Completion</p>
                <p className="text-2xl font-bold text-blue-600">{getCompletionPercentage()}%</p>
              </div>
              <div className="w-full">
                <progress value={getCompletionPercentage()} max={100} className="w-full h-3 appearance-none rounded-full overflow-hidden">
                  {getCompletionPercentage()}%
                </progress>
              </div>
            </div>

            {/* Required Documents */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-red-600">⚠️ Required Documents</h2>
              <div className="space-y-4">
                {selectedApp.documents
                  .filter((d) => !d.optional)
                  .map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => toggleDocCheck(doc.id)}
                      className="bg-red-50 border-2 border-red-200 rounded-xl p-6 cursor-pointer hover:bg-red-100 transition-all"
                    >
                      <div className="flex items-start gap-4">
                        <div className="mt-1">
                          <input
                            type="checkbox"
                            checked={checkedDocs.has(doc.id)}
                            onChange={() => toggleDocCheck(doc.id)}
                            aria-label={`Toggle ${doc.name}`}
                            title={`Toggle ${doc.name}`}
                            className="w-6 h-6 rounded border-2 border-red-400 cursor-pointer accent-red-500"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-slate-800 mb-1">{doc.name}</h3>
                          <p className="text-slate-600 mb-2">{doc.description}</p>
                          <p className="text-sm text-red-600 font-semibold">💡 {doc.tips}</p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Optional Documents */}
            {selectedApp.documents.some((d) => d.optional) && (
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-6 text-green-600">✓ Optional Documents</h2>
                <div className="space-y-4">
                  {selectedApp.documents
                    .filter((d) => d.optional)
                    .map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => toggleDocCheck(doc.id)}
                        className="bg-green-50 border-2 border-green-200 rounded-xl p-6 cursor-pointer hover:bg-green-100 transition-all"
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            <input
                              type="checkbox"
                              checked={checkedDocs.has(doc.id)}
                              onChange={() => toggleDocCheck(doc.id)}
                              aria-label={`Toggle ${doc.name}`}
                              title={`Toggle ${doc.name}`}
                              className="w-6 h-6 rounded border-2 border-green-400 cursor-pointer accent-green-500"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-800 mb-1">{doc.name} (Optional)</h3>
                            <p className="text-slate-600 mb-2">{doc.description}</p>
                            <p className="text-sm text-green-600 font-semibold">💡 {doc.tips}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Completion Status */}
            {getCompletionPercentage() === 100 && (
              <div className="mt-12 p-8 bg-green-100 border-2 border-green-500 rounded-xl text-center">
                <p className="text-3xl mb-4">🎉</p>
                <p className="text-2xl font-bold text-green-700 mb-2">You're All Set!</p>
                <p className="text-green-700">You have all required documents for {selectedApp.name} application.</p>
              </div>
            )}

            {/* Help Section */}
            <div className="mt-12 pt-8 border-t-2 border-slate-200">
              <div className="bg-blue-50 rounded-xl p-8 text-center">
                <p className="text-slate-700 mb-4">Need more help?</p>
                <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">View Step-by-Step Guide</button>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
}
