import { Zap, Rocket, Key, User, Sparkles } from "lucide-react";

interface JoinScreenProps {
  username: string;
  setUsername: (u: string) => void;
  roomId: string;
  setRoomId: (r: string) => void;
  connected: boolean;
  createRoom: () => void;
  joinRoom: () => void;
}

export function JoinScreen({
  username,
  setUsername,
  roomId,
  setRoomId,
  connected,
  createRoom,
  joinRoom,
}: JoinScreenProps) {
  return (
    <div className="glass-panel w-full max-w-md p-8 rounded-none flex flex-col gap-6 relative z-10 animate-fade-in">

      {/* corner bracket decorations */}
      <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-400/90 pointer-events-none" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan-400/90 pointer-events-none" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-violet-500/85 pointer-events-none" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-violet-500/85 pointer-events-none" />

      {/* ── HEADER ── */}
      <div className="text-center space-y-2 pt-2">
        <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-500/60 uppercase mb-3">
          / neural-link v2.0.47
        </p>
        <h1 className="flex items-center justify-center gap-3 text-3xl font-bold tracking-[0.15em] uppercase font-mono text-cyan-400">
          <Zap className="w-6 h-6 text-cyan-400" />
          Nexus<span className="text-violet-400">_</span>Chat
        </h1>
        <p className="text-cyan-500/60 text-[10px] font-mono tracking-widest uppercase mt-1">
          Realtime P2P Messaging Protocol
        </p>
      </div>

      {/* ── FIELDS ── */}
      <div className="space-y-5 pt-2">

        {/* Identity */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-cyan-400/80 ml-0.5">
            <User className="w-3 h-3" /> Identity
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-500/40 font-mono text-[15px] select-none">_</span>
            <input
              className="glass-input w-full pl-7 pr-4 py-2.5 text-[15px] font-mono rounded-none"
              placeholder="<enter callsign>"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !!roomId && joinRoom()}
              autoFocus
            />
          </div>
        </div>

        {/* Create button */}
        <button
          className="modern-button w-full"
          onClick={createRoom}
          disabled={!connected || !username}
        >
          <span className="btn-ring" />
          <span className="btn-inner flex items-center justify-center gap-2 w-full">
            Initialize New Realm
          </span>
          <span className="btn-glitch r flex items-center justify-center gap-2 w-full">
            Initialize New Realm
          </span>
          <span className="btn-glitch c flex items-center justify-center gap-2 w-full">
            Initialize New Realm
          </span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center gap-4 py-1">
          <div className="grow h-px bg-cyan-500/10" />
          <span className="font-mono text-[12px] tracking-widest text-cyan-500/60 uppercase">or_join</span>
          <div className="grow h-px bg-cyan-500/10" />
        </div>

        {/* Room Access Code */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-violet-400/85 ml-0.5">
            <Key className="w-3 h-3" /> Access Code
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-500/40 font-mono text-[15px] select-none">#</span>
            <input
              className="glass-input w-full pl-7 pr-4 py-2.5 text-[15px] font-mono rounded-none"
              placeholder="<room id>"
              value={roomId}
              onChange={e => setRoomId(e.target.value)}
              onKeyDown={e => e.key === "Enter" && joinRoom()}
            />
          </div>
        </div>

        {/* Join button */}
        <button
          className="modern-button w-full"
          onClick={joinRoom}
          disabled={!connected || !username || !roomId}
        >
          <span className="btn-ring" />
          <span className="btn-inner flex items-center justify-center gap-2 w-full">
            Breach Room
          </span>
          <span className="btn-glitch r flex items-center justify-center gap-2 w-full">
            Breach Room
          </span>
          <span className="btn-glitch c flex items-center justify-center gap-2 w-full">
            Breach Room
          </span>
        </button>
      </div>

      {/* ── STATUS ── */}
      <div className="text-center pt-2 pb-1">
        <span className={`font-mono text-[10px] tracking-widest uppercase flex items-center justify-center gap-2
          ${connected ? "text-cyan-400/85" : "text-red-400/85"}`}>
          <span className="relative flex h-2 w-2">
            {connected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50" />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2
              ${connected ? "bg-cyan-400" : "bg-red-500"}`}
            />
          </span>
          {connected ? "node_online // uplink_established" : "connecting_to_node..."}
        </span>
      </div>
    </div>
  );
}