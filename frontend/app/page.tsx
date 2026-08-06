"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/chat/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import { createChat, getChatMessages, getChats } from "@/services/chat.service";
import { Chat } from "@/types/chat";
import { Message } from "@/types/message";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const loadChats = async () => {
      try {
        const data = await getChats();

        if (data.length > 0) {
          setChats(data);
          setSelectedChatId(data[0].id);
          return;
        }

        const chat = await createChat();

        setChats([chat]);
        setSelectedChatId(chat.id);
      } catch (error) {
        console.error(error);
      }
    };

    loadChats();
  }, []);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedChatId === null) {
        setMessages([]);
        return;
      }

      try {
        const data = await getChatMessages(selectedChatId);

        setMessages(
          data.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };

    loadMessages();
  }, [selectedChatId]);

  const handleNewChat = async () => {
    try {
      const chat = await createChat();

      setChats((currentChats) => [chat, ...currentChats]);
      setSelectedChatId(chat.id);
      setMessages([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-[#F5EFE6] p-3 sm:p-6 md:p-8">
      {/* Out-of-focus soft 3D abstract shapes and pebbles in the background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft pastel pebble 1 - Top Left Mint */}
        <div className="animate-float-slow absolute -left-12 -top-12 h-64 w-64 rounded-[40%] bg-linear-to-br from-[#D1FAE5] via-[#A7F3D0] to-[#6EE7B7] opacity-60 blur-2xl"></div>

        {/* Soft pastel pebble 2 - Top Right Peach */}
        <div className="animate-float-reverse absolute -right-16 top-10 h-80 w-80 rounded-[50%] bg-linear-to-bl from-[#FFEDD5] via-[#FED7AA] to-[#FDBA74] opacity-70 blur-2xl"></div>

        {/* Soft pastel pebble 3 - Bottom Left Lavender */}
        <div className="animate-float-reverse absolute -bottom-16 left-1/4 h-72 w-72 rounded-[45%] bg-linear-to-tr from-[#EDE9FE] via-[#DDD6FE] to-[#C084FC] opacity-65 blur-2xl"></div>

        {/* Soft pastel pebble 4 - Bottom Right Sky Blue */}
        <div className="animate-float-slow absolute -right-10 -bottom-10 h-72 w-72 rounded-[40%] bg-linear-to-tl from-[#E0F2FE] via-[#BAE6FD] to-[#7DD3FC] opacity-70 blur-2xl"></div>

        {/* Subtle tactile woven background texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.035] mix-blend-overlay" 
          style={{ 
            backgroundImage: `radial-gradient(#4a443f 1px, transparent 1px)`, 
            backgroundSize: '16px 16px' 
          }}
        ></div>
      </div>

      {/* Main Large Marshmallow-Soft Card Container */}
      <div className="clay-main-card relative z-10 flex h-full max-h-230 w-full max-w-325 overflow-hidden rounded-[2.5rem] md:rounded-[3rem]">
        <Sidebar
          chats={chats}
          selectedChatId={selectedChatId}
          onSelectChat={setSelectedChatId}
          onNewChat={handleNewChat}
        />

        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          selectedChatId={selectedChatId}
        />
      </div>
    </main>
  );
}