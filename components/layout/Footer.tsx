'use client';
import Link from 'next/link';
import { NAVIGATION_LINKS } from '@/lib/constants';
import { useConfig } from '@/lib/ConfigContext';

export default function Footer() {
    const config = useConfig();

    const socialLinks = [
        { icon: 'fab fa-discord', url: config.discord.invite, label: 'Discord', color: 'hover:bg-[#5865F2]' },
        { icon: 'fab fa-facebook', url: config.socials.facebook, label: 'Facebook', color: 'hover:bg-[#1877F2]' },
        { icon: 'fab fa-youtube', url: config.socials.youtube, label: 'YouTube', color: 'hover:bg-[#FF0000]' },
        { icon: 'fab fa-instagram', url: config.socials.instagram, label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]' },
    ].filter(s => s.url);

    const quickLinks = [
        { title: config.download.label || 'Baixar Patch', url: config.download.free, icon: 'fas fa-download' },
        { title: 'Ver Tutoriais', url: '/tutoriais', icon: 'fas fa-play-circle' },
    ];

    return (
        <footer className="relative mt-20 bg-gradient-to-b from-[#0d0d12] to-[#08080c]">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

            <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(160, 32, 240, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 32, 240, 0.03) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="relative border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 rounded-2xl bg-gradient-to-r from-purple-900/20 via-purple-600/10 to-purple-900/20 border border-purple-500/20">
                        <div className="text-center md:text-left">
                            <h3 className="font-orbitron font-bold text-2xl text-white mb-2">
                                Pronto para atualizar seu PES?
                            </h3>
                            <p className="text-gray-400">
                                Junte-se a milhares de jogadores na comunidade LXPES
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {quickLinks.map((link) => (
                                link.url.startsWith('/') ? (
                                    <Link
                                        key={link.title}
                                        href={link.url}
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(160,32,240,0.5)] transition-all"
                                    >
                                        <i className={link.icon}></i>
                                        {link.title}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.title}
                                        href={link.url}
                                        target="_blank"
                                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-600 text-white font-medium hover:bg-purple-500 hover:shadow-[0_0_25px_rgba(160,32,240,0.5)] transition-all"
                                    >
                                        <i className={link.icon}></i>
                                        {link.title}
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 group mb-6">
                            <div className="relative">
                                <img
                                    src="/img/ICOLXPES.ico"
                                    alt="LXPES Logo"
                                    className="w-14 h-14 transition-transform group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex flex-col font-orbitron">
                                <span className="text-white font-bold text-2xl">LXPES</span>
                                <span className="text-purple-400 text-xs tracking-[0.3em] uppercase">Community</span>
                            </div>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Criado por fãs, para fãs. A comunidade que se recusa a deixar a lenda morrer.
                        </p>

                        <div className="flex gap-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-transparent ${social.color} transition-all duration-300`}
                                >
                                    <i className={`${social.icon} text-lg`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Navegação
                        </h4>
                        <nav className="flex flex-col gap-3">
                            {Object.entries(NAVIGATION_LINKS).map(([title, url]) => (
                                <Link
                                    key={url}
                                    href={url}
                                    className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors"
                                >
                                    <i className="fas fa-chevron-right text-[10px] text-purple-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
                                    {title}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h4 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Recursos
                        </h4>
                        <nav className="flex flex-col gap-3">
                            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors">
                                <i className="fas fa-chevron-right text-[10px] text-purple-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
                                Changelogs
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors">
                                <i className="fas fa-chevron-right text-[10px] text-purple-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
                                DpFileList Generator
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors">
                                <i className="fas fa-chevron-right text-[10px] text-purple-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
                                Sider
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2 group transition-colors">
                                <i className="fas fa-chevron-right text-[10px] text-purple-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
                                Bibliotecas (C++, DirectX)
                            </a>
                        </nav>
                    </div>

                    <div>
                        <h4 className="font-orbitron font-bold text-white mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                            Comunidade
                        </h4>
                        <p className="text-gray-500 text-sm mb-4">
                            Entre no nosso Discord para suporte, downloads e novidades.
                        </p>
                        <a
                            href={config.discord.invite}
                            target="_blank"
                            className="flex items-center gap-3 p-4 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/30 hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 transition-all group"
                        >
                            <i className="fab fa-discord text-2xl text-[#5865F2] group-hover:scale-110 transition-transform"></i>
                            <div>
                                <span className="block text-white font-medium">Discord LXPES</span>
                                <span className="block text-xs text-gray-500">+5.000 membros online</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div className="relative border-t border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                        <p className="text-gray-600">
                            &copy; {new Date().getFullYear()} <span className="text-gray-500">LXPES Community</span>. Todos os direitos reservados.
                        </p>
                        <div className="flex items-center gap-6 text-gray-600">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                Servidores Online
                            </span>
                            <span>{config.patch.version}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}