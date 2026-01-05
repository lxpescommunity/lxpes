'use client';
import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const mouse = { x: -1000, y: -1000, radius: 150 };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.x; mouse.y = e.y; };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number; y: number; directionX: number; directionY: number; size: number; color: string;
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.directionX = (Math.random() * 0.3) - 0.15;
        this.directionY = (Math.random() * 0.3) - 0.15;
        this.size = (Math.random() * 2) + 0.5;
        this.color = Math.random() > 0.5 ? 'rgba(160, 32, 240, 0.6)' : 'rgba(120, 80, 200, 0.4)';
      }
      update() {
        if (this.x > canvas!.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas!.height || this.y < 0) this.directionY = -this.directionY;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numberOfParticles = Math.min((canvas.height * canvas.width) / 8000, 200);
      for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
    };
    init();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.5;
            ctx.strokeStyle = `rgba(160, 32, 240, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d0d12]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[180px]" />

      <div
        className="absolute inset-0 opacity-20 z-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(160, 32, 240, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 32, 240, 0.08) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent h-[200%] animate-scan"
          style={{ animation: 'scan 8s linear infinite' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-purple-600/10 border border-purple-500/30 backdrop-blur-sm animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-sm text-purple-300 font-medium">Patch 2026 Disponível</span>
        </div>

        <h1 className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500">
            O Legado do PES
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 drop-shadow-[0_0_40px_rgba(160,32,240,0.6)]">
            Mais Vivo do que Nunca
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Criado por fãs, para fãs. A comunidade que se recusa a deixar a lenda morrer.
          <span className="block mt-2 text-purple-400/80">+5.000 membros • Atualizações semanais • Suporte 24/7</span>
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <a
            href="https://discord.gg/lxnan"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-purple-600 text-white font-orbitron font-bold text-lg hover:bg-purple-500 transition-all duration-300 hover:shadow-[0_0_50px_rgba(160,32,240,0.6)] hover:-translate-y-1"
          >
            <i className="fab fa-discord text-2xl group-hover:scale-110 transition-transform"></i>
            <span>Entrar no Discord</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/0 via-white/20 to-purple-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          <a
            href="#downloads"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/20 text-white font-orbitron font-bold text-lg hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 hover:-translate-y-1"
          >
            <i className="fas fa-download"></i>
            <span>Ver Downloads</span>
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-16 pt-8 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-orbitron font-bold text-white">15K+</div>
            <div className="text-sm text-gray-500 mt-1">Downloads</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-orbitron font-bold text-white">5K+</div>
            <div className="text-sm text-gray-500 mt-1">Membros</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-orbitron font-bold text-white">100+</div>
            <div className="text-sm text-gray-500 mt-1">Atualizações</div>
          </div>
          <div className="w-px h-12 bg-white/10 hidden md:block" />
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-orbitron font-bold text-purple-400">★ 4.9</div>
            <div className="text-sm text-gray-500 mt-1">Avaliação</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <i className="fas fa-chevron-down text-purple-500"></i>
      </div>

      <style jsx>{`
                @keyframes scan {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0%); }
                }
            `}</style>
    </section>
  );
}