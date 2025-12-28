'use client';
import { useState, useMemo } from 'react';
import faqData from '@/data/faq-data.json';
import PageHeader from '@/components/ui/PageHeader';

// Extrair categorias únicas baseadas nos IDs
const getCategory = (id: string) => {
    if (id.includes('install') || id.includes('compatibility') || id.includes('option_file')) return 'Instalação';
    if (id.includes('free')) return 'Geral';
    if (id.includes('crash') || id.includes('error') || id.includes('dll') || id.includes('bug')) return 'Problemas';
    if (id.includes('dpfilelist')) return 'DpFileList';
    if (id.includes('download') || id.includes('drive') || id.includes('link') || id.includes('torrent')) return 'Downloads';
    return 'Geral';
};

export default function FAQPage() {
    const [input, setInput] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [searchMode, setSearchMode] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { text: 'Olá! Sou o Assistente LXPES. Digite sua dúvida e encontrarei a melhor resposta!', sender: 'ai' }
    ]);

    // Filtrar itens vazios e organizar
    const validFaqData = useMemo(() =>
        faqData.filter(item => item.question && item.answer && !item.id.includes('---')),
        []
    );

    // Categorias disponíveis
    const categories = useMemo(() => {
        const cats = new Set(validFaqData.map(item => getCategory(item.id)));
        return ['Todos', ...Array.from(cats)];
    }, [validFaqData]);

    // Filtrar por categoria e busca
    const filteredFaq = useMemo(() => {
        let result = validFaqData;

        if (activeCategory !== 'Todos') {
            result = result.filter(item => getCategory(item.id) === activeCategory);
        }

        if (input.trim()) {
            const searchLower = input.toLowerCase();
            result = result.filter(item =>
                item.question.toLowerCase().includes(searchLower) ||
                item.answer.toLowerCase().includes(searchLower) ||
                item.keywords.some(kw => kw.toLowerCase().includes(searchLower))
            );
        }

        return result;
    }, [validFaqData, activeCategory, input]);

    // Busca no chat
    const handleChatSearch = (question: string) => {
        if (!question.trim()) return;

        setChatMessages(prev => [...prev, { text: question, sender: 'user' }]);
        setInput('');

        let bestMatch = { answer: 'Desculpe, não encontrei uma resposta específica. Navegue pelas categorias abaixo ou pergunte no nosso Discord!', score: 0 };

        validFaqData.forEach(item => {
            let score = 0;
            const qLower = question.toLowerCase();

            if (item.question.toLowerCase() === qLower) score += 100;
            if (item.question.toLowerCase().includes(qLower)) score += 20;

            item.keywords.forEach(kw => {
                if (qLower.includes(kw.toLowerCase())) score += 5;
            });

            if (score > bestMatch.score) bestMatch = { answer: item.answer, score };
        });

        setTimeout(() => {
            setChatMessages(prev => [...prev, { text: bestMatch.answer, sender: 'ai' }]);
        }, 600);
    };

    return (
        <main className="min-h-screen bg-[#0d0d12]">
            <PageHeader
                title="Central de"
                highlight="FAQ"
                subtitle={`${validFaqData.length} perguntas e respostas para te ajudar`}
                icon="fas fa-question-circle"
            />

            {/* Mode Toggle */}
            <div className="relative z-20 max-w-6xl mx-auto px-4 mt-4 mb-8">
                <div className="flex justify-center gap-2 p-1.5 bg-[#1a1a24] rounded-full w-fit mx-auto border border-white/10 shadow-lg">
                    <button
                        onClick={() => setSearchMode(false)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${!searchMode ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <i className="fas fa-list mr-2"></i>Navegar
                    </button>
                    <button
                        onClick={() => setSearchMode(true)}
                        className={`px-6 py-2 rounded-full font-medium transition-all ${searchMode ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        <i className="fas fa-robot mr-2"></i>Chat IA
                    </button>
                </div>
            </div>

            {!searchMode ? (
                /* Browse Mode */
                <section className="max-w-6xl mx-auto px-4 pb-20">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="relative max-w-2xl mx-auto">
                            <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-500"></i>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Buscar pergunta..."
                                className="w-full bg-[#1a1a24] border border-white/10 rounded-full pl-14 pr-6 py-4 focus:border-purple-500 outline-none transition-colors"
                            />
                            {input && (
                                <button
                                    onClick={() => setInput('')}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-2 mb-10">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(160,32,240,0.4)]'
                                    : 'bg-white/5 text-gray-400 border border-white/10 hover:border-purple-500/50 hover:text-white'
                                    }`}
                            >
                                {cat}
                                {cat !== 'Todos' && (
                                    <span className="ml-2 px-2 py-0.5 bg-white/10 rounded-full text-xs">
                                        {validFaqData.filter(item => getCategory(item.id) === cat).length}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Results Count */}
                    <p className="text-center text-gray-500 mb-6">
                        Mostrando {filteredFaq.length} de {validFaqData.length} perguntas
                    </p>

                    {/* FAQ Accordion */}
                    <div className="space-y-3">
                        {filteredFaq.map((item) => (
                            <div
                                key={item.id}
                                className={`rounded-xl border transition-all duration-300 overflow-hidden ${expandedId === item.id
                                    ? 'border-purple-500/50 bg-purple-600/5'
                                    : 'border-white/10 bg-[#1a1a24] hover:border-white/20'
                                    }`}
                            >
                                <button
                                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                                    className="w-full flex items-center justify-between p-5 text-left"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategory(item.id) === 'Instalação' ? 'bg-blue-500/20 text-blue-400' :
                                            getCategory(item.id) === 'Problemas' ? 'bg-red-500/20 text-red-400' :
                                                getCategory(item.id) === 'DpFileList' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    getCategory(item.id) === 'Downloads' ? 'bg-green-500/20 text-green-400' :
                                                        'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {getCategory(item.id)}
                                        </span>
                                        <span className="text-white font-medium">{item.question}</span>
                                    </div>
                                    <i className={`fas fa-chevron-down text-purple-400 transition-transform ${expandedId === item.id ? 'rotate-180' : ''
                                        }`}></i>
                                </button>

                                {expandedId === item.id && (
                                    <div className="px-5 pb-5 pt-0">
                                        <div className="pl-4 border-l-2 border-purple-500/30">
                                            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {filteredFaq.length === 0 && (
                        <div className="text-center py-16">
                            <i className="fas fa-search text-4xl text-gray-600 mb-4"></i>
                            <p className="text-gray-400">Nenhuma pergunta encontrada.</p>
                            <button
                                onClick={() => { setInput(''); setActiveCategory('Todos'); }}
                                className="mt-4 text-purple-400 hover:text-purple-300"
                            >
                                Limpar filtros
                            </button>
                        </div>
                    )}
                </section>
            ) : (
                /* Chat Mode */
                <section className="max-w-4xl mx-auto px-4 pb-20">
                    <div className="bg-[#1a1a24] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                        {/* Chat Header */}
                        <div className="p-5 border-b border-white/10 bg-[#0d0d12] flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                                <i className="fas fa-robot text-2xl text-purple-400"></i>
                            </div>
                            <div>
                                <h2 className="font-orbitron font-bold text-lg">Assistente LXPES</h2>
                                <p className="text-sm text-gray-400">Especialista no patch • Online</p>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="h-[50vh] p-6 overflow-y-auto flex flex-col gap-4">
                            {chatMessages.map((m, i) => (
                                <div
                                    key={i}
                                    className={`max-w-[85%] p-4 rounded-2xl ${m.sender === 'user'
                                        ? 'self-end bg-gradient-to-br from-purple-600 to-purple-800 rounded-br-none'
                                        : 'self-start bg-[#0d0d12] border border-white/10 rounded-bl-none text-gray-300'
                                        }`}
                                >
                                    {m.text}
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleChatSearch(input); }}
                            className="p-5 bg-[#0d0d12] border-t border-white/10 flex gap-3"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-grow bg-[#1a1a24] border border-white/10 rounded-full px-6 py-3 focus:border-purple-500 outline-none"
                                placeholder="Digite sua dúvida..."
                            />
                            <button
                                type="submit"
                                className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-500 hover:scale-105 transition-all"
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>

                    {/* Quick Questions */}
                    <div className="mt-8">
                        <h3 className="text-center text-gray-400 mb-4">Perguntas rápidas:</h3>
                        <div className="flex flex-wrap justify-center gap-2">
                            {validFaqData.slice(0, 6).map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleChatSearch(item.question)}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-400 hover:border-purple-500/50 hover:text-white transition-all"
                                >
                                    {item.question.length > 40 ? item.question.substring(0, 40) + '...' : item.question}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </main>
    );
}