"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/ui/page-layout";
import { useLanguage } from "@/lib/LanguageContext";

interface GuidanceProcess {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tips: string[];
  timeEstimate: string;
  documents: string[];
}

const processes: GuidanceProcess[] = [
  {
    id: "driving-license",
    title: "Apply for Driving License",
    description: "Get your learner's permit or permanent driving license",
    steps: [
      "Visit your nearest Regional Transport Office (RTO)",
      "Download and fill the DL Form 4 (or Form 8 for renewal)",
      "Gather required documents: Aadhar, address proof, medical certificate",
      "Submit filled form with documents at the counter",
      "Pay the applicable fee (₹600-800 for permanent DL)",
      "Go for the written test at scheduled date and time",
      "Pass the practical driving test",
      "Collect your driving license from RTO",
    ],
    tips: [
      "Apply at least 6 weeks before your learner's permit expires",
      "Bring original documents; photocopies won't be accepted",
      "Practice sample test papers available on the RTO website",
      "Arrive 15 minutes early on your test date",
      "Use public transportation if you're not yet confident driving",
    ],
    timeEstimate: "4-6 weeks from application to license issuance",
    documents: [
      "Aadhar Card",
      "Address Proof (electricity bill, rental agreement)",
      "Medical Certificate (Form 1)",
      "Passport-sized photographs",
      "Proof of date of birth (birth certificate or 10th mark sheet)",
    ],
  },
  {
    id: "pan-card",
    title: "Apply for PAN Card",
    description: "Get a Permanent Account Number for tax purposes",
    steps: [
      "Visit the official NSDL or UTIITSL website",
      "Fill the PAN application form (Form 49AA) online or download it",
      "Upload scanned copies of required documents",
      "Pay the fee online (₹107 for Indian residents, ₹1,500 for non-residents)",
      "Submit the form with scanned documents",
      "Receive acknowledgment with your PAN application number",
      "Your PAN will be generated within 3-5 business days",
      "Download your e-PAN from the website using your application number",
    ],
    tips: [
      "Use a valid email address as you'll receive updates there",
      "All document scans must be clear and readable",
      "Name in PAN must match your Aadhar exactly",
      "You can apply online; no need to visit an office",
      "Keep your acknowledgment receipt for reference",
    ],
    timeEstimate: "3-5 business days after submission",
    documents: [
      "Aadhar Card (mandatory)",
      "Passport or Voter ID",
      "Passport-sized photograph",
      "Address proof (utility bill, rental agreement)",
    ],
  },
  {
    id: "aadhar-update",
    title: "Update Aadhar Information",
    description: "Update your address, phone, or other details in Aadhar",
    steps: [
      "Visit your nearest Aadhar Enrollment Center (post office or bank)",
      "Bring your Aadhar number or enrollment ID",
      "Tell the operator which information you want to update",
      "Provide the new details (address, phone, etc.)",
      "Submit proof documents for the updated information",
      "Pay the update fee (usually free for first update, then ₹50-100)",
      "Capture your biometric data (fingerprint/iris scan)",
      "Get an acknowledgment receipt",
      "Updated Aadhar will be sent to your registered address within 30 days",
    ],
    tips: [
      "Address updates are free if done within 10 years",
      "Multiple updates can be done in one visit",
      "Online updates are also possible through Aadhar website",
      "Keep your enrollment ID handy for faster processing",
      "Call Aadhar helpline (1800-300-1947) if you face any issues",
    ],
    timeEstimate: "30 days for updated Aadhar delivery",
    documents: [
      "Current Aadhar or enrollment ID",
      "Proof of new address (if updating address)",
      "Passport or Voter ID",
      "Recent photograph",
    ],
  },
  {
    id: "passport",
    title: "Apply for Passport",
    description: "Get an Indian passport for domestic and international travel",
    steps: [
      "Create an account on the official Passport Seva website (passportindia.gov.in)",
      "Fill the online application form (Form A for fresh passport)",
      "Book an appointment at your nearest Passport Office",
      "Visit on your scheduled date with all documents",
      "Get your documents verified and biometric data captured",
      "Complete the payment",
      "Track your application online using the reference number",
      "Receive your passport at your address or office",
    ],
    tips: [
      "Apply at least 2 months before your travel date",
      "Use a recent passport-sized photograph (45mm x 35mm)",
      "Ensure all documents match your legal name",
      "If your name changed, bring the official document proof",
      "Online appointment booking is faster than visiting office directly",
    ],
    timeEstimate: "10-15 working days for regular service",
    documents: [
      "Aadhar Card",
      "Birth Certificate or 10th Mark Sheet",
      "Address Proof",
      "Recent Passport-sized photographs (6 copies)",
      "Proof of Indian citizenship",
    ],
  },
  {
    id: "voter-id",
    title: "Register as Voter / Get Voter ID",
    description: "Register to vote and get your voter identification card",
    steps: [
      "Visit your nearest electoral registration office or polling station",
      "Fill Form 6 (for new voter registration)",
      "Provide proof of citizenship (Aadhar, passport, birth certificate)",
      "Provide proof of address (utility bill, rental agreement)",
      "Submit the form with photocopied documents",
      "Your application will be verified in 2-3 weeks",
      "After verification, you'll be added to the voter list",
      "Visit the office again to collect your voter ID card",
    ],
    tips: [
      "Eligibility: Indian citizen, age 18+, not disqualified",
      "You can register online through nvsp.in",
      "Aadhar-based verification makes the process faster",
      "Your voter status can be checked on the electoral website",
      "Duplicate voter ID can be applied for if lost",
    ],
    timeEstimate: "3-4 weeks from application to voter card",
    documents: [
      "Aadhar Card",
      "Passport or Birth Certificate",
      "Address Proof (any government document)",
      "Passport-sized photograph",
    ],
  },
  {
    id: "ration-card",
    title: "Apply for Ration Card",
    description: "Get a ration card for subsidized food grains and essentials",
    steps: [
      "Visit your local food and civil supplies department office",
      "Collect the ration card application form",
      "Fill the form with your personal and address details",
      "Attach photocopies of required documents",
      "Submit at the office with proof of residence",
      "Official will inspect your residence to verify address",
      "Application will be processed and approved",
      "Collect your ration card from the office",
    ],
    tips: [
      "Processing takes 2-4 weeks depending on your location",
      "Address proof is the most important document",
      "All family members' names must be listed correctly",
      "Keep your ration card with you when buying from ration shop",
      "Updates to family size can be done anytime",
    ],
    timeEstimate: "2-4 weeks",
    documents: [
      "Address Proof (Aadhar, electricity bill, water bill)",
      "Identity Proof (Voter ID, Passport, Driving License)",
      "Proof of residence (rent agreement, property tax receipt)",
      "Passport-sized photographs of all family members",
    ],
  },
];

