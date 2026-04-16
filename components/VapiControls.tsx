"use client";

import useVapi from "@/hooks/useVapi";
import { IBook } from "@/types";
import { Mic, MicOff } from "lucide-react";
import Image from "next/image";
import Transcript from "@/components/Transcript";

const VapiControls = ({ book }: { book: IBook }) => {
  const { title, coverURL, author, persona } = book;
  const {
    status,
    isActive,
    messages,
    currentMessage,
    currentUserMessage,
    duration,
    start,
    stop,
    clearError,
  } = useVapi(book);
  return (
    <div className="vapi-main-container gap-4">
      {/* Header card */}
      <div className="vapi-header-card w-full">
        {/* Cover image + mic button */}
        <div className="vapi-cover-wrapper">
          <Image
            src={coverURL}
            alt={title}
            width={120}
            height={180}
            className="vapi-cover-image"
          />
          <div className="vapi-mic-wrapper">
            {(status === "speaking" || status === "thinking") && (
              <span className="vapi-pulse-ring" />
            )}
            <button
              onClick={isActive ? stop : start}
              disabled={status === "connecting"}
              className={`vapi-mic-btn ${isActive ? "vapi-mic-btn-active" : "vapi-mic-btn-inactive"}`}
            >
              {isActive ? (
                <Mic className="w-5 h-5 text-[var(--text-primary)]" />
              ) : (
                <MicOff className="w-5 h-5 text-[var(--text-primary)]" />
              )}
            </button>
          </div>
        </div>

        {/* Book info + status badges */}
        <div className="flex flex-col gap-3">
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#212a3b] leading-tight"
            style={{ fontFamily: "'IBM Plex Serif', serif" }}
          >
            {title}
          </h1>
          <p className="text-[#3d485e] text-base">by {author}</p>

          <div className="flex flex-wrap gap-2 mt-1">
            {/* Status badge */}
            <div className="vapi-status-indicator">
              <span className="vapi-status-dot vapi-status-dot-ready" />
              <span className="vapi-status-text">Ready</span>
            </div>

            {/* Voice badge */}
            <div className="vapi-status-indicator">
              <span className="vapi-status-text">
                Voice:{" "}
                <span className="font-semibold capitalize">{persona}</span>
              </span>
            </div>

            {/* Timer badge */}
            <div className="vapi-status-indicator">
              <span className="vapi-status-text">0:00/15:00</span>
            </div>
          </div>
        </div>
      </div>
      {/* Transcript area */}
      <div className="vapi-transcript-wrapper w-full">
        <Transcript
          messages={messages}
          currentMessage={currentMessage}
          currentUserMessage={currentUserMessage}
        />
      </div>
    </div>
  );
};

export default VapiControls;
