"use client";

import { useCallback, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { AdSlot } from "./AdSlot";
import { useRateLimit } from "@/hooks/useRateLimit";

type ToolState = "idle" | "processing" | "done" | "limited" | "error";

interface ProcessingProgress {
  label: string;
  pct: number;
}

export function BGEraserTool() {
  const [toolState, setToolState] = useState<ToolState>("idle");
  const [originalUrl, setOriginalUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [progress, setProgress] = useState<ProcessingProgress>({ label: "", pct: 0 });
  const { canProcess, increment, remaining, dailyLimit } = useRateLimit();

  const handleFileSelected = useCallback(
    async (file: File) => {
      if (!canProcess()) {
        setToolState("limited");
        return;
      }

      // Revoke previous URLs to free memory
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resultUrl) URL.revokeObjectURL(resultUrl);

      const newOriginalUrl = URL.createObjectURL(file);
      setOriginalUrl(newOriginalUrl);
      setResultUrl("");
      setToolState("processing");
      setProgress({ label: "Loading AI model…", pct: 0 });

      try {
        // Dynamic import so the heavy WASM bundle only loads when needed
        const { removeBackground } = await import("@imgly/background-removal");

        const blob = await removeBackground(file, {
          progress: (key: string, current: number, total: number) => {
            const pct = total > 0 ? Math.round((current / total) * 100) : 0;
            const isFetch = key.startsWith("fetch");
            setProgress({
              label: isFetch ? `Downloading AI model… ${pct}%` : `Removing background… ${pct}%`,
              pct,
            });
          },
          output: {
            format: "image/png",
            quality: 1,
          },
        });

        const newResultUrl = URL.createObjectURL(blob);
        setResultUrl(newResultUrl);
        increment();
        setToolState("done");
      } catch (err) {
        console.error("Background removal failed:", err);
        setToolState("error");
      }
    },
    [canProcess, increment, originalUrl, resultUrl]
  );

  const handleReset = () => {
    // Memory cleanup
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setOriginalUrl("");
    setResultUrl("");
    setProgress({ label: "", pct: 0 });
    setToolState(canProcess() ? "idle" : "limited");
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = "bgeraser-result.png";
    a.click();
  };

  // ── States ──────────────────────────────────────────────────────────────

  if (toolState === "idle") {
    return (
      <div className="space-y-5">
        <ImageUploader onFileSelected={handleFileSelected} />

        <p className="text-center text-sm text-slate-500">
          <span className="font-medium text-slate-700">{remaining()}</span> of{" "}
          <span className="font-medium">{dailyLimit}</span> free removals remaining today
        </p>

        <AdSlot slot="2345678901" format="horizontal" />
      </div>
    );
  }

  if (toolState === "limited") {
    return (
      <div className="flex flex-col items-center text-center py-16 space-y-5">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-slate-900">Daily limit reached</h3>
        <p className="text-slate-600 max-w-sm leading-relaxed">
          You&apos;ve used your {dailyLimit} free removals for today.
          Come back tomorrow, or upgrade for unlimited access.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            disabled
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold opacity-75 cursor-not-allowed"
          >
            Upgrade — Coming Soon
          </button>
          <button
            onClick={() => setToolState("idle")}
            className="border border-slate-300 text-slate-700 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 transition"
          >
            Back
          </button>
        </div>
        <p className="text-xs text-slate-400">Your limit resets at midnight local time.</p>
      </div>
    );
  }

  if (toolState === "processing") {
    return (
      <div className="flex flex-col items-center text-center py-16 space-y-8">
        {/* Spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
        </div>

        <div className="space-y-3 w-full max-w-xs">
          <p className="text-base font-medium text-slate-800">{progress.label}</p>
          <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress.pct}%` }}
            />
          </div>
        </div>

        <p className="text-xs text-slate-400 max-w-xs">
          AI runs entirely in your browser —{" "}
          <span className="font-medium text-slate-500">your image is never uploaded to any server.</span>
        </p>
      </div>
    );
  }

  if (toolState === "error") {
    return (
      <div className="flex flex-col items-center text-center py-16 space-y-5">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900">Something went wrong</h3>
        <p className="text-slate-600 max-w-sm">
          The background removal failed. Please try again with a different image.
        </p>
        <button
          onClick={handleReset}
          className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  // toolState === "done"
  return (
    <div className="space-y-6">
      <BeforeAfterSlider originalUrl={originalUrl} resultUrl={resultUrl} />

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 active:scale-95 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download PNG
        </button>
        <button
          onClick={handleReset}
          className="border border-slate-300 text-slate-700 px-8 py-3 rounded-full font-semibold hover:bg-slate-100 active:scale-95 transition-all"
        >
          Remove Another
        </button>
      </div>

      <p className="text-center text-sm text-slate-500">
        <span className="font-medium text-slate-700">{remaining()}</span> free removal
        {remaining() !== 1 ? "s" : ""} remaining today
        {remaining() === 0 && (
          <span className="ml-1 text-amber-600 font-medium">— limit reached</span>
        )}
      </p>

      <AdSlot slot="3456789012" format="rectangle" />
    </div>
  );
}
