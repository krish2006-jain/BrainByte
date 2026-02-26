"use client";

import { useState, useRef, useEffect } from "react";
import {
  X,
  Send,
  Loader2,
  FileText,
  Lightbulb,
} from "lucide-react";
import PageLayout from "@/components/ui/page-layout";
import { useLanguage } from "@/lib/LanguageContext";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  preview: string;
  size: number;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  sources?: string[];
  timestamp: Date;
}

interface TopicOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  suggestions: string[];
}

const topicOptions: TopicOption[] = [
  {
    id: "studies",
    title: "Study Materials",
    description: "Upload textbooks, notes, or study guides",
    icon: "📚",
    suggestions: [
      "Summarize the main concepts",
      "Create flashcards for key terms",
      "Generate a practice quiz",
      "What are the main takeaways?",
    ],
  },
  {
    id: "research",
    title: "Research Papers",
    description: "Analyze academic or research documents",
    icon: "🔬",
    suggestions: [
      "What is the methodology?",
      "Summarize the findings",
      "Extract key citations",
      "What are the limitations?",
    ],
  },
  {
    id: "articles",
    title: "Articles & News",
    description: "Understand news articles or blog posts",
    icon: "📰",
    suggestions: [
      "What is the main story?",
      "Who are the key stakeholders?",
      "What impact does this have?",
      "Find supporting evidence",
    ],
  },
  {
    id: "technical",
    title: "Technical Docs",
    description: "Learn from technical documentation",
    icon: "⚙️",
    suggestions: [
      "Explain like I'm 5",
      "What are the use cases?",
      "How do I implement this?",
      "What are the best practices?",
    ],
  },
];

