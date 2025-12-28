'use client';

interface PageHeaderProps {
    title: string;
    highlight?: string;
    subtitle?: string;
    icon?: string;
}

export default function PageHeader({ title, highlight, subtitle, icon }: PageHeaderProps) {
    return (
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-30 z-0"
                style={{
                    backgroundImage: 'linear-gradient(rgba(160, 32, 240, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(160, 32, 240, 0.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {icon && (
                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-purple-600/20 border border-purple-500/30 backdrop-blur-sm">
                        <i className={`${icon} text-3xl text-purple-400`}></i>
                    </div>
                )}

                <h1 className="font-orbitron font-black text-4xl md:text-5xl lg:text-6xl mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
                        {title}
                    </span>
                    {highlight && (
                        <>
                            {' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 drop-shadow-[0_0_30px_rgba(160,32,240,0.5)]">
                                {highlight}
                            </span>
                        </>
                    )}
                </h1>

                {subtitle && (
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0d0d12] to-transparent" />
        </section>
    );
}
