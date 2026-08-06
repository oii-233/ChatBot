type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`mb-4 max-w-lg p-5 transition-all duration-300 ${
        isUser
          ? "ml-auto clay-pill-user rounded-[2.2rem] rounded-br-sm text-[#3D352E]"
          : "clay-pill-bot rounded-[2.2rem] rounded-bl-sm text-[#1E293B]"
      }`}
    >
      <p className="leading-relaxed font-medium whitespace-pre-wrap break-words">
        {content}
      </p>
    </div>
  );
}