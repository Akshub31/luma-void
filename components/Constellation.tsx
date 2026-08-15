"use client";

import { useEffect, useRef, useState } from "react";

type Node = {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
};

const COLORS = ["#9b7cff", "#4deeea", "#b7ff4a"];

export default function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [selectedNode, setSelectedNode] = useState<number | null>(null);

  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const context = canvas.getContext("2d");

    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;

    const mouse = mouseRef.current;

    const resize = () => {
      const rect = container.getBoundingClientRect();

      width = rect.width;
      height = rect.height;

      const devicePixelRatio = Math.min(
        window.devicePixelRatio || 1,
        2
      );

      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
      );
    };

    const createNodes = () => {
      nodesRef.current = [];

      const count = Math.min(
        45,
        Math.max(18, Math.floor(width / 22))
      );

      for (let i = 0; i < count; i++) {
        nodesRef.current.push({
          id: i,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 2 + 1,
          color: COLORS[i % COLORS.length],
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);

      const nodes = nodesRef.current;

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) {
          node.vx *= -1;
        }

        if (node.y < 0 || node.y > height) {
          node.vy *= -1;
        }

        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          node.x -= dx * 0.0008;
          node.y -= dy * 0.0008;
        }
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];

          const dx = a.x - b.x;
          const dy = a.y - b.y;

          const distance = Math.sqrt(
            dx * dx + dy * dy
          );

          if (distance < 125) {
            const opacity = 1 - distance / 125;

            context.beginPath();
            context.moveTo(a.x, a.y);
            context.lineTo(b.x, b.y);

            context.strokeStyle = `rgba(155, 124, 255, ${
              opacity * 0.18
            })`;

            context.lineWidth = 1;
            context.stroke();
          }
        }
      }

      // Nodes
      for (const node of nodes) {
        const isSelected = node.id === selectedNode;
        const isNearMouse =
          Math.hypot(
            mouse.x - node.x,
            mouse.y - node.y
          ) < 90;

        context.beginPath();

        context.arc(
          node.x,
          node.y,
          isSelected ? node.radius + 3 : node.radius,
          0,
          Math.PI * 2
        );

        context.fillStyle = node.color;
        context.shadowColor = node.color;

        context.shadowBlur =
          isSelected || isNearMouse ? 25 : 12;

        context.fill();

        if (isSelected) {
          context.beginPath();

          context.arc(
            node.x,
            node.y,
            node.radius + 9,
            0,
            Math.PI * 2
          );

          context.strokeStyle = `${node.color}66`;
          context.lineWidth = 1;
          context.stroke();
        }

        context.shadowBlur = 0;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleClick = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      let closestNode: Node | null = null;
      let closestDistance = Infinity;

      for (const node of nodesRef.current) {
        const distance = Math.hypot(
          clickX - node.x,
          clickY - node.y
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestNode = node;
        }
      }

      if (closestNode && closestDistance < 25) {
        setSelectedNode(closestNode.id);
      } else {
        setSelectedNode(null);
      }
    };

    resize();
    createNodes();
    draw();

    window.addEventListener("resize", resize);

    container.addEventListener(
      "mousemove",
      handleMouseMove
    );

    container.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    container.addEventListener(
      "click",
      handleClick
    );

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", resize);

      container.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      container.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      container.removeEventListener(
        "click",
        handleClick
      );
    };
  }, [selectedNode]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 cursor-crosshair overflow-hidden"
      aria-label="Interactive idea constellation"
      role="application"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {selectedNode !== null && (
        <div className="pointer-events-none absolute bottom-5 right-5 rounded-lg border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-md">
          <p className="font-mono text-[9px] tracking-[0.25em] text-white/30">
            SELECTED NODE
          </p>

          <p className="mt-1 font-mono text-xs text-violet-300">
            NODE // {String(selectedNode + 1).padStart(2, "0")}
          </p>
        </div>
      )}
    </div>
  );
}
