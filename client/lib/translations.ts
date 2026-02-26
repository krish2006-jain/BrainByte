export type Language = "en" | "hi" | "ta";

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.appName": "Bharat-AI",
    "nav.language": "Language",
    
    // Home Page
    "home.hero.title": "Empowering Bharat with AI",
    "home.hero.subtitle": "Three powerful AI-driven services to improve civic, health, and educational access for Indian communities",
    
    // Feature Cards
    "features.sarkaridost.title": "Sarkari-Dost",
    "features.sarkaridost.subtitle": "Civic Assistant",
    "features.sarkaridost.description": "Get help understanding Aadhaar, driving licenses, and other government documents with AI-powered assistance.",
    
    "features.sevasummary.title": "Seva-Summary",
    "features.sevasummary.subtitle": "Health Interpreter",
    "features.sevasummary.description": "Understand your medical reports and prescriptions easily with AI-powered health interpretation.",
    
    "features.vidyarthi.title": "Vidyarthi-AI",
    "features.vidyarthi.subtitle": "Study Companion",
    "features.vidyarthi.description": "Summarize your study notes and generate practice quizzes with AI-powered learning tools.",
    
    "common.getStarted": "Get Started",
    "common.backToHome": "Back to Home",
    "common.analyzeDocument": "Analyze Document",
    "common.uploadDifferent": "Upload Different File",
    "common.clearUpload": "Clear & Upload New",
    "common.analyzeAnother": "Analyze Another Document",
    "common.chooseFile": "Choose File",
    "common.dragDrop": "Drag & Drop Your File",
    "common.dragDropHint": "or click the button below to select a JPG, PNG image or PDF",
    "common.analyzing": "AI is analyzing your document...",
    "common.waiting": "Please wait while we process your file",
    "common.ready": "Ready to analyze. Click the button below to start.",
    "common.uploadedDoc": "Uploaded Document",
    "common.aiSummary": "AI-Generated Summary",
    "common.analysisResults": "Analysis Results",
    "common.pdfDocument": "PDF Document",
    
    // Tool Pages
    "tools.sarkaridost.description": "Get help understanding Aadhaar, driving licenses, and other government documents with AI-powered assistance.",
    "tools.sevasummary.description": "Understand your medical reports and prescriptions easily with AI-powered health interpretation.",
    "tools.vidyarthi.description": "Summarize your study notes and generate practice quizzes with AI-powered learning tools.",
    
    // Vidyarthi-AI (NotebookLM-like)
    "vidyarthi.uploadDocuments": "Upload Your Study Materials",
    "vidyarthi.uploadHint": "Upload documents, notes, or PDFs to start learning",
    "vidyarthi.uploadedDocuments": "Uploaded Documents",
    "vidyarthi.askQuestion": "Ask a question about your documents...",
    "vidyarthi.send": "Send",
    "vidyarthi.sources": "Sources",
    "vidyarthi.generatingInsights": "Generating insights...",
    "vidyarthi.aiInsights": "AI Insights",
    "vidyarthi.generateQuiz": "Generate Quiz",
    "vidyarthi.summarizeNotes": "Summarize Notes",
    "vidyarthi.noDocuments": "No documents uploaded yet",
    "vidyarthi.uploadToStart": "Upload documents to start exploring",

    // Seva-Summary (Health Interpreter)
    "seva.aiHuman": "AI HUMAN",
    "seva.uploadDocument": "UPLOAD DOCUMENT",
    "seva.uploadHint": "Upload your medical reports and prescriptions",
    "seva.askAboutDocument": "ASK SOMETHING RELATED TO THE DOCUMENT WHICH WILL BE ANSWERED BY AI HUMAN",
    "seva.askHint": "Ask your health-related questions here...",
    "seva.analysisOfDocument": "ANALYSIS OF DOCUMENT",
    "seva.noDocumentSelected": "No document selected",
    "seva.selectDocumentToAnalyze": "Upload and select a document to see analysis",
    "seva.send": "Send",
    
    // Footer
    "footer.copyright": "© 2024 Bharat-AI. Built for the AI for Bharat hackathon.",
  },
  
  hi: {
    // Navigation
    "nav.appName": "भारत-AI",
    "nav.language": "भाषा",
    
    // Home Page
    "home.hero.title": "भारत को AI से सशक्त बनाना",
    "home.hero.subtitle": "भारतीय समुदायों के लिए नागरिक, स्वास्थ्य और शैक्षिक पहुंच में सुधार के लिए तीन शक्तिशाली AI-संचालित सेवाएं",
    
    // Feature Cards
    "features.sarkaridost.title": "सरकारी-दोस्त",
    "features.sarkaridost.subtitle": "नागरिक सहायक",
    "features.sarkaridost.description": "आधार, ड्राइविंग लाइसेंस और अन्य सरकारी दस्तावेजों को समझने में AI-संचालित सहायता प्राप्त करें।",
    
    "features.sevasummary.title": "सेवा-सारांश",
    "features.sevasummary.subtitle": "स्वास्थ्य दुभाषिया",
    "features.sevasummary.description": "AI-संचालित स्वास्थ्य व्याख्या के साथ अपनी चिकित्सा रिपोर्ट और प्रेषण आसानी से समझें।",
    
    "features.vidyarthi.title": "विद्यार्थी-AI",
    "features.vidyarthi.subtitle": "अध्ययन साथी",
    "features.vidyarthi.description": "AI-संचालित सीखने के उपकरणों के साथ अपने अध्ययन नोट्स को सारांशित करें और व्यावहारिक प्रश्नोत्तरी बनाएं।",
    
    "common.getStarted": "शुरू करें",
    "common.backToHome": "होम पर वापस जाएं",
    "common.analyzeDocument": "दस्तावेज़ का विश्लेषण करें",
    "common.uploadDifferent": "अलग फ़ाइल अपलोड करें",
    "common.clearUpload": "साफ करें और नया अपलोड करें",
    "common.analyzeAnother": "दूसरा दस्तावेज़ विश्लेषण करें",
    "common.chooseFile": "फ़ाइल चुनें",
    "common.dragDrop": "अपनी फ़ाइल को ड्रैग और ड्रॉप करें",
    "common.dragDropHint": "या JPG, PNG छवि या PDF चुनने के लिए नीचे दिए गए बटन पर क्लिक करें",
    "common.analyzing": "AI आपके दस्तावेज़ का विश्लेषण कर रहा है...",
    "common.waiting": "कृपया प्रतीक्षा करें जबकि हम आपकी फ़ाइल को संसाधित करते हैं",
    "common.ready": "विश्लेषण के लिए तैयार है। शुरू करने के लिए नीचे दिए गए बटन पर क्लिक करें।",
    "common.uploadedDoc": "अपलोड किया गया दस्तावेज़",
    "common.aiSummary": "AI द्वारा तैयार सारांश",
    "common.analysisResults": "विश्लेषण परिणाम",
    "common.pdfDocument": "PDF दस्तावेज़",
    
    // Tool Pages
    "tools.sarkaridost.description": "आधार, ड्राइविंग लाइसेंस और अन्य सरकारी दस्तावेजों को समझने में AI-संचालित सहायता प्राप्त करें।",
    "tools.sevasummary.description": "AI-संचालित स्वास्थ्य व्याख्या के साथ अपनी चिकित्सा रिपोर्ट और प्रेषण आसानी से समझें।",
    "tools.vidyarthi.description": "AI-संचालित सीखने के उपकरणों के साथ अपने अध्ययन नोट्स को सारांशित करें और व्यावहारिक प्रश्नोत्तरी बनाएं।",
    
    // Vidyarthi-AI (NotebookLM-like)
    "vidyarthi.uploadDocuments": "अपनी अध्ययन सामग्री अपलोड करें",
    "vidyarthi.uploadHint": "सीखना शुरू करने के लिए दस्तावेज़, नोट्स या PDFs अपलोड करें",
    "vidyarthi.uploadedDocuments": "अपलोड किए गए दस्तावेज़",
    "vidyarthi.askQuestion": "अपने दस्तावेज़ों के बारे में एक प्रश्न पूछें...",
    "vidyarthi.send": "भेजें",
    "vidyarthi.sources": "स्रोत",
    "vidyarthi.generatingInsights": "अंतर्दृष्टि बनाई जा रही है...",
    "vidyarthi.aiInsights": "AI अंतर्दृष्टि",
    "vidyarthi.generateQuiz": "क्विज़ जेनरेट करें",
    "vidyarthi.summarizeNotes": "नोट्स को सारांशित करें",
    "vidyarthi.noDocuments": "अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया",
    "vidyarthi.uploadToStart": "अन्वेषण शुरू करने के लिए दस्तावेज़ अपलोड करें",

    // Seva-Summary (Health Interpreter)
    "seva.aiHuman": "AI मानव",
    "seva.uploadDocument": "दस्तावेज़ अपलोड करें",
    "seva.uploadHint": "अपनी चिकित्सा रिपोर्ट और पर्चे अपलोड करें",
    "seva.askAboutDocument": "दस्तावेज़ से संबंधित कोई प्रश्न पूछें जो AI मानव द्वारा उत्तर दिया जाएगा",
    "seva.askHint": "यहां अपने स्वास्थ्य संबंधित प्रश्न पूछें...",
    "seva.analysisOfDocument": "दस्तावेज़ का विश्लेषण",
    "seva.noDocumentSelected": "कोई दस्तावेज़ चयनित नहीं है",
    "seva.selectDocumentToAnalyze": "विश्लेषण देखने के लिए एक दस्तावेज़ अपलोड और चुनें",
    "seva.send": "भेजें",
    
    // Footer
    "footer.copyright": "© 2024 भारत-AI। AI for Bharat हैकाथॉन के लिए बनाया गया।",
  },
  
  ta: {
    // Navigation
    "nav.appName": "பாரத்-AI",
    "nav.language": "மொழி",
    
    // Home Page
    "home.hero.title": "AI மூலம் பாரதத்தை ক்ষமதாக்குதல்",
    "home.hero.subtitle": "இந்திய சமூகங்களுக்கான பொதுசேவை, சுகாதாரம் மற்றும் கல்வி அணுகலை மேம்படுத்த மூன்று சக்திशாலி AI-இயக்கிய சேவைகள்",
    
    // Feature Cards
    "features.sarkaridost.title": "சார்கரி-தோழ்",
    "features.sarkaridost.subtitle": "குடிமக்கள் உதவி",
    "features.sarkaridost.description": "ஆதார், ஓட்டுநர் உரிமம் மற்றும் பிற அரசு ஆவணங்களைப் புரிந்துகொள்ள AI-இயக்கிய உதவி பெறுங்கள்.",
    
    "features.sevasummary.title": "சேவா-சுருக்கம்",
    "features.sevasummary.subtitle": "சுகாதாரம் மொழிபெயர்ப்பாளர்",
    "features.sevasummary.description": "AI-இயக்கிய சுகாதாரம் விளக்கத்துடன் உங்கள் மருத்துவ அறிக்கை மற்றும் பரிந்துரைகளை எளிதாகப் புரிந்துகொள்ளுங்கள்.",
    
    "features.vidyarthi.title": "விதியார்த்தி-AI",
    "features.vidyarthi.subtitle": "கற்றல் உதவி",
    "features.vidyarthi.description": "AI-இயக்கிய கற்றல் கருவிகளுடன் உங்கள் ஆய்வு குறிப்புகளை சுருக்கம் செய்யுங்கள் மற்றும் நடைமுறை வினாடி வினாக்களை உருவாக்குங்கள்.",
    
    "common.getStarted": "தொடங்குங்கள்",
    "common.backToHome": "வீட்டிற்கு திரும்பவும்",
    "common.analyzeDocument": "ஆவணத்தை பகுப்பாய்வு செய்யுங்கள்",
    "common.uploadDifferent": "வெவ்வேறு கோப்பை பதிவேற்றவும்",
    "common.clearUpload": "அழிக்கவும் மற்றும் புதிய பதிவேற்றவும்",
    "common.analyzeAnother": "மற்றொரு ஆவணத்தை பகுப்பாய்வு செய்யுங்கள்",
    "common.chooseFile": "கோப்பைத் தேர்ந்தெடுக்கவும்",
    "common.dragDrop": "உங்கள் கோப்பை இழுத்து விடவும்",
    "common.dragDropHint": "அல்லது JPG, PNG படம் அல்லது PDF ஐ தேர்ந்தெடுக்க கீழே உள்ள பொத்தானை கிளிக் செய்யவும்",
    "common.analyzing": "AI உங்கள் ஆவணத்தை பகுப்பாய்வு செய்யக் குறியாக உள்ளது...",
    "common.waiting": "உங்கள் கோப்பை செயல்படுத்தும் போது தயவுசெய்து காத்திருங்கள்",
    "common.ready": "பகுப்பாய்விற்கு தயாரிருக்கிறது. தொடங்க கீழே உள்ள பொத்தானை கிளிக் செய்யவும்.",
    "common.uploadedDoc": "பதிவேற்றப்பட்ட ஆவணம்",
    "common.aiSummary": "AI-உருவாக்கப்பட்ட சுருக்கம்",
    "common.analysisResults": "பகுப்பாய்வு முடிவுகள்",
    "common.pdfDocument": "PDF ஆவணம்",
    
    // Tool Pages
    "tools.sarkaridost.description": "ஆதார், ஓட்டுநர் உரிமம் மற்றும் பிற அரசு ஆவணங்களைப் புரிந்துகொள்ள AI-இயக்கிய உதவி பெறுங்கள்.",
    "tools.sevasummary.description": "AI-இயக்கிய சுகாதாரம் விளக்கத்துடன் உங்கள் மருத்துவ அறிக்கை மற்றும் பரிந்துரைகளை எளிதாகப் புரிந்துகொள்ளுங்கள்.",
    "tools.vidyarthi.description": "AI-இயக்கிய கற்றல் கருவிகளுடன் உங்கள் ஆய்வு குறிப்புகளை சுருக்கம் செய்யுங்கள் மற்றும் நடைமுறை வினாடி வினாக்களை உருவாக்குங்கள்.",
    
    // Vidyarthi-AI (NotebookLM-like)
    "vidyarthi.uploadDocuments": "உங்கள் ஆய்வு பொருட்களை பதிவேற்றவும்",
    "vidyarthi.uploadHint": "கற்றல் தொடங்க ஆவணங்கள், குறிப்புகள் அல்லது PDFகளைப் பதிவேற்றவும்",
    "vidyarthi.uploadedDocuments": "பதிவேற்றப்பட்ட ஆவணங்கள்",
    "vidyarthi.askQuestion": "உங்கள் ஆவணங்களைப் பற்றி ஒரு கேள்வி கேட்கவும்...",
    "vidyarthi.send": "அனுப்பவும்",
    "vidyarthi.sources": "ஆதாரங்கள்",
    "vidyarthi.generatingInsights": "அந்தர்ज्ञानங்கள் உருவாக்கப்படுகின்றன...",
    "vidyarthi.aiInsights": "AI அந்தर्ज्ञानங்கள்",
    "vidyarthi.generateQuiz": "வினாடி வினா உருவாக்கவும்",
    "vidyarthi.summarizeNotes": "குறிப்புகளைச் சுருக்கம் செய்யவும்",
    "vidyarthi.noDocuments": "இன்னும் கோப்புகள் பதிவேற்றப்படவில்லை",
    "vidyarthi.uploadToStart": "ஆராய்தல் தொடங்க ஆவணங்களைப் பதிவேற்றவும்",

    // Seva-Summary (Health Interpreter)
    "seva.aiHuman": "AI மனிதன்",
    "seva.uploadDocument": "ஆவணத்தைப் பதிவேற்றவும்",
    "seva.uploadHint": "உங்கள் மருத்துவ அறிக்கை மற்றும் பரிந்துரைகளைப் பதிவேற்றவும்",
    "seva.askAboutDocument": "ஆவணம் பற்றி AI மனிதன் பதிலளிக்கும் கேள்விகளைக் கேட்கவும்",
    "seva.askHint": "இங்கே உங்கள் சுகாதாரம் தொடர்பான கேள்விகளைக் கேட்கவும்...",
    "seva.analysisOfDocument": "ஆவணத்தின் பகுப்பாய்வு",
    "seva.noDocumentSelected": "ஆவணம் தேர்ந்தெடுக்கப்படவில்லை",
    "seva.selectDocumentToAnalyze": "பகுப்பாய்வைப் பார்க்க ஆவணத்தைப் பதிவேற்றி தேர்ந்தெடுக்கவும்",
    "seva.send": "அனுப்பவும்",
    
    // Footer
    "footer.copyright": "© 2024 பாரத்-AI. AI for Bharat ஹ்யாகாதான்ற்றிற்கு கட்டப்பட்டது.",
  },
};

export const getTranslation = (language: Language, key: string): string => {
  return translations[language][key] || key;
};
