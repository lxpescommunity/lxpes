import { Card, Badge } from '@/components/ui'

export default function PatchStore() {
    return (
        <section className="patch-store-section">
            <div className="container">
                <h2 className="section-title">Loja de Patches</h2>
                <div className="patches-grid">
                    {/* TODO: Renderizar patches dinamicamente */}
                    <Card title="Patch Anti-Cheat">
                        <Badge variant="success">Disponível</Badge>
                        <p>Proteção avançada para seu servidor.</p>
                    </Card>
                </div>
            </div>
        </section>
    )
}
