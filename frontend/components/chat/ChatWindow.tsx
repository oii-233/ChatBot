"use client";

import { sendMessage } from "@/services/chat.service";
import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Message } from "@/types/message";

type ChatWindowProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  selectedChatId: number | null;
};

export default function ChatWindow({
  messages,
  setMessages,
  selectedChatId,
}: ChatWindowProps) {
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function handleSend(message: string) {
    if (!selectedChatId) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const data = await sendMessage(selectedChatId, message);

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.message,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, something went wrong.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="flex flex-1 flex-col h-full bg-[#FAF5ED]/40 overflow-hidden">
      <header className="px-6 py-4 border-b border-[#EBE3D5]/60 bg-gradient-to-r from-[#FAF5ED] via-[#FFFDF9] to-[#F5EFE6]">
        <h1 className="font-fredoka text-xl font-bold tracking-wide text-[#8B7B6B]/90 blur-[0.3px]">
          Chat Assistant
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        <div ref={bottomRef}></div>
      </div>

      {isLoading && (
        <p className="px-6 py-2 text-sm italic font-medium text-[#9E9182]">
          AI is typing...
        </p>
      )}

      <ChatInput
        onSend={handleSend}
        isLoading={isLoading}
      />
    </section>
  );
}