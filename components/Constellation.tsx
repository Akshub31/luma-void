"use client";

import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  color: string;
};

const COLORS = [
  "rgba(34, 211, 238, 0.9)",
  "rgba(167, 139, 250, 0.9)",
  "rgba(163, 230, 53, 0.8)",
];

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const nodes: Node[] = [];

    const createNodes = () => {
      nodes.length = 0;

      const count = Math.min(
        55,
        Math.max(24, Math.floor((width * height) / 18000))
      );

      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 1.6 + 1,
          phase: Math.random() * Math.PI * 2,
          color: COLORS[i % COLORS.length],
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      createNodes();
    };

    const handlePointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handlePointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const seconds = time * 0.001;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 160 && distance > 0) {
          const force = (160 - distance) / 160;

          node.x -= (dx / distance) * force * 0.12;
          node.y -= (dy / distance) * force * 0.12;
        }
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = 145;

          if (distance < maxDistance) {
            const opacity =
              (1 - distance / maxDistance) * 0.28;

            const gradient = ctx.createLinearGradient(
              a.x,
              a.y,
              b.x,
              b.y
            );

            gradient.addColorStop(
              0,
              a.color.replace("0.9", `${opacity}`)
            );

            gradient.addColorStop(
              1,
              b.color.replace("0.9", `${opacity}`)
            );

            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (const node of nodes) {
        const pulse =
          Math.sin(seconds * 1.5 + node.phase) * 0.35 + 0.65;

        const radius = node.radius * pulse;

        const glow = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          radius * 7
        );

        glow.addColorStop(0, node.color);
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 7, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
