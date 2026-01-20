'use client';
import HeroSection from '@/components/sections/HeroSection';
import StatusBar from '@/components/sections/StatusBar';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import HowToInstall from '@/components/sections/HowToInstall';
import VersionsSection from '@/components/sections/VersionsSection';
import FeedbackSection from '@/components/sections/FeedbackSection';
import Link from 'next/link';
import { useConfig } from '@/lib/ConfigContext';

export default function Home() {
    const config = useConfig();
    return (
        <main className="min-h-screen bg-[#0d0d12]">
            <HeroSection />
            <StatusBar />
            <FeaturesGrid />
            <HowToInstall />
            <VersionsSection />
            <FeedbackSection />

            <section className="py-24 px-4 bg-gradient-to-b from-[#0d0d12] to-[#0a0a0f] relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[150px]" />
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                        <i className="fas fa-question-circle"></i>
                        Precisa de ajuda?
                    </span>

                    <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-6">
                        Dúvidas? <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Resolvidas.</span>
                    </h2>

                    <p className="text-gray-400 max-w-xl mx-auto text-lg mb-10">
                        Nossa FAQ inteligente tem as respostas para as perguntas mais comuns sobre instalação, problemas e muito mais.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/faq"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(160,32,240,0.5)] transition-all"
                        >
                            <i className="fas fa-robot"></i>
                            Acessar FAQ Inteligente
                        </Link>
                        <Link
                            href="/tutoriais"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                        >
                            <i className="fas fa-play-circle"></i>
                            Ver Tutoriais
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-[#0a0a0f] border-t border-white/5">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-purple-900/20 via-purple-600/10 to-purple-900/20 border border-purple-500/20">
                        <div className="text-center md:text-left">
                            <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-white mb-3">
                                Faça parte da maior comunidade de PES do Brasil
                            </h3>
                            <p className="text-gray-400 text-lg">
                                Junte-se a mais de 5 mil jogadores que mantêm o legado vivo.
                            </p>
                        </div>
                        <a
                            href={config.discord.invite}
                            target="_blank"
                            className="flex-shrink-0 inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#5865F2] text-white font-bold text-lg hover:bg-[#4752C4] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] transition-all"
                        >
                            <i className="fab fa-discord text-2xl"></i>
                            Entrar Agora
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}