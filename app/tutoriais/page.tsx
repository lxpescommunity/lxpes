'use client';
import { useState, useEffect } from 'react';
import PageHeader from '@/components/ui/PageHeader';

interface Tutorial {
    id: number;
    title: string;
    description: string;
    youtubeId: string;
    category: string;
    duration: string;
    views: string;
    enabled: boolean;
}

export default function TutoriaisPage() {
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [categories, setCategories] = useState<string[]>(['Todos']);
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [selectedVideo, setSelectedVideo] = useState<Tutorial | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => {
                const enabledTutorials = data.tutorials?.filter((t: Tutorial) => t.enabled) || [];
                setTutorials(enabledTutorials);

                // Extrair categorias únicas
                const uniqueCategories = Array.from(new Set(enabledTutorials.map((t: Tutorial) => t.category))) as string[];
                const cats = ['Todos', ...uniqueCategories];
                setCategories(cats);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const filteredTutorials = activeCategory === 'Todos'
        ? tutorials
        : tutorials.filter(t => t.category === activeCategory);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0d0d12]">
                <PageHeader
                    title="Nossos"
                    highlight="Tutoriais"
                    description="Carregando..."
                />
                <div className="flex justify-center py-20">
                    <i className="fas fa-spinner fa-spin text-4xl text-purple-500"></i>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0d0d12]">
            <PageHeader
                title="Nossos"
                highlight="Tutoriais"
                description="Aprenda a instalar, configurar e resolver problemas do patch com nossos vídeos."
            />

            {/* Category Filters */}
            <section className="max-w-6xl mx-auto px-4 py-8">
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full font-medium transition-all ${activeCategory === cat
                                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Video Grid */}
            <section className="max-w-6xl mx-auto px-4 pb-20">
                {filteredTutorials.length === 0 ? (
                    <div className="text-center py-16">
                        <i className="fas fa-video-slash text-5xl text-gray-600 mb-4"></i>
                        <p className="text-gray-500">Nenhum tutorial encontrado nesta categoria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTutorials.map(tutorial => (
                            <div
                                key={tutorial.id}
                                onClick={() => setSelectedVideo(tutorial)}
                                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#1a1a24] border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-video bg-black">
                                    <img
                                        src={`https://img.youtube.com/vi/${tutorial.youtubeId}/maxresdefault.jpg`}
                                        alt={tutorial.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${tutorial.youtubeId}/hqdefault.jpg`;
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center">
                                            <i className="fas fa-play text-white text-xl ml-1"></i>
                                        </div>
                                    </div>
                                    <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded">
                                        {tutorial.duration}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="p-5">
                                    <span className="inline-block px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400 mb-3">
                                        {tutorial.category}
                                    </span>
                                    <h3 className="font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                                        {tutorial.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                                        {tutorial.description}
                                    </p>
                                    <div className="flex items-center text-gray-600 text-sm">
                                        <i className="fas fa-eye mr-1"></i>
                                        {tutorial.views} visualizações
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Video Modal */}
            {selectedVideo && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setSelectedVideo(null)}
                >
                    <div
                        className="bg-[#1a1a24] rounded-2xl overflow-hidden max-w-4xl w-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="aspect-video">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                                title={selectedVideo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="inline-block px-2 py-1 rounded text-xs bg-purple-500/20 text-purple-400 mb-2">
                                        {selectedVideo.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white mb-2">{selectedVideo.title}</h3>
                                    <p className="text-gray-400">{selectedVideo.description}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedVideo(null)}
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
