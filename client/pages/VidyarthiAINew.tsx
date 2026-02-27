"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Send,
  Loader2,
  FileText,
  Plus,
  Search,
  Upload,
  Grid3x3,
  BarChart3,
  BookOpen,
  CheckSquare,
  MessageSquare,
  MoreVertical,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

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


const studyTools = [
  { id: "mindmap", title: "Mind Map", icon: Grid3x3, color: "bg-blue-600", description: "Visual concept mapping" },
  { id: "reports", title: "Reports", icon: BarChart3, color: "bg-purple-600", description: "Detailed analysis" },
  { id: "flashcards", title: "Flashcards", icon: BookOpen, color: "bg-green-600", description: "Quick revision" },
  { id: "quiz", title: "Quiz", icon: CheckSquare, color: "bg-orange-600", description: "Test your knowledge" },
  { id: "study-partner", title: "Study Partner", icon: MessageSquare, color: "bg-indigo-600", description: "Talk with your AI study partner for help, motivation, and learning support.", route: "/study-partner" },
];

export default function VidyarthiAINew() {
  const { language } = useLanguage();
  const t = useTranslation();
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const generateAIResponse = (prompt: string): string => {
    const responses: string[] = [
      "That's a great question! Based on your materials, here's what I found...",
      "Let me help you understand this better. Here's what the material says...",
      "Excellent question! Here's a clear explanation...",
      "I can definitely help with that. Here's what I discovered...",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: "ai",
        content: aiResponse,
        sources: uploadedFiles.slice(0, 2).map((f) => f.name),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="h-screen w-full bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 group hover:opacity-80 transition-opacity"
        >
          {/* Animated logo icon */}
          <div className="relative w-8 h-8">
            <div
              className="absolute inset-0 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                boxShadow: "0 0 16px rgba(99,102,241,0.5)",
              }}
            />
            <div className="relative w-full h-full rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-base leading-none">⚡</span>
            </div>
          </div>

          {/* Brand text */}
          <div className="hidden sm:flex flex-col leading-none">
            <span
              className="font-black text-lg tracking-tight"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bharat AI
            </span>
          </div>
        </button>
        <div className="flex items-center gap-3">
          <button className="text-slate-400 hover:text-white transition">
            <Zap className="w-5 h-5" />
          </button>
          <select className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold cursor-pointer">
            <option>English</option>
            <option>हिंदी</option>
            <option>தமிழ்</option>
          </select>
          <button className="text-slate-400 hover:text-white transition">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Sidebar - Sources */}
        <div className="w-56 bg-slate-800 border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h2 className="text-white font-semibold text-sm">Sources</h2>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Add Sources Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border border-dashed border-slate-600 hover:border-blue-500 rounded-lg py-3 px-3 text-center transition text-slate-300 hover:text-blue-400 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add sources
            </button>

            {/* Deep Research Suggestion */}
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-3 text-sm cursor-pointer hover:border-blue-500 transition">
              <div className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Try Deep Research</p>
                  <p className="text-slate-400 text-xs">for an in-depth report and new sources!</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search the web for new"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 rounded-lg transition flex items-center justify-center gap-1">
                <div className="w-3 h-3 rounded-full bg-white" />
                Web
              </button>
              <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-medium py-2 rounded-lg transition flex items-center justify-center gap-1">
                ⚡ Research
              </button>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-slate-400 font-semibold px-1">{t("vidyarthi.uploadedDocuments")}</p>
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="bg-slate-700 border border-slate-600 rounded-lg p-2 text-xs group hover:border-blue-500 transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-slate-300 truncate font-medium">{file.name}</p>
                      <button
                        onClick={() => handleRemoveFile(file.id)}
                        className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-slate-500 text-xs">{formatFileSize(file.size)}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Info Box */}
            <div className="bg-slate-700 border border-slate-600 rounded-lg p-3 text-xs text-slate-300 mt-auto">
              <FileText className="w-4 h-4 mb-2 text-slate-500" />
              <p className="text-slate-400">Saved sources will appear here</p>
              <p className="text-slate-500 text-xs mt-1">Click 'Add source' above to add PDFs, websites, text, videos, or audio files. Or import a file directly from Google Drive.</p>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-slate-900">
          {/* Chat Header */}
          <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
            <h1 className="text-white font-semibold">Chat</h1>
            <div className="flex items-center gap-2">
              <button className="text-slate-400 hover:text-white transition p-2">
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button className="text-slate-400 hover:text-white transition p-2">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6">
                <Upload className="w-16 h-16 text-slate-600" />
                <div className="text-center">
                  <h2 className="text-white text-lg font-semibold mb-2">{t("vidyarthi.uploadDocuments")}</h2>
                  <p className="text-slate-400 text-sm mb-6">{t("vidyarthi.uploadHint")}</p>
                </div>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition"
                >
                  {t("common.chooseFile")}
                </button>

                {/* Study Tools Grid */}
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {studyTools.map((tool) => {
                    const Icon = tool.icon;
                    const extraClass = tool.id === "study-partner" ? "col-span-2" : "";
                    return (
                      <button
                        key={tool.id}
                        onClick={() => tool.route && navigate(tool.route)}
                        className={`${extraClass} ${tool.color} text-white rounded-lg p-4 hover:opacity-90 transition flex flex-col items-center justify-center gap-2 min-h-24 text-left`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-sm font-medium">{tool.title}</span>
                        {tool.description && <span className="text-xs mt-1 opacity-90">{tool.description}</span>}
                      </button>
                    );
                  })}
                </div>

                <p className="text-slate-500 text-xs mt-8">
                  Upload a source to get started • {uploadedFiles.length} sources
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-lg ${
                        msg.type === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-slate-700 text-slate-100"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      {msg.sources && msg.type === "ai" && (
                        <p className="text-xs mt-2 opacity-70">Based on: {msg.sources.join(", ")}</p>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-lg flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          {messages.length > 0 && (
            <div className="border-t border-slate-700 p-4 bg-slate-900">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={t("vidyarthi.askQuestion")}
                  className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg transition disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
      />
    </div>
  );
}
