"use client";

import { Chat } from "@/types/chat";

type SidebarProps = {
  chats: Chat[];
  selectedChatId: number | null;
  onSelectChat: (chatId: number) => void;
  onNewChat: () => void;
};

export default function Sidebar({
  chats,
  selectedChatId,
  onSelectChat,
  onNewChat,
}: SidebarProps) {
  return (
    <aside className="clay-sidebar flex h-full w-64 flex-col p-4 border-r border-[#EBE3D5]/60 text-[#4A443F]">
      <button
        type="button"
        onClick={onNewChat}
        className="clay-button-purple font-fredoka w-full rounded-2xl py-2.5 font-bold tracking-wide transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
      >
        + New Chat
      </button>

      <div className="mt-6 flex-1 overflow-y-auto space-y-2 pr-1">
        {chats.map((chat) => {
          const isSelected = selectedChatId === chat.id;

          return (
            <button
              key={chat.id}
              type="button"
              onClick={() => onSelectChat(chat.id)}
              className={`w-full rounded-2xl p-3 text-left font-medium transition-all duration-200 ${
                isSelected
                  ? "clay-pill-user border-2 border-[#C084FC]/50 text-[#3D352E] font-semibold scale-[1.01]"
                  : "bg-[#F3EDE3]/80 text-[#6B6054] hover:bg-[#FAF5ED] hover:text-[#3D352E]"
              }`}
            >
              {chat.title?.trim() || "Untitled chat"}
            </button>
          );
        })}
      </div>
    </aside>
  );
}