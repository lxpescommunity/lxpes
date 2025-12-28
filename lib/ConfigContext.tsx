'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SiteConfig {
    discord: { invite: string; inviteCode: string };
    download: { free: string; label: string };
    socials: { facebook: string; youtube: string; instagram: string };
    patch: { version: string; name: string };
}

const defaultConfig: SiteConfig = {
    discord: { invite: 'https://discord.gg/EeWXH5QRnB', inviteCode: 'EeWXH5QRnB' },
    download: { free: '#', label: 'Baixar Patch' },
    socials: { facebook: '', youtube: '', instagram: '' },
    patch: { version: 'v2.0', name: 'Patch LXPES' }
};

const ConfigContext = createContext<SiteConfig>(defaultConfig);

export function ConfigProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<SiteConfig>(defaultConfig);

    useEffect(() => {
        fetch('/api/config')
            .then(res => res.json())
            .then(data => setConfig(data))
            .catch(err => console.error('Failed to load config:', err));
    }, []);

    return (
        <ConfigContext.Provider value={config}>
            {children}
        </ConfigContext.Provider>
    );
}

export function useConfig() {
    return useContext(ConfigContext);
}
