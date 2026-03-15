"use client";

import { useEffect, useRef, useState } from "react";
import { JoinScreen } from "./components/JoinScreen";
import { ChatArea, Message } from "./components/ChatArea";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function Home() {

  const wsRef = useRef<WebSocket | null>(null);

  const [connected, setConnected] = useState(false);
  const [joined, setJoined] = useState(false);

  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const [messages, setMessages] = useState<{ type: string, username?: string, message: string, time?: string }[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (wsRef.current) return;
    const ws = new WebSocket("ws://localhost:3000/ws");
    wsRef.current = ws;

    ws.onopen = () => { setConnected(true); };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "room_created") { setRoomId(data.roomId); setJoined(true); }
      if (data.type === "joined") { setJoined(true); }
      if (data.type === "message") {
        setMessages(prev => [...prev, {
          type: "chat", username: data.username, message: data.message,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }]);
      }
      if (data.type === "system") { setMessages(prev => [...prev, { type: "system", message: data.message }]); }
      if (data.type === "presence") { setUsers(data.users); }
      if (data.type === "error") { alert("⚠️ " + data.message); }
    };

    ws.onclose = () => { setConnected(false); setJoined(false); wsRef.current = null; };
    return () => { ws.close(); };
  }, []);

  function send(data: any) {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    wsRef.current.send(JSON.stringify(data));
  }

  function createRoom() { if (username.trim()) send({ type: "create", username: username.trim() }); }
  function joinRoom() { if (username.trim() && roomId.trim()) send({ type: "join", roomId: roomId.trim(), username: username.trim() }); }
  function sendMessage() { if (!connected || !roomId || !input.trim()) return; send({ type: "message", message: input }); setInput(""); }

  return (
    /* ── FULL PAGE SHELL — background lives here, covers everything ── */
    <div className="min-h-screen bg-[#03000a] text-[#e0d0ff] selection:bg-cyan-500/20 font-mono relative overflow-x-hidden">

      {/* ── GRID OVERLAY ── */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(0,255,200,0.025) 40px),
            repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,255,200,0.025) 40px)
          `
        }}
      />

      {/* ── AMBIENT GLOWS ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute -top-1/3 -left-1/4 w-1/2 aspect-square bg-violet-900/15 blur-[160px] rounded-full" />
        <div className="absolute -bottom-1/3 -right-1/4 w-1/2 aspect-square bg-cyan-900/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square bg-violet-800/8 blur-[120px] rounded-full" />
      </div>

      {/* ── SCANLINE ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div
          className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"
          style={{ animation: "scanline 6s linear infinite", top: "-2px" }}
        />
      </div>

      {/* ── CORNER BRACKETS ── */}
      <span className="pointer-events-none fixed top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 z-50" />
      <span className="pointer-events-none fixed top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/30 z-50" />
      <span className="pointer-events-none fixed bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-violet-500/25 z-50" />
      <span className="pointer-events-none fixed bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-violet-500/25 z-50" />

      {/* ── HUD WATERMARK ── */}
      <p className="pointer-events-none fixed top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.3em] text-cyan-400/20 uppercase z-50 hidden sm:block">
        nexus_chat // build_2047.03
      </p>

      {/* ── FIXED BARS ── */}
      <Navbar />
      <Footer />

      {/* ── SCROLLABLE CONTENT — padded to clear fixed bars ── */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-12 pb-10 px-4 sm:px-8">
        {!joined ? (
          <JoinScreen
            username={username}
            setUsername={setUsername}
            roomId={roomId}
            setRoomId={setRoomId}
            connected={connected}
            createRoom={createRoom}
            joinRoom={joinRoom}
          />
        ) : (
          <div className="w-full max-w-6xl h-[calc(100vh-5.5rem)] max-h-220 flex flex-col lg:flex-row gap-4 sm:gap-5 relative animate-fade-in">
            <ChatArea
              roomId={roomId}
              username={username}
              messages={messages as Message[]}
              input={input}
              setInput={setInput}
              connected={connected}
              sendMessage={sendMessage}
            />
            <Sidebar users={users} username={username} />
          </div>
        )}
      </main>

    </div>
  );
}