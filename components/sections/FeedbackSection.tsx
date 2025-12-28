'use client';
import { useRef } from 'react';
import { feedback_data } from '@/lib/constants';

const FeedbackCard = ({ feedback, index }: { feedback: any; index: number }) => (
    <div className="group flex-shrink-0 w-[350px] bg-gradient-to-br from-[#1a1a24] to-[#12121a] border border-white/5 rounded-2xl p-8 flex flex-col transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30 hover:shadow-[0_20px_60px_rgba(160,32,240,0.1)]">
        {/* Quote Icon */}
        <div className="mb-6">
            <i className="fas fa-quote-left text-3xl text-purple-500/30"></i>
        </div>

        {/* Quote */}
        <p className="text-gray-300 leading-relaxed mb-8 flex-grow text-[15px]">
            {feedback.quote}
        </p>

        {/* Author */}
        <div className="flex items-center gap-4 pt-6 border-t border-white/5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg">
                {feedback.author.charAt(0)}
            </div>
            <div className="flex flex-col">
                <span className="font-semibold text-white">
                    {feedback.author}
                </span>
                <span className="text-sm text-yellow-400 flex items-center gap-1">
                    {feedback.rating}
                </span>
            </div>
        </div>
    </div>
);

export default function FeedbackSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const duplicatedFeedback = [...feedback_data, ...feedback_data];

    return (
        <section id="depoimentos" className="py-24 bg-gradient-to-b from-[#0a0a0f] to-[#0d0d12] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

            <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 text-center mb-16 px-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6">
                    <i className="fas fa-comments"></i>
                    Depoimentos
                </span>
                <h2 className="font-orbitron font-black text-4xl md:text-5xl text-white mb-4">
                    O que dizem sobre a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">LXPES</span>
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto text-lg">
                    A opinião de quem já usa nosso patch
                </p>
            </div>

            {/* Scrolling Container */}
            <div
                ref={scrollRef}
                className="w-full overflow-hidden py-4 relative"
                style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
            >
                {/* Animated Track */}
                <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused] w-max">
                    {duplicatedFeedback.map((fb, index) => (
                        <FeedbackCard key={index} feedback={fb} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}