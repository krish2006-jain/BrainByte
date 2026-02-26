import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Upload, ArrowLeft, X, Loader2 } from "lucide-react";
import Navigation from "./Navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { getTranslation } from "@/lib/translations";

interface ToolPageProps {
  titleKey: string;
  subtitleKey: string;
  descriptionKey: string;
  accentColor: string;
  accentBg: string;
}

interface UploadedFile {
  file: File;
  preview: string;
}

export default function ToolPage({
  titleKey,
  subtitleKey,
  descriptionKey,
  accentColor,
  accentBg,
}: ToolPageProps) {
  const { language } = useLanguage();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragOverRef = useRef(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dragOverRef.current = true;
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragOverRef.current = false;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragOverRef.current = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a JPG, PNG image or PDF file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedFile({
        file,
        preview: e.target?.result as string,
      });
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;

    setIsLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setResult(
        "AI analysis complete! Your document has been processed successfully. " +
          "In a production environment, this would contain the AI-generated insights, " +
          "summaries, or structured data extracted from your document."
      );
      setIsLoading(false);
    }, 2000);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const accentColorMap: Record<string, { primary: string; light: string; dark: string }> = {
    "card-blue": {
      primary: "hsl(210 100% 50%)",
      light: "hsl(210 100% 50% / 0.2)",
      dark: "hsl(210 100% 35%)",
    },
    "card-green": {
      primary: "hsl(120 100% 45%)",
      light: "hsl(120 100% 45% / 0.2)",
      dark: "hsl(120 100% 30%)",
    },
    "card-orange": {
      primary: "hsl(39 100% 56%)",
      light: "hsl(39 100% 56% / 0.2)",
      dark: "hsl(39 100% 40%)",
    },
  };

  const colorConfig = accentColorMap[accentColor] || accentColorMap["card-blue"];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />

      {/* Header with Back Button */}
      <div className="bg-card border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {getTranslation(language, "common.backToHome")}
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            {getTranslation(language, titleKey)}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">{getTranslation(language, descriptionKey)}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {!uploadedFile ? (
          // Upload Section
          <div className="max-w-2xl">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                borderColor: dragOverRef.current
                  ? colorConfig.primary
                  : "currentColor",
                backgroundColor: dragOverRef.current
                  ? colorConfig.light
                  : "transparent",
              }}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all border-border hover:border-muted-foreground/50`}
            >
              <div
                style={{ backgroundColor: colorConfig.light }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
              >
                <Upload
                  className="w-8 h-8 sm:w-10 sm:h-10"
                  style={{ color: colorConfig.primary }}
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                {getTranslation(language, "common.dragDrop")}
              </h2>
              <p className="text-muted-foreground mb-6">
                {getTranslation(language, "common.dragDropHint")}
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  backgroundColor: colorConfig.primary,
                }}
                className="text-white font-semibold py-3 px-8 rounded-lg transition-all inline-block hover:opacity-90"
              >
                {getTranslation(language, "common.chooseFile")}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleInputChange}
                className="hidden"
              />
            </div>
          </div>
        ) : !result ? (
          // Analysis in Progress
          <div className="max-w-2xl flex flex-col items-center justify-center py-16">
            {isLoading ? (
              <>
                <Loader2
                  className="w-12 h-12 animate-spin mb-4"
                  style={{ color: colorConfig.primary }}
                />
                <p className="text-lg text-foreground font-semibold mb-2">
                  {getTranslation(language, "common.analyzing")}
                </p>
                <p className="text-muted-foreground">{getTranslation(language, "common.waiting")}</p>
              </>
            ) : (
              <>
                <div
                  style={{ backgroundColor: colorConfig.light }}
                  className="w-20 h-20 rounded-full mb-4 flex items-center justify-center"
                >
                  <Upload
                    className="w-10 h-10"
                    style={{ color: colorConfig.primary }}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {uploadedFile.file.name}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {getTranslation(language, "common.ready")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAnalyze}
                    style={{
                      backgroundColor: colorConfig.primary,
                    }}
                    className="text-white font-semibold py-3 px-8 rounded-lg transition-all hover:opacity-90"
                  >
                    {getTranslation(language, "common.analyzeDocument")}
                  </button>
                  <button
                    onClick={handleRemoveFile}
                    className="bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 px-8 rounded-lg transition-all"
                  >
                    {getTranslation(language, "common.uploadDifferent")}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          // Results Dashboard
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
              {getTranslation(language, "common.analysisResults")}
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Uploaded File */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {getTranslation(language, "common.uploadedDoc")}
                </h3>
                <div className="bg-card border border-border rounded-xl p-4 flex-1 flex items-center justify-center min-h-96">
                  {uploadedFile.file.type === "application/pdf" ? (
                    <div className="text-center">
                      <div className="w-20 h-20 bg-red-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl">📄</span>
                      </div>
                      <p className="text-foreground font-semibold">
                        {uploadedFile.file.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        {getTranslation(language, "common.pdfDocument")}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={uploadedFile.preview}
                      alt="Uploaded document"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  )}
                </div>
                <button
                  onClick={handleRemoveFile}
                  className="mt-4 flex items-center justify-center gap-2 bg-destructive/20 hover:bg-destructive/30 text-destructive font-semibold py-2 px-4 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                  {getTranslation(language, "common.clearUpload")}
                </button>
              </div>

              {/* Right Column - AI Results */}
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {getTranslation(language, "common.aiSummary")}
                </h3>
                <div className="bg-card border border-border rounded-xl p-6 flex-1">
                  <p className="text-foreground leading-relaxed">
                    {result}
                  </p>
                  <button
                    onClick={handleRemoveFile}
                    style={{
                      backgroundColor: colorConfig.primary,
                    }}
                    className="mt-6 w-full py-3 px-4 rounded-lg font-semibold text-white hover:opacity-90 transition-all"
                  >
                    {getTranslation(language, "common.analyzeAnother")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-6 sm:py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground text-sm sm:text-base">
          <p>{getTranslation(language, "footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}
