import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const CONFIG_PATH = path.join(process.cwd(), 'data', 'site-config.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'lxpes2026';

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

        // Se estiver em produção (Vercel), salvar no GitHub
        if (process.env.content_token) { // Usaremos uma var 'content_token' para identificar
            const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
            const REPO_OWNER = 'lxpescommunity';
            const REPO_NAME = 'lxpes';
            const FILE_PATH = 'data/site-config.json';
            const BRANCH = 'main';

            if (!GITHUB_TOKEN) {
                return NextResponse.json({ error: 'GitHub Token não configurado na Vercel' }, { status: 500 });
            }

            // 1. Pegar o SHA atual do arquivo
            const getFileRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`, {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });

            if (!getFileRes.ok) {
                throw new Error('Falha ao buscar arquivo no GitHub');
            }

            const fileData = await getFileRes.json();
            const sha = fileData.sha;

            // 2. Atualizar o arquivo
            const contentEncoded = Buffer.from(JSON.stringify(config, null, 4)).toString('base64');

            const updateRes = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: 'chore: update site-config.json via Admin Panel',
                    content: contentEncoded,
                    sha: sha,
                    branch: BRANCH
                })
            });

            if (!updateRes.ok) {
                const errorText = await updateRes.text();
                throw new Error(`Falha ao salvar no GitHub: ${errorText}`);
            }

            return NextResponse.json({ success: true, message: 'Configurações salvas no GitHub! O site será atualizado em instantes.' });

        } else {
            // Desenvolvimento local: salvar no disco
            fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 4), 'utf-8');
            return NextResponse.json({ success: true, message: 'Configurações salvas localmente!' });
        }

    } catch (error) {
        console.error('Error saving config:', error);
        return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }
}
