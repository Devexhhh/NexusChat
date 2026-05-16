"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, User, MessageSquareDashed, Zap, Copy, Check } from "lucide-react";

export interface Message {
  type: string;
  username?: string;
  message: string;
  time?: string;
}

interface ChatAreaProps {
  roomId: string;
  username: string;
  messages: Message[];
  input: string;
  setInput: (i: string) => void;
  connected: boolean;
  sendMessage: () => void;
}

export function ChatArea({
  roomId,
  username,
  messages,
  input,
  setInput,
  connected,
  sendMessage
}: ChatAreaProps) {
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages]);

  function copyRoomId() {
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex-1 mt-13 min-h-0 glass-panel rounded-sm flex flex-col overflow-hidden">

      {/* ── HEADER ── */}
      <div className="px-6 py-4 border-b border-cyan-500/20 bg-black/60 flex items-center justify-between shrink-0 relative">
        <span className="absolute top-0 left-0 w-8 h-px bg-linear-to-r from-cyan-400 to-transparent" />
        <span className="absolute bottom-0 right-0 w-8 h-px bg-linear-to-l from-violet-500/60 to-transparent" />

        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-widest uppercase text-cyan-400 font-mono">
              <span className="text-violet-500/85 mr-1">/</span> {roomId}
            </h2>
            <button
              onClick={copyRoomId}
              className="group flex items-center justify-center w-6 h-6 border border-cyan-500/20
                hover:border-cyan-400/50 hover:bg-cyan-950/40 transition-all duration-200 shrink-0"
              title="Copy Room ID"
            >
              {copied
                ? <Check className="w-3 h-3 text-cyan-400" />
                : <Copy className="w-3 h-3 text-cyan-500/40 group-hover:text-cyan-400 transition-colors" />
              }
            </button>
          </div>
          <p className="flex items-center gap-1.5 text-[11px] text-cyan-500/60 mt-1 font-mono tracking-widest uppercase">
            <Lock className="w-3 h-3" /> Encrypted P2P Link
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase font-mono
          text-violet-300 bg-violet-950/40 px-4 py-2
          border border-violet-500/30">
          <User className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-400/80">&gt;</span>
          <span className="max-w-30 truncate">{username}</span>
        </div>
      </div>

      {/* ── MESSAGES ── */}
      <div
        ref={messagesContainerRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-cyber"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-cyan-500/30 space-y-3">
            <MessageSquareDashed className="w-14 h-14" />
            <p className="font-extralight text-xs tracking-widest uppercase">_ awaiting transmission</p>
          </div>
        )}

        {messages.map((msg, i) => {
          if (msg.type === "system") {
            return (
              <div key={i} className="flex justify-center my-3 animate-fade-in">
                <span className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase
                  text-cyan-400/70 bg-black/20 px-4 py-1.5
                  border border-cyan-500/20">
                  <Zap className="w-3 h-3 text-cyan-400/50 shrink-0" />
                  <span className="break-words">{msg.message}</span>
                </span>
              </div>
            );
          }

          const isMe = msg.username === username;
          return (
            <div
              key={i}
              className={`flex flex-col min-w-0 ${isMe ? "items-end" : "items-start"} animate-fade-in`}
            >
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase
                  ${isMe ? "text-cyan-400" : "text-violet-400"}`}>
                  {isMe ? ">" : "<"} {msg.username}
                </span>
                <span className="text-[9px] text-cyan-500/40 font-mono">{msg.time}</span>
              </div>

              <div className={`px-4 py-2.5 max-w-[78%] min-w-0 text-sm font-mono leading-relaxed
                border relative break-words overflow-hidden
                ${isMe
                  ? "bg-cyan-950/30 text-cyan-100 border-cyan-500/30 rounded-sm rounded-tr-none"
                  : "bg-violet-950/25 text-violet-100 border-violet-500/25 rounded-sm rounded-tl-none"
                }`}
              >
                <span className={`absolute top-0 w-2 h-px
                  ${isMe ? "right-0 bg-cyan-400" : "left-0 bg-violet-400"}`}
                />
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── INPUT BAR ── */}
      <div className="p-4 bg-black/60 border-t border-cyan-500/15 relative shrink-0">
        <span className="absolute top-0 left-0 w-12 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />

        <form
          onSubmit={e => { e.preventDefault(); sendMessage(); }}
          className="flex gap-3 items-center"
        >
          <div className="relative flex-1 min-w-0">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/40 font-mono text-xs select-none">_</span>
            <input
              className="glass-input w-full pl-7 pr-4 py-2.5 text-sm font-mono rounded-none"
              placeholder="<transmit message>"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={!connected}
            />
          </div>

          <button
            type="submit"
            className="modern-button shrink-0"
            disabled={!connected || !input.trim()}
          >
            <span className="btn-ring" />
            <span className="btn-inner flex items-center gap-2">Send</span>
            <span className="btn-glitch r flex items-center gap-2">Send</span>
            <span className="btn-glitch c flex items-center gap-2">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}