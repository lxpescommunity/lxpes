import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'site-config.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lxpes2025';

// GET - Retorna configurações (público)
export async function GET() {
    try {
        const configFile = fs.readFileSync(CONFIG_PATH, 'utf-8');
        const config = JSON.parse(configFile);
        return NextResponse.json(config);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
    }
}

// POST - Salva configurações (requer senha)
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { password, config } = body;

        // Verificar senha
        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
        }

        // Salvar configuração
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 4), 'utf-8');

        return NextResponse.json({ success: true, message: 'Configurações salvas!' });
    } catch (error) {
        console.error('Error saving config:', error);
        return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }
}
