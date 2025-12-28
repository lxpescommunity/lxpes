import Link from 'next/link';

const steps = [
    {
        number: '01',
        title: 'Baixe o Patch',
        desc: 'Acesse o Discord e baixe todas as partes do patch na seção de downloads.',
        icon: 'fas fa-cloud-download-alt',
        color: 'from-blue-500 to-blue-600'
    },
    {
        number: '02',
        title: 'Extraia os Arquivos',
        desc: 'Use WinRAR ou 7-Zip para extrair a pasta KONAMI em Documentos.',
        icon: 'fas fa-file-archive',
        color: 'from-purple-500 to-purple-600'
    },
    {
        number: '03',
        title: 'Configure o Sider',
        desc: 'Execute o Multi-Switcher ou arraste o sider.exe até o PES2017.exe',
        icon: 'fas fa-cogs',
        color: 'from-pink-500 to-pink-600'
    },
    {
        number: '04',
        title: 'Jogue!',
        desc: 'Inicie o jogo e aproveite os elencos, kits e faces atualizados.',
        icon: 'fas fa-gamepad',
        color: 'from-green-500 to-green-600'
    },
];

export default function HowToInstall() {
    return (
        <section className="py-24 px-4 bg-gradient-to-b from-[#0d0d12] to-[#0a0a0f] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px]" />
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                        <i className="fas fa-magic"></i>
                        Instalação Simples
                    </span>
                    <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4">
                        Como <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Instalar</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">
                        Em apenas 4 passos simples você terá o patch funcionando
                    </p>
                </div>

                {/* Steps Timeline */}
                <div className="relative">
                    {/* Connection Line */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative p-6 rounded-2xl bg-[#12121a] border border-white/5 hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(160,32,240,0.1)]">
                                    {/* Step Number Badge */}
                                    <div className={`absolute -top-4 left-6 w-8 h-8 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                                        {idx + 1}
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 mt-2 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <i className={`${step.icon} text-white text-xl`}></i>
                                    </div>

                                    {/* Content */}
                                    <h3 className="font-orbitron font-bold text-lg text-white mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Arrow connector (desktop) */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-1/2 -right-2 z-10 -translate-y-1/2">
                                        <i className="fas fa-chevron-right text-purple-500/50"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
                    <Link
                        href="/tutoriais"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(160,32,240,0.5)] transition-all"
                    >
                        <i className="fas fa-play-circle"></i>
                        Ver Tutoriais em Vídeo
                    </Link>
                    <Link
                        href="/faq"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:border-purple-500/50 hover:bg-purple-500/10 transition-all"
                    >
                        <i className="fas fa-question-circle"></i>
                        Ver FAQ
                    </Link>
                </div>

                {/* Quick Tips */}
                <div className="mt-16 p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 max-w-3xl mx-auto">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                            <i className="fas fa-lightbulb text-yellow-400"></i>
                        </div>
                        <div>
                            <h4 className="font-bold text-yellow-400 mb-1">Dica Importante</h4>
                            <p className="text-gray-400 text-sm">
                                Desative o antivírus antes de extrair os arquivos. Alguns podem detectar falsos positivos nos arquivos do patch. Não se preocupe, todos os nossos downloads são seguros e verificados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
