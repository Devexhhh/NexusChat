// components/Footer.tsx
import { Github, Globe, Code2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full z-50 border-t border-violet-500/15 bg-black/70 backdrop-blur-md relative">

            {/* top corner notches */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-violet-500/60 pointer-events-none" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-violet-500/60 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 h-10 sm:h-14 flex items-center justify-center sm:justify-between gap-4">

                {/* ── LEFT: BUILD TAG — hidden on mobile ── */}
                <div className="hidden sm:flex items-center gap-2">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-violet-500/80 uppercase">
                        build_2047.03.15
                    </span>
                    <span className="text-violet-500/20">|</span>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-cyan-500/80 uppercase">
                        enc_sha256_ok
                    </span>
                </div>

                {/* ── CENTER: DEVEX CREDIT — always visible ── */}
                <div className="flex items-center gap-1.5">
                    <Code2 className="w-3 h-3 text-cyan-400/40 shrink-0" />
                    <p className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-center whitespace-nowrap">
                        <span className="text-cyan-500/30">/ </span>
                        <span className="text-violet-400/50">by </span>
                        <span className="text-cyan-400 font-bold tracking-[0.3em] relative">
                            DEVEX
                            <span className="absolute -bottom-px left-0 right-0 h-px bg-cyan-400/60 animate-pulse" />
                        </span>
                        <span className="text-violet-500/30 hidden sm:inline"> — </span>
                        <span className="text-violet-300/40 italic hidden sm:inline">we dont ship bugs, we ship weapons</span>
                    </p>
                    <Code2 className="w-3 h-3 text-violet-400/40 scale-x-[-1] shrink-0" />
                </div>

                {/* ── RIGHT: LINKS — hidden on mobile ── */}
                <div className="hidden sm:flex items-center gap-3">
                    <a href="#" className="font-mono text-[8px] tracking-widest uppercase text-cyan-500/60
            hover:text-cyan-400/70 transition-colors flex items-center gap-1">
                        <Github className="w-2.5 h-2.5" />
                        <span>src</span>
                    </a>
                    <span className="text-violet-500/20">|</span>
                    <a href="#" className="font-mono text-[8px] tracking-widest uppercase text-violet-500/60
            hover:text-violet-400/70 transition-colors flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" />
                        <span>devex.io</span>
                    </a>
                </div>

            </div>

            {/* bottom accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
        </footer>
    );
}