"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

export default function StudyPartner() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateResponse = (prompt: string) => {
    const replies = [
      "I'm here to help! Let's tackle this together.",
      "Great question! Here's a simple explanation...",
      "Don't worry! We'll break this down step by step.",
      "You're doing amazing, keep going! Here's what I found...",
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);
    setTimeout(() => {
      const aiMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        type: "ai",
        content: generateResponse(inputValue),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-900">
      <div className="border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/vidyarthi-ai")} className="text-blue-400 hover:underline">← Back</button>
        <h1 className="text-white font-semibold">Study Partner</h1>
        <div />
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-md px-4 py-3 rounded-lg ${msg.type === "user" ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-100"}`}>
              <p className="text-sm leading-relaxed">{msg.content}</p>
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
      <div className="border-t border-slate-700 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Talk to your study partner..."
            className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg transition disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}