export default function VidyarthiAINew() {
  const { language } = useLanguage();
  const [stage, setStage] = useState<"topic-select" | "upload" | "chat">("topic-select");
  const [selectedTopic, setSelectedTopic] = useState<TopicOption | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleTopicSelect = (topic: TopicOption) => {
    setSelectedTopic(topic);
    setStage("upload");
  };

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach((file) => {
      const validTypes = ["image/jpeg", "image/png", "application/pdf"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload JPG, PNG images or PDF files");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const newFile: UploadedFile = {
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          type: file.type,
          preview: e.target?.result as string,
          size: file.size,
        };
        setUploadedFiles((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (id: string) => setUploadedFiles((prev) => prev.filter((f) => f.id !== id));

  const handleContinueToChat = () => {
    if (uploadedFiles.length === 0) {
      alert("Please upload at least one document");
      return;
    }
    setStage("chat");
    const welcomeMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "ai",
      content: `Great! I've loaded your ${uploadedFiles.length} document(s). I can help you understand, summarize, and analyze them. Ask me anything or try one of the suggestions!`,
      sources: uploadedFiles.map((f) => f.name),
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  };

  const generateAIResponse = (prompt: string): string => {
    const responses: { [key: string]: string[] } = {
      summarize: [
        "Based on your document, here's a comprehensive summary: The document covers several key topics including...",
        "I've analyzed your material and here are the main points...",
      ],
      quiz: [
        "Here's a quiz to test your understanding:\n\n1. What are the main concepts discussed?",
        "Let me create a quick quiz:\n\n1. Define the key terms",
      ],
      flashcards: [
        "Key terms and definitions:\n\n• Concept 1: Definition and explanation",
      ],
      findings: [
        "Key findings from your document:\n\n1. Primary discovery",
      ],
      explain: [
        "Let me break this down simply:\n\nThink of it like a real-world example...",
      ],
    };

    const keywords = prompt.toLowerCase();
    let category = "summarize";
    if (keywords.includes("quiz") || keywords.includes("test")) category = "quiz";
    else if (keywords.includes("flashcard") || keywords.includes("terms")) category = "flashcards";
    else if (keywords.includes("finding") || keywords.includes("result")) category = "findings";
    else if (keywords.includes("explain") || keywords.includes("simple") || keywords.includes("5")) category = "explain";

    const categoryResponses = responses[category] || responses.summarize;
    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && !selectedSuggestion) return;
    const messageText = selectedSuggestion || inputValue;
    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      content: messageText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setSelectedSuggestion("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(messageText);
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: "ai",
        content: aiResponse,
        sources: uploadedFiles.slice(0, 2).map((f) => f.name),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1200);
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
      {stage === "topic-select" ? (
        <>
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">📚 Vidyarthi AI</h1>
            <p className="text-blue-200 text-lg mb-2">Your AI-powered study companion</p>
            <p className="text-slate-400">Choose what you want to learn or study</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicOptions.map((topic) => (
              <button key={topic.id} onClick={() => handleTopicSelect(topic)} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-left border-2 border-transparent hover:border-blue-400">
                <div className="text-5xl mb-4">{topic.icon}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{topic.title}</h3>
                <p className="text-slate-600 mb-6">{topic.description}</p>
                <div className="text-sm text-blue-600 font-semibold">Click to get started →</div>
              </button>
            ))}
          </div>
        </>
      ) : stage === "upload" ? (
        <>
          <div className="mb-12">
            <button onClick={() => setStage("topic-select")} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">← Back</button>

            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="text-5xl">{selectedTopic?.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-slate-800">{selectedTopic?.title}</h2>
                  <p className="text-slate-600">{selectedTopic?.description}</p>
                </div>
              </div>

              <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-blue-300 rounded-xl p-12 text-center cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all mb-8">
                <div className="text-5xl mb-4">📤</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Upload Your Documents</h3>
                <p className="text-slate-600 mb-2">Click to browse or drag and drop</p>
                <p className="text-sm text-slate-500">Supported formats: PDF, JPG, PNG (Max 10MB per file)</p>
              </div>
              <input ref={fileInputRef} type="file" multiple onChange={(e) => e.target.files && handleFileUpload(e.target.files)} title="Upload documents" aria-label="Upload documents" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />

              {uploadedFiles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Uploaded Files ({uploadedFiles.length})</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-3">
                          <FileText className="w-6 h-6 text-blue-500" />
                          <div>
                            <p className="font-semibold text-slate-800">{file.name}</p>
                            <p className="text-sm text-slate-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <button onClick={() => handleRemoveFile(file.id)} title={`Remove ${file.name}`} aria-label={`Remove ${file.name}`} className="text-red-500 hover:text-red-700"><X className="w-5 h-5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={handleContinueToChat} disabled={uploadedFiles.length === 0} className="w-full px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-400 transition-colors font-bold text-lg">Continue to Chat →</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <button onClick={() => { setStage("topic-select"); setUploadedFiles([]); setMessages([]); }} className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">← Start New Session</button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[600px]">
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs lg:max-w-md p-4 rounded-lg ${msg.type === "user" ? "bg-blue-500 text-white" : "bg-slate-100 text-slate-800"}`}>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      {msg.sources && msg.type === "ai" && <p className="text-xs mt-2 opacity-70">Based on: {msg.sources.join(", ")}</p>}
                    </div>
                  </div>
                ))}
                {isLoading && (<div className="flex justify-start"><div className="bg-slate-100 text-slate-800 p-4 rounded-lg flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /><span className="text-sm">Thinking...</span></div></div>)}
                <div ref={messagesEndRef} />
              </div>

              <div className="border-t p-4 space-y-4">
                {selectedTopic && messages.length === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-600 font-semibold">Try asking:</p>
                    <div className="grid grid-cols-2 gap-2">{selectedTopic.suggestions.slice(0,4).map((sugg, i) => (<button key={i} onClick={() => setSelectedSuggestion(sugg)} className="text-left text-xs p-2 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition-colors">{sugg}</button>))}</div>
                  </div>
                )}

                <div className="flex gap-2">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} placeholder="Ask me anything about your documents..." className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <button onClick={handleSendMessage} title="Send message" aria-label="Send message" disabled={isLoading || (!inputValue.trim() && !selectedSuggestion)} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-slate-400 transition-colors"><Send className="w-5 h-5" /></button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><FileText className="w-5 h-5" />Your Documents</h3>
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2"><Lightbulb className="w-5 h-5 text-yellow-500" />Tips</h3>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li>✓ Ask specific questions</li>
                  <li>✓ Request summaries</li>
                  <li>✓ Create quizzes</li>
                  <li>✓ Extract key points</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </PageLayout>
  );
}