export default function StepByStepGuides() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProcess, setSelectedProcess] = useState<GuidanceProcess | null>(null);

  const filteredProcesses = processes.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageLayout>
      {!selectedProcess ? (
        <>
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Step-by-Step Government Guides</h1>
            <p className="text-blue-200 text-lg">Search for the government process you need help with and we'll guide you through it</p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <div className="relative">
              <input type="text" placeholder="Search for processes (e.g., driving license, PAN card, passport)..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full px-6 py-4 rounded-xl bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg" />
              <span className="absolute right-6 top-4 text-2xl">🔍</span>
            </div>
          </div>

          {/* Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProcesses.length > 0 ? (
              filteredProcesses.map((process) => (
                <div key={process.id} onClick={() => setSelectedProcess(process)} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer border-l-4 border-blue-500">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{process.title}</h3>
                  <p className="text-slate-600 mb-4">{process.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">⏱️ {process.timeEstimate}</span>
                    <button className="text-blue-500 font-semibold hover:text-blue-700 transition-colors">View Guide →</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-blue-200 text-xl">No processes found matching "{searchQuery}"</p>
                <p className="text-blue-300 mt-2">Try searching for driving license, PAN, passport, etc.</p>
              </div>
            )}
          </div>

          {searchQuery === "" && <div className="mt-8 text-center"><p className="text-blue-200">Showing {processes.length} government processes</p></div>}
        </>
      ) : (
        <>
          <button onClick={() => setSelectedProcess(null)} className="mb-8 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">← Back to Guides</button>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-slate-800 mb-2">{selectedProcess.title}</h1>
            <p className="text-slate-600 text-lg mb-8">{selectedProcess.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 pb-8 border-b-2 border-slate-200">
              <div className="bg-blue-50 rounded-lg p-6"><p className="text-sm text-slate-600 mb-2">Estimated Time</p><p className="text-2xl font-bold text-blue-600">{selectedProcess.timeEstimate}</p></div>
              <div className="bg-green-50 rounded-lg p-6"><p className="text-sm text-slate-600 mb-2">Documents Required</p><p className="text-2xl font-bold text-green-600">{selectedProcess.documents.length} Documents</p></div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"><span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">📋</span>Step-by-Step Instructions</h2>
              <div className="space-y-4">
                {selectedProcess.steps.map((step, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="flex-shrink-0"><div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500 text-white font-bold">{index + 1}</div></div>
                    <div className="flex-grow"><p className="text-lg text-slate-800 leading-relaxed">{step}</p></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm">📄</span>Documents You'll Need</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{selectedProcess.documents.map((doc, index) => (<div key={index} className="flex items-center gap-3 bg-green-50 p-4 rounded-lg"><span className="text-2xl">✓</span><span className="text-slate-800 font-medium">{doc}</span></div>))}</div>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"><span className="text-2xl">💡</span>Helpful Tips & Tricks</h2>
              <div className="space-y-4">{selectedProcess.tips.map((tip, index) => (<div key={index} className="flex gap-4"><span className="text-yellow-600 font-bold text-xl">→</span><p className="text-slate-700 leading-relaxed">{tip}</p></div>))}</div>
            </div>

            <div className="mt-12 pt-8 border-t-2 border-slate-200">
              <div className="bg-blue-50 rounded-xl p-8 text-center">
                <p className="text-slate-700 mb-4">Still have questions about this process?</p>
                <button className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">Contact Support</button>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
}
