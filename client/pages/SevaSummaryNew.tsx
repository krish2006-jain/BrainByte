import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { getTranslation } from "@/lib/translations";
import Navigation from "@/components/Navigation";
import PageLayout from "@/components/ui/page-layout";
import { FeatureDescriptionCard } from "@/components/FeatureDescriptionCard";
import { useLoading } from "@/lib/LoadingContext";
import { Upload, Send, FileText, X, MessageCircle, TrendingUp } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
}

interface UploadedFile {
  id: string;
  name: string;
  content: string;
  size: number;
}

export default function SevaSummary() {
  const { language } = useLanguage();
  const t = useTranslation();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG, or PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const newFile: UploadedFile = {
        id: Date.now().toString(),
        name: file.name,
        content: content,
        size: file.size,
      };
      setUploadedFile(newFile);

      // Add greeting message from AI
      const greetingMessage: Message = {
        id: Date.now().toString(),
        type: "ai",
        content: `📋 I've successfully loaded "${file.name}". I'm ready to help you understand your medical report. Ask me anything about your health findings!`,
      };
      setMessages([greetingMessage]);

      setTimeout(() => {
        const mockAnalysis = `📋 Document Overview

File: ${file.name}
Size: ${(file.size / 1024).toFixed(2)} KB
Status: ✓ Ready

Document Content:
• Medical report processed
• Key data identified
• Analysis complete

💡 Tips:
Ask specific questions about values, results, or what they mean for your health. I'll explain everything in simple, easy-to-understand language.`;
        setAnalysis(mockAnalysis);
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || !uploadedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
    };
    setMessages([...messages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `About your question on "${userMessage.content}":\n\n📊 Analysis:\nBased on your medical report, this is an important health metric. The values typically indicate [specific interpretation], and when compared to normal ranges, they show [health status].\n\n💡 What it means:\nThis finding suggests [explanation in simple terms]. You may want to discuss this further with your healthcare provider.\n\n✓ Feel free to ask more questions!`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleClearUpload = () => {
    setUploadedFile(null);
    setMessages([]);
    setAnalysis("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <PageLayout>
      <div className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-6">
          <h1 className="text-4xl font-bold mb-2 text-white">
            {getTranslation(language, "features.sevasummary.title")}
          </h1>
          <p className="text-blue-200 text-lg mb-6">
            {getTranslation(language, "features.sevasummary.subtitle")}
          </p>

          {/* Feature Description Card */}
          <FeatureDescriptionCard
            title="🏥 Seva Summary AI"
            description="Intelligent analysis of medical reports and government documents"
            features={[
              "Upload medical and government documents",
              "AI-powered instant summarization",
              "Key information extraction and highlights",
              "Chat with AI for detailed explanations",
            ]}
            icon="📋"
          />
        </div>

        {/* Three Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[650px]">
            {/* Left Column - AI Human Chat */}
            <div className="border-2 border-card-green rounded-xl overflow-hidden flex flex-col bg-gradient-to-br from-card/60 to-card/40 shadow-2xl hover:shadow-2xl transition-all duration-300 cursor-default">
              <div className="bg-gradient-to-r from-card-green/15 to-card-green/5 px-6 py-4 border-b border-card-green/20">
                <div className="flex items-center gap-2 mb-1">
                  <MessageCircle className="w-5 h-5 text-card-green" />
                  <h2 className="text-lg font-bold text-card-green">Health Guide AI</h2>
                </div>
                <p className="text-xs text-muted-foreground ml-7">Intelligent medical assistant</p>
              </div>

              <div className="p-6 flex-1 flex flex-col overflow-hidden">
                {/* AI Avatar - Professional Doctor */}
              {messages.length === 0 && !isLoading && (
                <div className="flex flex-col items-center justify-center mb-6">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F1a0ce45445164ef48f121607b86cacd1%2F3c7b7678baf84c1aaf49fa4645a9a56f?format=webp&width=400&height=500"
                    alt="Health Guide AI Doctor"
                    className="h-72 w-auto object-contain drop-shadow-2xl mb-4"
                  />

                  <div className="text-center">
                    <p className="text-lg text-card-green font-bold">Health Guide AI</p>
                    <p className="text-xs text-muted-foreground mt-1">Medical Assistant</p>
                  </div>
                </div>
              )}

                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-3">
                  {messages.length === 0 && !isLoading && (
                    <p className="text-xs text-muted-foreground text-center py-2">
                      {t("seva.uploadDocument")}
                    </p>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`text-sm p-3 rounded-lg leading-relaxed ${
                        msg.type === "user"
                          ? "bg-card-green/20 text-foreground ml-4 border-l-2 border-card-green"
                          : "bg-muted text-foreground mr-2"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-sm p-3 rounded-lg bg-muted text-muted-foreground">
                      <span className="inline-block w-2 h-2 bg-card-green rounded-full animate-bounce"></span>
                      <span className="inline-block w-2 h-2 bg-card-green rounded-full animate-bounce"></span>
                      <span className="inline-block w-2 h-2 bg-card-green rounded-full animate-bounce"></span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>

            {/* Middle Column - Upload & Ask */}
            <div className="flex flex-col gap-5">
              {/* Upload Document */}
              <div
                className="border-2 border-dashed border-card-green rounded-xl p-8 flex flex-col items-center justify-center flex-1 bg-gradient-to-br from-card-green/5 to-card-green/2 cursor-pointer hover:bg-card-green/10 hover:border-solid transition-all group shadow-xl"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="mb-3 p-3 bg-card-green/20 rounded-lg group-hover:bg-card-green/30 transition-colors">
                  <Upload className="w-8 h-8 text-card-green group-hover:scale-110 transition-transform" />
                </div>
                <p className="font-bold text-center text-sm text-foreground mb-1">{t("seva.uploadDocument")}</p>
                <p className="text-xs text-muted-foreground text-center">{t("seva.uploadHint")}</p>
                <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" title="Upload medical report" aria-label="Upload medical report" />
              </div>

              <div className="border-2 border-card-green rounded-xl p-5 flex flex-col flex-1 bg-gradient-to-br from-card/60 to-card/40 shadow-2xl transition-all duration-300">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-card-green/20">
                  <MessageCircle className="w-4 h-4 text-card-green" />
                  <p className="font-semibold text-sm text-card-green">Chat with Health Guide</p>
                </div>
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} placeholder={t("seva.askHint")} disabled={!uploadedFile} className="flex-1 bg-muted/50 border border-card-green/20 rounded-lg px-4 py-3 text-sm mb-3 outline-none placeholder-muted-foreground disabled:opacity-50 focus:border-card-green focus:ring-1 focus:ring-card-green/30 transition-all" />
                <button onClick={handleSendMessage} title="Send message" aria-label="Send message" disabled={!uploadedFile || !inputValue.trim() || isLoading} className="bg-gradient-to-r from-card-green to-card-green/90 hover:from-card-green/90 hover:to-card-green/80 text-white px-4 py-3 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg">
                  <Send className="w-4 h-4" />
                  {getTranslation(language, "seva.send")}
                </button>
              </div>
            </div>

            {/* Right Column - Analysis */}
            <div className="border-2 border-card-green rounded-xl overflow-hidden flex flex-col bg-gradient-to-br from-card/60 to-card/40 shadow-2xl hover:shadow-2xl transition-all duration-300 cursor-default">
              <div className="bg-gradient-to-r from-card-green/15 to-card-green/5 px-6 py-4 border-b border-card-green/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-card-green" />
                  <h2 className="text-lg font-bold text-card-green">Report Insights</h2>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                {uploadedFile ? (
                  <div>
                    <div className="mb-5 p-4 bg-card-green/10 rounded-lg border border-card-green/20 flex items-start justify-between group hover:bg-card-green/15 transition-colors">
                      <div className="flex items-start gap-3 flex-1">
                        <FileText className="w-5 h-5 text-card-green flex-shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold text-foreground truncate group-hover:text-card-green transition-colors">{uploadedFile.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">{formatFileSize(uploadedFile.size)}</p>
                        </div>
                      </div>
                      <button onClick={handleClearUpload} title="Remove document" aria-label="Remove document" className="text-muted-foreground hover:text-card-green hover:bg-card-green/10 p-1 rounded transition-colors flex-shrink-0" key="remove-btn"><X className="w-4 h-4" /></button>
                    </div>
                    <div className="text-sm text-foreground whitespace-pre-wrap space-y-2 leading-relaxed">
                      {analysis.split("\n").map((line, i) => (
                        <p key={i} className={line.startsWith("•") ? "ml-3" : ""}>{line}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="mb-3 p-3 bg-muted rounded-lg"><FileText className="w-8 h-8 text-muted-foreground opacity-40" /></div>
                    <p className="text-sm font-medium text-foreground mb-1">{t("seva.noDocumentSelected")}</p>
                    <p className="text-xs text-muted-foreground">{t("seva.selectDocumentToAnalyze")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
