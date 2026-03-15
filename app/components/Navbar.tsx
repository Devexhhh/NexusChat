// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Zap, Radio, Shield, Terminal } from "lucide-react";

export function Navbar() {
    const [time, setTime] = useState("");
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        const tick = () => setTime(new Date().toLocaleTimeString("en-US", {
            hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
        }));
        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, []);

    // random glitch flicker on the logo
    useEffect(() => {
        const flicker = () => {
            setGlitch(true);
            setTimeout(() => setGlitch(false), 150);
        };
        const interval = setInterval(flicker, 4000 + Math.random() * 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-cyan-500/15 bg-black/70 backdrop-blur-md">
            {/* top accent line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            <div className="max-w-6xl mx-auto px-4 sm:px-8 h-12 flex items-center justify-between gap-4">

                {/* ── LEFT: LOGO ── */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="relative w-7 h-7 border border-cyan-400/50 flex items-center justify-center"
                        style={{ clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)" }}>
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        {/* glow pulse */}
                        <span className="absolute inset-0 animate-ping bg-cyan-400/10" style={{ animationDuration: "2s" }} />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className={`font-mono font-bold text-sm tracking-[0.2em] uppercase transition-all
              ${glitch ? "text-red-400 skew-x-3 translate-x-px" : "text-cyan-400"}`}>
                            Nexus<span className={`${glitch ? "text-cyan-400" : "text-violet-400"}`}>_</span>Chat
                        </span>
                        <span className="font-mono text-[7px] tracking-[0.25em] text-cyan-500/30 uppercase">
                            mesh_protocol_v2
                        </span>
                    </div>
                </div>

                {/* ── CENTER: STATUS PILLS ── */}
                <div className="hidden sm:flex items-center gap-3">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-cyan-400/50 border border-cyan-500/15 px-2.5 py-1">
                        <Radio className="w-2.5 h-2.5" />
                        P2P_LINK
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-violet-400/50 border border-violet-500/15 px-2.5 py-1">
                        <Shield className="w-2.5 h-2.5" />
                        ENC_ACTIVE
                    </span>
                    <span className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest uppercase text-cyan-400/50 border border-cyan-500/15 px-2.5 py-1">
                        <Terminal className="w-2.5 h-2.5" />
                        NODE_ONLINE
                    </span>
                </div>

                {/* ── RIGHT: CLOCK ── */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex flex-col items-end leading-none">
                        <span className="font-mono text-xs text-cyan-400/70 tracking-widest tabular-nums">
                            {time}
                        </span>
                        <span className="font-mono text-[7px] tracking-[0.2em] text-cyan-500/25 uppercase">
                            sys_clock
                        </span>
                    </div>
                    {/* signal bars */}
                    <div className="flex items-end gap-px h-4">
                        {[2, 3, 4, 5, 6].map((h, i) => (
                            <span key={i} className="w-1 bg-cyan-400/50 rounded-none"
                                style={{ height: `${h * 2}px`, opacity: i < 4 ? 1 : 0.2 }} />
                        ))}
                    </div>
                </div>
            </div>

            {/* bottom corner notches */}
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-400/40 pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-400/40 pointer-events-none" />
        </header>
    );
}