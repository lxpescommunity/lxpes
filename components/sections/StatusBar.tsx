'use client';
import { useEffect, useState } from 'react';

interface Stats {
  members: string;
  online: string;
  loading: boolean;
}

export default function StatusBar() {
  const [stats, setStats] = useState<Stats>({ members: '---', online: '---', loading: true });

  useEffect(() => {
    async function fetchDiscordStats() {
      try {
        // Usando o código de convite do Discord LXPES
        const inviteCode = process.env.NEXT_PUBLIC_DISCORD_INVITE || 'EeWXH5QRnB';
        const res = await fetch(`https://discord.com/api/v9/invites/${inviteCode}?with_counts=true`);

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setStats({
          members: data.approximate_member_count?.toLocaleString('pt-BR') || '5.000+',
          online: data.approximate_presence_count?.toLocaleString('pt-BR') || '500+',
          loading: false
        });
      } catch (e) {
        console.error('Discord API error:', e);
        // Fallback values
        setStats({
          members: '5.000+',
          online: '500+',
          loading: false
        });
      }
    }

    fetchDiscordStats();

    // Refresh a cada 5 minutos
    const interval = setInterval(fetchDiscordStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      label: 'Downloads',
      value: '15K+',
      icon: 'fas fa-download',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20'
    },
    {
      label: 'Versão Atual',
      value: 'v2.0',
      icon: 'fas fa-code-branch',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20'
    },
    {
      label: 'Membros Discord',
      value: stats.members,
      icon: 'fab fa-discord',
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10',
      borderColor: 'border-indigo-500/20',
      loading: stats.loading
    },
    {
      label: 'Online Agora',
      value: stats.online,
      icon: 'fas fa-circle',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      isLive: true,
      loading: stats.loading
    }
  ];

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={`relative p-5 rounded-2xl ${item.bgColor} border ${item.borderColor} backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 group`}
            >
              {/* Live Indicator */}
              {item.isLive && (
                <span className="absolute top-3 right-3 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-[10px] text-green-400 uppercase tracking-wider">Live</span>
                </span>
              )}

              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl ${item.bgColor} border ${item.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <i className={`${item.icon} ${item.color} ${item.isLive ? 'text-sm' : 'text-xl'}`}></i>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] uppercase text-gray-500 tracking-wider mb-1">
                    {item.label}
                  </span>
                  <span className={`font-orbitron font-bold text-2xl ${item.color} ${item.loading ? 'animate-pulse' : ''}`}>
                    {item.value}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional: Last Updated */}
        <p className="text-center text-gray-600 text-xs mt-4">
          <i className="fas fa-sync-alt mr-1"></i>
          Dados atualizados em tempo real via Discord API
        </p>
      </div>
    </section>
  );
}