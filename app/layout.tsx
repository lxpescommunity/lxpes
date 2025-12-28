import type { Metadata } from 'next';
import LayoutWrapper from '@/components/layout/LayoutWrapper';
import { ConfigProvider } from '@/lib/ConfigContext';
import './globals.css';

export const metadata: Metadata = {
    title: 'LXPES Community - Patches para PES',
    description: 'A comunidade definitiva de Pro Evolution Soccer.',
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/img/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/img/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR" className="scroll-smooth">
            <head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
            </head>
            <body className="bg-[#0d0d12] text-[#f1f1f1] font-roboto select-none">
                <ConfigProvider>
                    <LayoutWrapper>{children}</LayoutWrapper>
                </ConfigProvider>
            </body>
        </html>
    );
}