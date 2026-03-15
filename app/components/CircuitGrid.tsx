"use client";

import { useEffect, useRef } from "react";

const CELL = 36;
const CYAN = '0,255,200';
const VIOLET = '139,92,246';

class Ray {
    x!: number; y!: number;
    dx!: number; dy!: number;
    speed!: number;
    trail!: { x: number; y: number }[];
    maxTrail!: number;
    color!: string;
    distToTurn!: number;
    alive!: boolean;

    constructor(private w: number, private h: number) { this.reset(); }

    reset() {
        const cols = Math.ceil(this.w / CELL) + 1;
        const rows = Math.ceil(this.h / CELL) + 1;
        const edge = Math.floor(Math.random() * 4);
        if (edge === 0) { this.x = Math.floor(Math.random() * cols) * CELL; this.y = 0; this.dx = 0; this.dy = 1; }
        else if (edge === 1) { this.x = this.w; this.y = Math.floor(Math.random() * rows) * CELL; this.dx = -1; this.dy = 0; }
        else if (edge === 2) { this.x = Math.floor(Math.random() * cols) * CELL; this.y = this.h; this.dx = 0; this.dy = -1; }
        else { this.x = 0; this.y = Math.floor(Math.random() * rows) * CELL; this.dx = 1; this.dy = 0; }
        this.speed = CELL / (8 + Math.random() * 12);
        this.trail = [];
        this.maxTrail = 10 + Math.floor(Math.random() * 14);
        this.color = Math.random() > 0.4 ? CYAN : VIOLET;
        this.distToTurn = CELL;
        this.alive = true;
    }

    update() {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrail) this.trail.shift();
        this.distToTurn -= this.speed;

        if (this.distToTurn <= 0) {
            this.x = Math.round(this.x / CELL) * CELL;
            this.y = Math.round(this.y / CELL) * CELL;
            this.distToTurn = CELL;
            const turns: [number, number][] = [];
            if (this.dy !== 0) { turns.push([1, 0]); turns.push([-1, 0]); }
            if (this.dx !== 0) { turns.push([0, 1]); turns.push([0, -1]); }
            if (Math.random() > 0.45) turns.push([this.dx, this.dy]);
            const pick = turns[Math.floor(Math.random() * turns.length)];
            this.dx = pick[0]; this.dy = pick[1];
        }

        if (this.x < -CELL || this.x > this.w + CELL || this.y < -CELL || this.y > this.h + CELL)
            this.alive = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if (this.trail.length < 2) return;
        for (let i = 1; i < this.trail.length; i++) {
            const t = i / this.trail.length;
            ctx.beginPath();
            ctx.moveTo(this.trail[i - 1].x, this.trail[i - 1].y);
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
            ctx.strokeStyle = `rgba(${this.color}, ${t * 0.9})`;
            ctx.lineWidth = t * 1.8;
            ctx.stroke();
        }
        const head = this.trail[this.trail.length - 1];
        const grd = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 6);
        grd.addColorStop(0, `rgba(${this.color}, 0.9)`);
        grd.addColorStop(1, `rgba(${this.color}, 0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
    }
}

class Spark {
    life = 1;
    decay: number;
    constructor(public x: number, public y: number, public color: string) {
        this.decay = 0.04 + Math.random() * 0.04;
    }
    update() { this.life -= this.decay; }
    draw(ctx: CanvasRenderingContext2D) {
        if (this.life <= 0) return;
        const r = this.life * 5;
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r);
        grd.addColorStop(0, `rgba(${this.color}, ${this.life})`);
        grd.addColorStop(1, `rgba(${this.color}, 0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
    }
}

export function CircuitGrid() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let rafId: number;
        let frame = 0;
        let rays: Ray[] = [];
        let sparks: Spark[] = [];

        function resize() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        }

        function drawBaseGrid() {
            const cols = Math.ceil(canvas.width / CELL) + 1;
            const rows = Math.ceil(canvas.height / CELL) + 1;
            ctx.strokeStyle = "rgba(0,255,200,0.055)";
            ctx.lineWidth = 0.5;
            for (let c = 0; c <= cols; c++) {
                ctx.beginPath(); ctx.moveTo(c * CELL, 0); ctx.lineTo(c * CELL, canvas.height); ctx.stroke();
            }
            for (let r = 0; r <= rows; r++) {
                ctx.beginPath(); ctx.moveTo(0, r * CELL); ctx.lineTo(canvas.width, r * CELL); ctx.stroke();
            }
            ctx.fillStyle = "rgba(0,255,200,0.12)";
            for (let c = 0; c <= cols; c++)
                for (let r = 0; r <= rows; r++) {
                    ctx.beginPath(); ctx.arc(c * CELL, r * CELL, 1, 0, Math.PI * 2); ctx.fill();
                }
        }

        function animate() {
            rafId = requestAnimationFrame(animate);
            frame++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBaseGrid();

            if (frame % 55 === 0 && rays.length < 10)
                rays.push(new Ray(canvas.width, canvas.height));

            rays = rays.filter(r => r.alive);
            rays.forEach(r => {
                if (r.distToTurn < r.speed + 1) {
                    const sx = Math.round(r.x / CELL) * CELL;
                    const sy = Math.round(r.y / CELL) * CELL;
                    if (Math.random() > 0.5) sparks.push(new Spark(sx, sy, r.color));
                }
                r.update(); r.draw(ctx);
            });

            sparks = sparks.filter(s => s.life > 0);
            sparks.forEach(s => { s.update(); s.draw(ctx); });
        }

        resize();
        rays = Array.from({ length: 5 }, () => new Ray(canvas.width, canvas.height));
        animate();

        const ro = new ResizeObserver(() => { resize(); });
        ro.observe(canvas);

        return () => { cancelAnimationFrame(rafId); ro.disconnect(); };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-0 w-full h-full"
        />
    );
}