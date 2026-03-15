interface SidebarProps {
  users: string[];
  username: string;
}

export function Sidebar({ users, username }: SidebarProps) {
  return (
    <div className="w-72 h-full min-h-0 glass-panel rounded-none flex flex-col overflow-hidden hidden lg:flex relative">

      {/* corner brackets */}
      <span className="absolute top-0 left-0 w-5 h-5 border-t border-l border-cyan-400/90 pointer-events-none z-10" />
      <span className="absolute top-0 right-0 w-5 h-5 border-t border-r border-cyan-400/90 pointer-events-none z-10" />
      <span className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-violet-500/90 pointer-events-none z-10" />
      <span className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-violet-500/90 pointer-events-none z-10" />

      {/* ── HEADER ── */}
      <div className="px-5 py-4 border-b border-cyan-500/15 bg-black/60 shrink-0 relative">
        <span className="absolute top-0 left-0 w-10 h-px bg-linear-to-r from-cyan-400/85 to-transparent" />

        <h3 className="font-mono text-[13px] tracking-widest uppercase text-cyan-400/85 flex items-center justify-between">
          <span>/ Active Nodes</span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-cyan-400/85">{users.length.toString().padStart(2, "0")}</span>
          </span>
        </h3>
      </div>

      {/* ── USER LIST ── */}
      <div className="p-3 flex-1 min-h-0 overflow-y-auto scrollbar-cyber space-y-2">
        {users.map((u, i) => {
          const isMe = u === username;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-none border transition-all cursor-default relative group
                ${isMe
                  ? "bg-cyan-950/30 border-cyan-500/30"
                  : "bg-black/20 border-violet-500/10 hover:bg-violet-950/25 hover:border-violet-500/25"
                }`}
            >
              {/* left accent bar */}
              <span className={`absolute left-0 top-0 bottom-0 w-px
                ${isMe ? "bg-cyan-400" : "bg-violet-500/40 group-hover:bg-violet-400/60"} transition-colors`}
              />

              {/* avatar hex */}
              <div className={`w-8 h-8 flex items-center justify-center text-xs font-bold font-mono shrink-0
                border ${isMe
                  ? "bg-cyan-950/60 border-cyan-400/40 text-cyan-300"
                  : "bg-violet-950/50 border-violet-500/30 text-violet-300"
                }`}
              // style={{ clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}
              >
                {u.charAt(0).toUpperCase()}
              </div>

              <div className="flex flex-col min-w-0">
                <span className={`text-[15px] uppercase font-mono font-bold tracking-wide truncate
                  ${isMe ? "text-cyan-300" : "text-violet-200/80"}`}>
                  {isMe ? <span className="text-cyan-500/90 mr-1">&gt;</span> : <span className="text-violet-500/40 mr-1">#</span>}
                  {u}
                  {isMe && <span className="text-cyan-500/90 ml-1.5 text-[10px] tracking-widest">[YOU]</span>}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-cyan-500/85 uppercase mt-0.5">
                  {isMe ? "_ local node" : "_ remote node"}
                </span>
              </div>

              {/* online pip */}
              <span className="ml-auto shrink-0 relative flex h-1.5 w-1.5">
                {isMe && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-40" />}
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5
                  ${isMe ? "bg-cyan-400" : "bg-violet-400/50"}`}
                />
              </span>
            </div>
          );
        })}
      </div>

      {/* ── FOOTER ── */}
      <div className="px-5 py-3 border-t border-cyan-500/20 bg-black/40 shrink-0 relative">
        <span className="absolute bottom-0 right-0 w-10 h-px bg-linear-to-l from-violet-500/90 to-transparent" />
        <p className="font-mono text-sm tracking-tighter text-cyan-500/85 uppercase text-center">
          mesh_protocol // enc_active
        </p>
      </div>
    </div>
  );
}