'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAVIGATION_LINKS } from '@/lib/constants';
import { useConfig } from '@/lib/ConfigContext';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const config = useConfig();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled
                ? 'py-2 bg-[#0d0d12]/95 backdrop-blur-xl border-b border-white/5 shadow-lg'
                : 'py-4 bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <img
                                src="/img/ICOLXPES.ico"
                                alt="LXPES Logo"
                                className={`transition-all duration-300 group-hover:scale-110 ${isScrolled ? 'h-9' : 'h-11'}`}
                            />
                            <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex flex-col font-orbitron">
                            <span className="text-white font-bold text-xl leading-none">LXPES</span>
                            <span className="text-purple-400 text-[10px] tracking-[0.2em] uppercase">Community</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-1">
                        {Object.entries(NAVIGATION_LINKS).map(([title, url]) => (
                            <Link
                                key={url}
                                href={url}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors ${pathname === url || (url === '/#inicio' && pathname === '/')
                                    ? 'text-white'
                                    : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {title}
                                {(pathname === url || (url === '/#inicio' && pathname === '/')) && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-purple-500 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href={config.discord.invite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 hover:shadow-[0_0_20px_rgba(160,32,240,0.5)] transition-all"
                        >
                            <i className="fab fa-discord"></i>
                            <span>Discord</span>
                        </a>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                        aria-label="Menu"
                    >
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </header>

            <div className={`fixed inset-0 z-[999] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}>
                <div
                    className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                    onClick={() => setIsMenuOpen(false)}
                />

                <nav className="relative z-10 h-full flex flex-col items-center justify-center gap-8">
                    {Object.entries(NAVIGATION_LINKS).map(([title, url], index) => (
                        <Link
                            key={url}
                            href={url}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-3xl font-orbitron font-bold transition-all duration-500 ${pathname === url || (url === '/#inicio' && pathname === '/')
                                ? 'text-purple-400'
                                : 'text-white hover:text-purple-400'
                                }`}
                            style={{
                                transitionDelay: isMenuOpen ? `${index * 100}ms` : '0ms',
                                transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                                opacity: isMenuOpen ? 1 : 0
                            }}
                        >
                            {title}
                        </Link>
                    ))}

                    <a
                        href={config.discord.invite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 flex items-center gap-3 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-500 transition-all"
                        style={{
                            transitionDelay: isMenuOpen ? '400ms' : '0ms',
                            transform: isMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                            opacity: isMenuOpen ? 1 : 0
                        }}
                    >
                        <i className="fab fa-discord text-xl"></i>
                        <span>Entrar no Discord</span>
                    </a>
                </nav>
            </div>
        </>
    );
}