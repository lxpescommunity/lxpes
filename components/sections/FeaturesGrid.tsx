const features = [
    {
        icon: 'fas fa-futbol',
        title: 'Elencos Atualizados',
        desc: 'Times com escalações da temporada atual, transferências e novos jogadores.',
        color: 'from-green-500 to-emerald-600'
    },
    {
        icon: 'fas fa-tshirt',
        title: 'Kits & Uniformes',
        desc: 'Uniforme oficial de todos os clubes brasileiros e internacionais.',
        color: 'from-blue-500 to-blue-600'
    },
    {
        icon: 'fas fa-user-circle',
        title: 'Faces Realistas',
        desc: 'Rostos dos jogadores em alta qualidade para uma experiência imersiva.',
        color: 'from-purple-500 to-purple-600'
    },
    {
        icon: 'fas fa-tv',
        title: 'Placares TV',
        desc: 'Scoreboards televisivos oficiais do Brasileirão e outras ligas.',
        color: 'from-red-500 to-red-600'
    },
    {
        icon: 'fas fa-flag-checkered',
        title: 'Mosaicos de Torcida',
        desc: 'Torcidas personalizadas e mosaicos únicos para cada estádio.',
        color: 'from-yellow-500 to-orange-500'
    },
    {
        icon: 'fas fa-headset',
        title: 'Suporte 24/7',
        desc: 'Comunidade ativa no Discord pronta para ajudar a qualquer momento.',
        color: 'from-cyan-500 to-cyan-600'
    },
];

export default function FeaturesGrid() {
    return (
        <section className="py-24 px-4 bg-gradient-to-b from-[#0d0d12] to-[#0a0a0f] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                        <i className="fas fa-star"></i>
                        Recursos do Patch
                    </span>
                    <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4">
                        Tudo que você <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">precisa</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        Um patch completo criado pela comunidade, para a comunidade.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group relative p-6 rounded-2xl bg-[#12121a] border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(160,32,240,0.1)]"
                        >
                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                                <i className={`${feature.icon} text-white text-xl`}></i>
                            </div>

                            {/* Content */}
                            <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.desc}
                            </p>

                            {/* Hover Glow Effect */}
                            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none`} />
                        </div>
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/5">
                    <div className="text-center">
                        <div className="text-3xl font-orbitron font-bold text-white">100%</div>
                        <div className="text-sm text-gray-500 mt-1">Gratuito</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-orbitron font-bold text-white">30+</div>
                        <div className="text-sm text-gray-500 mt-1">Ligas</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-orbitron font-bold text-white">500+</div>
                        <div className="text-sm text-gray-500 mt-1">Times</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-orbitron font-bold text-white">3000+</div>
                        <div className="text-sm text-gray-500 mt-1">Faces</div>
                    </div>
                </div>
            </div>
        </section>
    );
}