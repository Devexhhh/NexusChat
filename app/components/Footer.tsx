// components/Footer.tsx
import { Zap, Github, Globe, Code2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-violet-500/15 bg-black/70 backdrop-blur-md">

            <div className="max-w-7xl mx-auto px-4 sm:px-8 h-10 flex items-center justify-between gap-4">

                {/* ── LEFT: BUILD TAG ── */}
                <div className="flex items-center gap-2">
                    <span className="font-mono text-[8px] tracking-[0.2em] text-violet-500/30 uppercase hidden sm:block">
                        build_2047.03.15
                    </span>
                    <span className="text-violet-500/20 hidden sm:block">|</span>
                    <span className="font-mono text-[8px] tracking-[0.2em] text-cyan-500/30 uppercase">
                        enc_sha256_ok
                    </span>
                </div>

                {/* ── CENTER: DEVEX CREDIT ── */}
                <div className="flex items-center gap-2">
                    <Code2 className="w-3 h-3 text-cyan-400/40" />
                    <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-center whitespace-nowrap">
                        <span className="text-cyan-500/30">/ </span>
                        <span className="text-violet-400/50">engineered</span>
                        <span className="text-cyan-500/30"> &amp; </span>
                        <span className="text-violet-400/50">deployed</span>
                        <span className="text-cyan-500/30"> by </span>
                        <span className="text-cyan-400 font-bold tracking-[0.3em] relative">
                            DEVEX
                            {/* underline flicker */}
                            <span className="absolute -bottom-px left-0 right-0 h-px bg-cyan-400/60 animate-pulse" />
                        </span>
                        <span className="text-violet-500/30"> — </span>
                        <span className="text-violet-300/40 italic">we dont ship bugs, we ship weapons</span>
                    </p>
                    <Code2 className="w-3 h-3 text-violet-400/40 scale-x-[-1]" />
                </div>

                {/* ── RIGHT: LINKS ── */}
                <div className="flex items-center gap-3">
                    <a href="#" className="font-mono text-[8px] tracking-widest uppercase text-cyan-500/30
            hover:text-cyan-400/70 transition-colors flex items-center gap-1 group">
                        <Github className="w-2.5 h-2.5" />
                        <span className="hidden sm:block">src</span>
                    </a>
                    <span className="text-violet-500/20">|</span>
                    <a href="#" className="font-mono text-[8px] tracking-widest uppercase text-violet-500/30
            hover:text-violet-400/70 transition-colors flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" />
                        <span className="hidden sm:block">devex.io</span>
                    </a>
                </div>
            </div>

            {/* top corner notches */}
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-violet-500/35 pointer-events-none" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-violet-500/35 pointer-events-none" />

            {/* bottom accent line */}
            <div className="h-px w-full bg-linear-to-r from-transparent via-violet-500/30 to-transparent" />
        </footer>
    );
}