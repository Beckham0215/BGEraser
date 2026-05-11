"use client";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

export function AdSlot({ slot, format = "auto", className = "" }: AdSlotProps) {
  // Placeholder shown until AdSense is approved.
  // To activate: replace the placeholder div below with the <ins> block,
  // add your publisher ID (ca-pub-XXXXXXXX) and uncomment the AdSense
  // script in app/layout.tsx.
  return (
    <div className={`w-full my-4 ${className}`}>
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: "(adsbygoogle = window.adsbygoogle || []).push({});",
        }}
      />
      */}
      <div
        aria-hidden="true"
        className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-xl h-24 flex flex-col items-center justify-center gap-1 text-slate-400 text-xs select-none"
      >
        <span className="font-medium text-sm">Advertisement</span>
        <span>Ad slot: {slot}</span>
      </div>
    </div>
  );
}
