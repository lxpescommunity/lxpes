/**
 * YouTube API utilities
 * Funções para buscar estatísticas e informações de vídeos
 */

export interface YouTubeVideo {
    id: string
    title: string
    description: string
    thumbnail: string
    viewCount: number
    publishedAt: string
}

export async function fetchChannelVideos(channelId: string, apiKey: string): Promise<YouTubeVideo[]> {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?` +
        `part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`
    )

    const data = await response.json()

    return data.items?.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
    })) || []
}

export async function fetchVideoStats(videoId: string, apiKey: string) {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?` +
        `part=statistics&id=${videoId}&key=${apiKey}`
    )

    const data = await response.json()
    return data.items?.[0]?.statistics || null
}
