"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface BeforeAfterSliderProps {
  originalUrl: string;
  resultUrl: string;
}

export function BeforeAfterSlider({ originalUrl, resultUrl }: BeforeAfterSliderProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateFromEvent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromEvent(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updateFromEvent(e.clientX);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  // Touch support
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (e.touches[0]) updateFromEvent(e.touches[0].clientX);
    },
    [updateFromEvent]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => el.removeEventListener("touchmove", onTouchMove);
  }, [onTouchMove]);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs font-medium text-slate-500 px-1">
        <span>Original</span>
        <span>Background removed</span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden shadow-lg cursor-ew-resize select-none"
        style={{ aspectRatio: "auto" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* Result layer (after) — checkerboard shows transparency */}
        <div className="checkerboard w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resultUrl}
            alt="Background removed result"
            className="w-full h-auto block"
            draggable={false}
          />
        </div>

        {/* Original layer (before) — clips from the right */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={originalUrl}
            alt="Original image"
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-md pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-slate-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l-4 3 4 3M16 9l4 3-4 3"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-3 left-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full pointer-events-none">
          Before
        </div>
        <div className="absolute top-3 right-3 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-full pointer-events-none">
          After
        </div>
      </div>

      <p className="text-center text-xs text-slate-400">
        Drag the slider to compare
      </p>
    </div>
  );
}
