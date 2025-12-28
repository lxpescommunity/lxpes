/**
 * Discord API utilities
 * Funções para integração com Discord (webhooks, bot, etc.)
 */

export interface DiscordEmbed {
    title?: string
    description?: string
    color?: number
    fields?: Array<{ name: string; value: string; inline?: boolean }>
}

export async function sendWebhook(webhookUrl: string, content: string, embeds?: DiscordEmbed[]) {
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, embeds }),
    })

    return response.ok
}

export async function fetchDiscordUser(userId: string, token: string) {
    const response = await fetch(`https://discord.com/api/v10/users/${userId}`, {
        headers: { Authorization: `Bot ${token}` },
    })

    return response.json()
}
