'use client';
import { useState, useEffect } from 'react';

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

interface SiteConfig {
    discord: { invite: string; inviteCode: string };
    download: { free: string; label: string };
    socials: { facebook: string; youtube: string; instagram: string };
    patch: { version: string; name: string };
    tutorials: Tutorial[];
}

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [config, setConfig] = useState<SiteConfig | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [activeTab, setActiveTab] = useState('links');

    // Carregar configurações
    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error(err));
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password) {
            setIsLoggedIn(true);
        }
    };

    const handleSave = async () => {
        if (!config) return;
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/config', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, config })
            });

            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' });
            } else {
                setMessage({ type: 'error', text: data.error || 'Erro ao salvar' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Erro de conexão' });
        }

        setLoading(false);
    };

    const updateConfig = (path: string, value: any) => {
        if (!config) return;
        const keys = path.split('.');
        const newConfig = { ...config };
        let obj: any = newConfig;
        for (let i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]];
        }
        obj[keys[keys.length - 1]] = value;
        setConfig(newConfig);
    };

    const updateTutorial = (id: number, field: string, value: any) => {
        if (!config) return;
        const newTutorials = config.tutorials.map(t =>
            t.id === id ? { ...t, [field]: value } : t
        );
        setConfig({ ...config, tutorials: newTutorials });
    };

    const addTutorial = () => {
        if (!config) return;
        const newId = Math.max(...config.tutorials.map(t => t.id)) + 1;
        const newTutorial: Tutorial = {
            id: newId,
            title: 'Novo Tutorial',
            description: 'Descrição do tutorial',
            youtubeId: '',
            category: 'Instalação',
            duration: '0:00',
            views: '0',
            enabled: true
        };
        setConfig({ ...config, tutorials: [...config.tutorials, newTutorial] });
    };

    const removeTutorial = (id: number) => {
        if (!config) return;
        setConfig({ ...config, tutorials: config.tutorials.filter(t => t.id !== id) });
    };

    const moveTutorial = (id: number, direction: 'up' | 'down') => {
        if (!config) return;
        const tutorials = [...config.tutorials];
        const index = tutorials.findIndex(t => t.id === id);
        if (index === -1) return;

        const newIndex = direction === 'up' ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= tutorials.length) return;

        [tutorials[index], tutorials[newIndex]] = [tutorials[newIndex], tutorials[index]];
        setConfig({ ...config, tutorials });
    };

    const fetchYouTubeData = async (tutorialId: number, youtubeId: string) => {
        if (!youtubeId || !config) return;

        try {
            // Using YouTube oEmbed API (no API key needed)
            const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${youtubeId}&format=json`);
            if (!res.ok) throw new Error('Video not found');

            const data = await res.json();

            // Update tutorial with fetched data
            const newTutorials = config.tutorials.map(t =>
                t.id === tutorialId ? {
                    ...t,
                    title: data.title || t.title,
                    youtubeId: youtubeId
                } : t
            );
            setConfig({ ...config, tutorials: newTutorials });
            setMessage({ type: 'success', text: `Dados do YouTube carregados: "${data.title}"` });
        } catch (error) {
            setMessage({ type: 'error', text: 'Não foi possível buscar dados do YouTube' });
        }
    };

    const extractYouTubeId = (input: string): string => {
        // Handle various YouTube URL formats
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /^([a-zA-Z0-9_-]{11})$/
        ];
        for (const pattern of patterns) {
            const match = input.match(pattern);
            if (match) return match[1];
        }
        return input;
    };

    // Login Screen
    if (!isLoggedIn) {
        return (
            <main className="min-h-screen bg-[#0d0d12] flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-lock text-white text-2xl"></i>
                        </div>
                        <h1 className="font-orbitron font-bold text-2xl text-white">Painel Admin</h1>
                        <p className="text-gray-500 mt-2">LXPES Community</p>
                    </div>

                    <form onSubmit={handleLogin} className="bg-[#1a1a24] rounded-2xl border border-white/10 p-8">
                        <div className="mb-6">
                            <label className="block text-gray-400 text-sm mb-2">Senha de Acesso</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none transition-colors"
                                placeholder="Digite a senha..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-purple-600 text-white font-bold hover:bg-purple-500 transition-colors"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    if (!config) {
        return (
            <main className="min-h-screen bg-[#0d0d12] flex items-center justify-center">
                <div className="text-white">Carregando...</div>
            </main>
        );
    }

    // Admin Panel
    return (
        <main className="min-h-screen bg-[#0d0d12] p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                            <i className="fas fa-cog text-white text-xl"></i>
                        </div>
                        <div>
                            <h1 className="font-orbitron font-bold text-2xl text-white">Painel Admin</h1>
                            <p className="text-gray-500 text-sm">Gerenciar configurações do site</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsLoggedIn(false)}
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-red-500/50 transition-all"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>Sair
                    </button>
                </div>

                {/* Message */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl border ${message.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
                        <i className={`fas ${message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2`}></i>
                        {message.text}
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {[
                        { id: 'links', label: 'Links', icon: 'fa-link' },
                        { id: 'socials', label: 'Redes Sociais', icon: 'fa-share-alt' },
                        { id: 'tutorials', label: 'Tutoriais', icon: 'fa-play-circle' },
                        { id: 'patch', label: 'Patch', icon: 'fa-box' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-5 py-3 rounded-xl font-medium transition-all ${activeTab === tab.id
                                ? 'bg-purple-600 text-white'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                }`}
                        >
                            <i className={`fas ${tab.icon} mr-2`}></i>{tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-[#1a1a24] rounded-2xl border border-white/10 p-8">
                    {/* Links Tab */}
                    {activeTab === 'links' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6">
                                <i className="fas fa-link text-purple-500 mr-3"></i>Links Principais
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Link Discord (Convite)</label>
                                    <input
                                        type="text"
                                        value={config.discord.invite}
                                        onChange={(e) => updateConfig('discord.invite', e.target.value)}
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                        placeholder="https://discord.gg/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Código do Convite (para API)</label>
                                    <input
                                        type="text"
                                        value={config.discord.inviteCode}
                                        onChange={(e) => updateConfig('discord.inviteCode', e.target.value)}
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                        placeholder="EeWXH5QRnB"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Link de Download</label>
                                    <input
                                        type="text"
                                        value={config.download.free}
                                        onChange={(e) => updateConfig('download.free', e.target.value)}
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Texto do Botão Download</label>
                                    <input
                                        type="text"
                                        value={config.download.label}
                                        onChange={(e) => updateConfig('download.label', e.target.value)}
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                        placeholder="Baixar Patch"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Socials Tab */}
                    {activeTab === 'socials' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6">
                                <i className="fas fa-share-alt text-purple-500 mr-3"></i>Redes Sociais
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-[#0d0d12] rounded-xl border border-white/5">
                                    <div className="w-12 h-12 rounded-xl bg-[#1877F2]/20 flex items-center justify-center">
                                        <i className="fab fa-facebook text-[#1877F2] text-xl"></i>
                                    </div>
                                    <input
                                        type="text"
                                        value={config.socials.facebook}
                                        onChange={(e) => updateConfig('socials.facebook', e.target.value)}
                                        className="flex-1 bg-transparent border-none text-white focus:outline-none"
                                        placeholder="https://facebook.com/..."
                                    />
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-[#0d0d12] rounded-xl border border-white/5">
                                    <div className="w-12 h-12 rounded-xl bg-[#FF0000]/20 flex items-center justify-center">
                                        <i className="fab fa-youtube text-[#FF0000] text-xl"></i>
                                    </div>
                                    <input
                                        type="text"
                                        value={config.socials.youtube}
                                        onChange={(e) => updateConfig('socials.youtube', e.target.value)}
                                        className="flex-1 bg-transparent border-none text-white focus:outline-none"
                                        placeholder="https://youtube.com/..."
                                    />
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-[#0d0d12] rounded-xl border border-white/5">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#833AB4]/20 via-[#FD1D1D]/20 to-[#F77737]/20 flex items-center justify-center">
                                        <i className="fab fa-instagram text-pink-500 text-xl"></i>
                                    </div>
                                    <input
                                        type="text"
                                        value={config.socials.instagram}
                                        onChange={(e) => updateConfig('socials.instagram', e.target.value)}
                                        className="flex-1 bg-transparent border-none text-white focus:outline-none"
                                        placeholder="https://instagram.com/..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tutorials Tab */}
                    {activeTab === 'tutorials' && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-white">
                                    <i className="fas fa-play-circle text-purple-500 mr-3"></i>Tutoriais ({config.tutorials.length})
                                </h2>
                                <button
                                    onClick={addTutorial}
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
                                >
                                    <i className="fas fa-plus mr-2"></i>Adicionar
                                </button>
                            </div>

                            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl mb-4">
                                <div className="flex items-start gap-3">
                                    <i className="fas fa-lightbulb text-blue-400 mt-0.5"></i>
                                    <div className="text-sm text-blue-300">
                                        <strong>Dica:</strong> Cole o link do YouTube ou ID do vídeo e clique em "Buscar" para preencher o título automaticamente.
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {config.tutorials.map((tutorial, index) => (
                                    <div key={tutorial.id} className="p-5 bg-[#0d0d12] rounded-xl border border-white/5 hover:border-purple-500/20 transition-colors">
                                        <div className="flex items-start gap-4">
                                            {/* Thumbnail Preview */}
                                            <div className="flex-shrink-0">
                                                {tutorial.youtubeId ? (
                                                    <img
                                                        src={`https://img.youtube.com/vi/${tutorial.youtubeId}/mqdefault.jpg`}
                                                        alt="Thumbnail"
                                                        className="w-32 h-20 object-cover rounded-lg border border-white/10"
                                                    />
                                                ) : (
                                                    <div className="w-32 h-20 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                                                        <i className="fas fa-video text-gray-600 text-2xl"></i>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-grow">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <label className="flex items-center gap-2 cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                checked={tutorial.enabled}
                                                                onChange={(e) => updateTutorial(tutorial.id, 'enabled', e.target.checked)}
                                                                className="w-5 h-5 rounded bg-white/10 border-white/20 text-purple-500 focus:ring-purple-500"
                                                            />
                                                            <span className={`text-sm font-medium ${tutorial.enabled ? 'text-green-400' : 'text-gray-500'}`}>
                                                                {tutorial.enabled ? 'Ativo' : 'Inativo'}
                                                            </span>
                                                        </label>
                                                        <span className="text-xs text-gray-600">#{index + 1}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {/* Reorder Buttons */}
                                                        <button
                                                            onClick={() => moveTutorial(tutorial.id, 'up')}
                                                            disabled={index === 0}
                                                            className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                            title="Mover para cima"
                                                        >
                                                            <i className="fas fa-chevron-up"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => moveTutorial(tutorial.id, 'down')}
                                                            disabled={index === config.tutorials.length - 1}
                                                            className="w-8 h-8 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                                                            title="Mover para baixo"
                                                        >
                                                            <i className="fas fa-chevron-down"></i>
                                                        </button>
                                                        <button
                                                            onClick={() => removeTutorial(tutorial.id)}
                                                            className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all"
                                                            title="Remover"
                                                        >
                                                            <i className="fas fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    {/* YouTube ID with Auto-fetch */}
                                                    <div className="md:col-span-2">
                                                        <label className="block text-gray-500 text-xs mb-1">Link ou ID do YouTube</label>
                                                        <div className="flex gap-2">
                                                            <input
                                                                type="text"
                                                                value={tutorial.youtubeId}
                                                                onChange={(e) => {
                                                                    const id = extractYouTubeId(e.target.value);
                                                                    updateTutorial(tutorial.id, 'youtubeId', id);
                                                                }}
                                                                className="flex-grow bg-[#1a1a24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none"
                                                                placeholder="Cole o link ou ID do vídeo"
                                                            />
                                                            <button
                                                                onClick={() => fetchYouTubeData(tutorial.id, tutorial.youtubeId)}
                                                                className="px-4 py-2 rounded-lg bg-purple-600 text-white text-sm font-medium hover:bg-purple-500 transition-colors flex items-center gap-2"
                                                            >
                                                                <i className="fas fa-magic"></i>
                                                                Buscar
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-gray-500 text-xs mb-1">Título</label>
                                                        <input
                                                            type="text"
                                                            value={tutorial.title}
                                                            onChange={(e) => updateTutorial(tutorial.id, 'title', e.target.value)}
                                                            className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none"
                                                        />
                                                    </div>

                                                    <div className="md:col-span-2">
                                                        <label className="block text-gray-500 text-xs mb-1">Descrição</label>
                                                        <textarea
                                                            value={tutorial.description}
                                                            onChange={(e) => updateTutorial(tutorial.id, 'description', e.target.value)}
                                                            className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none resize-none"
                                                            rows={2}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-gray-500 text-xs mb-1">Categoria</label>
                                                        <select
                                                            value={tutorial.category}
                                                            onChange={(e) => updateTutorial(tutorial.id, 'category', e.target.value)}
                                                            className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none"
                                                        >
                                                            <option value="Instalação">Instalação</option>
                                                            <option value="Personalização">Personalização</option>
                                                            <option value="Problemas">Problemas</option>
                                                            <option value="Downloads">Downloads</option>
                                                            <option value="Outros">Outros</option>
                                                        </select>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        <div className="flex-1">
                                                            <label className="block text-gray-500 text-xs mb-1">Duração</label>
                                                            <input
                                                                type="text"
                                                                value={tutorial.duration}
                                                                onChange={(e) => updateTutorial(tutorial.id, 'duration', e.target.value)}
                                                                className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none"
                                                                placeholder="10:35"
                                                            />
                                                        </div>
                                                        <div className="flex-1">
                                                            <label className="block text-gray-500 text-xs mb-1">Views</label>
                                                            <input
                                                                type="text"
                                                                value={tutorial.views}
                                                                onChange={(e) => updateTutorial(tutorial.id, 'views', e.target.value)}
                                                                className="w-full bg-[#1a1a24] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:border-purple-500 outline-none"
                                                                placeholder="15K"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {config.tutorials.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <i className="fas fa-video text-4xl mb-4 block text-gray-600"></i>
                                    <p>Nenhum tutorial adicionado</p>
                                    <button
                                        onClick={addTutorial}
                                        className="mt-4 text-purple-400 hover:text-purple-300"
                                    >
                                        + Adicionar primeiro tutorial
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Patch Tab */}
                    {activeTab === 'patch' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-white mb-6">
                                <i className="fas fa-box text-purple-500 mr-3"></i>Informações do Patch
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Nome do Patch</label>
                                    <input
                                        type="text"
                                        value={config.patch.name}
                                        onChange={(e) => updateConfig('patch.name', e.target.value)}
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                        placeholder="Patch LXPES"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Versão Atual</label>
                                    <input
                                        type="text"
                                        value={config.patch.version}
                                        onChange={(e) => updateConfig('patch.version', e.target.value)}
                                        className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3 text-white focus:border-purple-500 outline-none"
                                        placeholder="Ex: v2.0"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold hover:from-purple-500 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                    >
                        {loading ? (
                            <>
                                <i className="fas fa-spinner fa-spin"></i>
                                Salvando...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-save"></i>
                                Salvar Alterações
                            </>
                        )}
                    </button>
                </div>
            </div>
        </main>
    );
}
