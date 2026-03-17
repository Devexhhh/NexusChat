"use client";

import { useEffect, useRef, useState } from "react";
import { JoinScreen } from "./components/JoinScreen";
import { ChatArea, Message } from "./components/ChatArea";
import { Sidebar } from "./components/Sidebar";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { CircuitGrid } from "./components/CircuitGrid";

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
    const ws = new WebSocket("wss://responsible-definition-selections-work.trycloudflare.com/ws");
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
    <div className="h-screen overflow-hidden flex flex-col bg-[#03000a] text-[#e0d0ff] selection:bg-cyan-500/20 font-mono relative">

      {/* ── GRID OVERLAY ── */}
      {/* <div className="pointer-events-none fixed inset-0 z-0 grid-bg" /> */}
      <CircuitGrid />

      {/* ── AMBIENT GLOWS ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-1/3 -left-1/4 w-1/2 aspect-square bg-violet-900/15 blur-[160px] rounded-full" />
        <div className="absolute -bottom-1/3 -right-1/4 w-1/2 aspect-square bg-cyan-900/10 blur-[180px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square bg-violet-800/8 blur-[120px] rounded-full" />
      </div>

      {/* ── SCANLINE ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-400/30 to-transparent"
          style={{ animation: "scanline 6s linear infinite", top: "-2px" }} />
      </div>

      {/* ── CORNER BRACKETS ── */}
      <span className="hidden sm:block pointer-events-none fixed top-16 left-4 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 z-40" />
      <span className="hidden sm:block pointer-events-none fixed top-16 right-4 w-8 h-8 border-t-2 border-r-2 border-cyan-400/30 z-40" />
      <span className="hidden sm:block pointer-events-none fixed bottom-17 left-4 w-8 h-8 border-b-2 border-l-2 border-violet-500/30 z-40" />
      <span className="hidden sm:block pointer-events-none fixed bottom-17 right-4 w-8 h-8 border-b-2 border-r-2 border-violet-500/30 z-40" />

      {/* ── NAVBAR ── */}
      <Navbar />

      {/* ── MAIN ── */}
      <main className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center px-4 sm:px-8 py-4 overflow-y-auto">
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
          <div className="w-full max-w-6xl h-full flex flex-col lg:flex-row gap-4 sm:gap-5 relative animate-fade-in">
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

      {/* ── FOOTER ── */}
      <Footer />

    </div>
  );
}