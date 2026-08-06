"use client";

import { useState } from "react";

interface Props {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, isLoading }: Props) {
  const [message, setMessage] = useState("");

  function handleSend() {
    if (!message.trim()) return;

    onSend(message);

    setMessage("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSend();
    }
  }

  return (
    <div className="flex flex-col gap-3 p-4 border-t border-[#EBE3D5]/60 bg-gradient-to-b from-transparent to-[#F7F1E6]/30">
      {/* Kid-Safe Soft Pill Action Buttons Lined at the Bottom/Above Input */}
      <div className="flex flex-wrap items-center gap-2 px-1">
        <button
          type="button"
          onClick={() => onSend("Learn More")}
          className="clay-button-purple font-fredoka flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>📘</span>
          <span>Learn More</span>
        </button>

        <button
          type="button"
          onClick={() => onSend("FAQ")}
          className="clay-button-mint font-fredoka flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>❓</span>
          <span>FAQ</span>
        </button>

        <button
          type="button"
          onClick={() => onSend("Give Feedback")}
          className="clay-button-pink font-fredoka flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>💬</span>
          <span>Give Feedback</span>
        </button>
      </div>

      {/* Input Row with Exact Original Wording */}
      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="clay-input-box flex-1 rounded-full px-5 py-2.5 text-sm font-medium text-[#3D352E] placeholder-[#9E9182] outline-none transition-all focus:border-[#C084FC]/60"
          placeholder="Type a message..."
        />

        <button
          disabled={isLoading || !message.trim()}
          onClick={handleSend}
          className="clay-button-blue font-fredoka rounded-full px-6 py-2.5 font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}