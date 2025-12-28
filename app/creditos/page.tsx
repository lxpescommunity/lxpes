import PageHeader from '@/components/ui/PageHeader';

// Dados da equipe LXPES
const teamMembers = [
    {
        name: 'Fundador',
        role: 'Líder do Projeto',
        avatar: '👑',
        description: 'Criador e idealizador do patch LXPES',
        badge: 'FOUNDER',
        social: { discord: '#' }
    },
    {
        name: 'Dev Principal',
        role: 'Desenvolvedor',
        avatar: '💻',
        description: 'Responsável pelo desenvolvimento técnico',
        badge: 'DEV',
        social: { discord: '#' }
    },
    {
        name: 'Designer',
        role: 'Design Gráfico',
        avatar: '🎨',
        description: 'Criação de faces, kits e elementos visuais',
        badge: 'DESIGN',
        social: { discord: '#' }
    },
    {
        name: 'Suporte',
        role: 'Suporte Técnico',
        avatar: '🛠️',
        description: 'Atendimento e suporte à comunidade',
        badge: 'SUPPORT',
        social: { discord: '#' }
    },
];

const specialThanks = [
    'Comunidade LXPES',
    'Testadores Beta',
    'Colaboradores de Faces',
    'Toda a Comunidade',
];

export default function CreditosPage() {
    return (
        <main className="min-h-screen bg-[#0d0d12]">
            <PageHeader
                title="Nossa"
                highlight="Equipe"
                subtitle="Conheça as pessoas por trás do projeto que mantém o PES vivo."
                icon="fas fa-users"
            />

            {/* Team Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {teamMembers.map((member, idx) => (
                            <div
                                key={idx}
                                className="group relative p-6 rounded-2xl bg-gradient-to-br from-[#1a1a24] to-[#0d0d12] border border-white/10 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(160,32,240,0.15)]"
                            >
                                {/* Glow Effect */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:to-purple-600/10 transition-all duration-500" />

                                {/* Badge */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-purple-600 text-xs font-bold rounded-full tracking-wider">
                                    {member.badge}
                                </div>

                                {/* Avatar */}
                                <div className="relative mx-auto w-24 h-24 mb-4 flex items-center justify-center text-5xl rounded-full bg-gradient-to-br from-purple-600/20 to-purple-900/20 border-2 border-purple-500/30 group-hover:border-purple-400 group-hover:scale-110 transition-all duration-300">
                                    {member.avatar}
                                </div>

                                {/* Info */}
                                <div className="relative text-center">
                                    <h3 className="font-orbitron font-bold text-lg text-white mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-purple-400 text-sm font-medium mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        {member.description}
                                    </p>
                                </div>

                                {/* Social */}
                                <div className="relative mt-4 flex justify-center gap-3">
                                    <a
                                        href={member.social.discord}
                                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white hover:border-purple-500 transition-all"
                                    >
                                        <i className="fab fa-discord"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Special Thanks */}
            <section className="py-16 px-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="font-orbitron text-2xl md:text-3xl font-bold mb-4">
                        Agradecimentos <span className="text-purple-400">Especiais</span>
                    </h2>
                    <p className="text-gray-400 mb-10">
                        A todos que contribuem para manter esse projeto vivo!
                    </p>

                    <div className="flex flex-wrap justify-center gap-4">
                        {specialThanks.map((name, idx) => (
                            <span
                                key={idx}
                                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:border-purple-500/50 hover:text-purple-400 transition-all cursor-default"
                            >
                                <i className="fas fa-heart text-purple-500 mr-2"></i>
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join CTA */}
            <section className="py-20 px-4 text-center">
                <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-gradient-to-br from-purple-900/20 to-purple-600/10 border border-purple-500/20">
                    <i className="fas fa-handshake text-4xl text-purple-400 mb-4"></i>
                    <h3 className="font-orbitron text-2xl font-bold mb-3">
                        Quer fazer parte da equipe?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Estamos sempre em busca de talentos para expandir o projeto.
                    </p>
                    <a
                        href="https://discord.gg/lxpes"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(160,32,240,0.5)] transition-all"
                    >
                        <i className="fab fa-discord"></i>
                        Entre no Discord
                    </a>
                </div>
            </section>
        </main>
    );
}
