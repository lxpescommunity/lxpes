'use client';
import Link from 'next/link';
import { useConfig } from '@/lib/ConfigContext';

export default function VersionsSection() {
    const config = useConfig();

    const features = [
        'Elencos e ligas 100% atualizados.',
        'Kits, emblemas e uniformes licenciados.',
        'Faces realistas dos jogadores.',
        'Placares televisivos oficiais.',
        'Mosaicos e torcidas personalizadas.',
        'Suporte completo no Discord.'
    ];

    return (
        <section id="versions" className="py-24 px-4 bg-gradient-to-b from-[#0d0d12] to-[#0a0a0f]">
            <div className="text-center mb-16">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                    <i className="fas fa-gift"></i>
                    100% Gratuito
                </span>
                <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4">
                    Patch <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Completo</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Tudo que você precisa para transformar seu PES, sem pagar nada.
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="relative bg-gradient-to-br from-[#1a1a24] to-[#12121a] border border-purple-500/30 rounded-3xl overflow-hidden hover:shadow-[0_0_60px_rgba(160,32,240,0.2)] transition-all duration-500">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-sm font-bold px-6 py-2 rounded-bl-2xl">
                        GRÁTIS
                    </div>

                    <div className="p-10 md:p-12">
                        <div className="flex flex-col md:flex-row md:items-center gap-8 mb-10">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center shadow-xl">
                                <i className="fas fa-futbol text-white text-3xl"></i>
                            </div>
                            <div>
                                <h3 className="font-orbitron font-bold text-3xl text-white mb-2">
                                    {config.patch.name}
                                </h3>
                                <p className="text-gray-400 text-lg">
                                    O patch completo para toda a comunidade. 100% gratuito, sempre.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                            {features.map((feat, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                        <i className="fas fa-check text-green-400 text-sm"></i>
                                    </div>
                                    <span className="text-gray-300">{feat}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <a
                                href={config.download.free}
                                target="_blank"
                                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-orbitron font-bold hover:shadow-[0_0_30px_rgba(160,32,240,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg"
                            >
                                <i className="fas fa-download"></i>
                                {config.download.label}
                            </a>
                            <Link
                                href="/tutoriais"
                                className="flex-1 py-4 rounded-xl border border-white/20 text-white font-orbitron font-bold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all flex items-center justify-center gap-3 text-lg"
                            >
                                <i className="fas fa-play-circle"></i>
                                Ver Tutoriais
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-center gap-6 mt-10">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <i className="fas fa-shield-alt text-green-500"></i>
                        Livre de vírus
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <i className="fas fa-sync-alt text-purple-500"></i>
                        Atualizações frequentes
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <i className="fas fa-headset text-blue-500"></i>
                        Suporte 24/7
                    </div>
                </div>
            </div>
        </section>
    );
}