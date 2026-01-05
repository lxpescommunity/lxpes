'use client';
import Link from 'next/link';
import PageHeader from '@/components/ui/PageHeader';
import { useConfig } from '@/lib/ConfigContext';

export default function EquipePage() {
    const config = useConfig();
    const formLink = 'https://forms.gle/reRtM8o2tFdZVEw37';

    const benefits = [
        {
            icon: 'fas fa-crown',
            title: 'Destaque na Comunidade',
            description: 'Receba o cargo exclusivo @Equipe LXPES e seja reconhecido por todos.',
            color: 'from-yellow-500 to-amber-600'
        },
        {
            icon: 'fas fa-gamepad',
            title: 'Acesso Antecipado',
            description: 'Jogue e teste as atualizações, faces e uniformes antes de todo mundo.',
            color: 'from-green-500 to-emerald-600'
        },
        {
            icon: 'fas fa-bullhorn',
            title: 'Voz Ativa',
            description: 'Ajude a definir os rumos do projeto e dê sugestões diretas na administração.',
            color: 'from-blue-500 to-cyan-600'
        },
        {
            icon: 'fas fa-check-circle',
            title: 'Não Precisa Experiência',
            description: 'Se tiver dedicação, empenho em aprender e vontade de ajudar, você será aprovado!',
            color: 'from-purple-500 to-violet-600'
        }
    ];

    return (
        <main className="min-h-screen bg-[#0d0d12]">
            <PageHeader
                title="Faça Parte da"
                highlight="Equipe LXPES"
                subtitle="Estamos buscando novos talentos para integrar nossa Staff em 2026!"
                icon="fas fa-users"
            />

            <section className="relative py-20 px-4 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-6">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Vagas Abertas
                        </span>
                        <h2 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
                            🏆 Vantagens de Ser <span className="text-purple-400">Staff</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Confira os benefícios exclusivos que você terá ao fazer parte da nossa equipe
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        {benefits.map((benefit, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/[0.07] transition-all duration-300"
                            >
                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                    <i className={`${benefit.icon} text-2xl text-white`}></i>
                                </div>
                                <h3 className="font-orbitron font-bold text-xl text-white mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-r from-purple-900/30 via-purple-600/20 to-purple-900/30 border border-purple-500/30 text-center overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-10"></div>

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-600/20 border border-purple-500/30 mb-6">
                                <i className="fas fa-rocket text-4xl text-purple-400 animate-bounce"></i>
                            </div>

                            <h2 className="font-orbitron font-black text-3xl md:text-4xl text-white mb-4">
                                🚀 Quer Entrar Para o Time?
                            </h2>

                            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                                Faça sua inscrição agora mesmo! Lembre-se: <span className="text-purple-400 font-semibold">não precisa ter experiência</span>,
                                vontade de ajudar é suficiente.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a
                                    href={formLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-purple-600 text-white font-orbitron font-bold text-lg hover:bg-purple-500 hover:shadow-[0_0_50px_rgba(160,32,240,0.6)] transition-all duration-300 hover:-translate-y-1"
                                >
                                    <i className="fas fa-file-alt text-xl group-hover:scale-110 transition-transform"></i>
                                    Preencher Formulário
                                    <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                </a>

                                <a
                                    href={config.discord.invite}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border-2 border-[#5865F2]/50 text-white font-bold hover:bg-[#5865F2]/20 hover:border-[#5865F2] transition-all duration-300"
                                >
                                    <i className="fab fa-discord text-xl text-[#5865F2]"></i>
                                    Entrar no Discord
                                </a>
                            </div>
                        </div>

                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl"></div>
                    </div>

                    <div className="mt-16 p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-lightbulb text-xl text-amber-400"></i>
                            </div>
                            <div>
                                <h4 className="font-orbitron font-bold text-white mb-2">Dica Importante</h4>
                                <p className="text-gray-300">
                                    Para participar do processo seletivo, é necessário estar no nosso servidor do Discord.
                                    Se ainda não entrou, <a href={config.discord.invite} target="_blank" className="text-purple-400 hover:text-purple-300 underline">clique aqui</a> para acessar!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 px-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h3 className="font-orbitron font-bold text-2xl text-white mb-4">
                        Faça Parte da História do LXPES 2026! 💜
                    </h3>
                    <p className="text-gray-400 mb-8">
                        Junte-se a centenas de membros que já fazem parte dessa comunidade incrível
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <i className="fas fa-arrow-left"></i>
                        Voltar para a Home
                    </Link>
                </div>
            </section>
        </main>
    );
}
