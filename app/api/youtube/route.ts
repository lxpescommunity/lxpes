import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const videoId = request.nextUrl.searchParams.get('videoId');

    if (!videoId) {
        return NextResponse.json({ error: 'Video ID required' }, { status: 400 });
    }

    try {
        // Try YouTube oEmbed first (no API key needed)
        const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);

        if (!oembedRes.ok) {
            return NextResponse.json({ error: 'Video not found' }, { status: 404 });
        }

        const oembedData = await oembedRes.json();

        // If we have a YouTube API key, try to get more details
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

        let duration = '';
        let viewCount = '';
        let description = '';

        if (YOUTUBE_API_KEY) {
            try {
                const apiRes = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${YOUTUBE_API_KEY}`
                );

                if (apiRes.ok) {
                    const apiData = await apiRes.json();
                    if (apiData.items && apiData.items.length > 0) {
                        const video = apiData.items[0];

                        // Parse duration from ISO 8601 format (PT1H2M10S)
                        const isoDuration = video.contentDetails?.duration || '';
                        duration = formatDuration(isoDuration);

                        // Format view count
                        const views = parseInt(video.statistics?.viewCount || '0');
                        viewCount = formatViews(views);

                        // Get description (truncated)
                        description = video.snippet?.description?.substring(0, 200) || '';
                    }
                }
            } catch (e) {
                console.error('YouTube API error:', e);
            }
        }

        return NextResponse.json({
            title: oembedData.title,
            author: oembedData.author_name,
            thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            duration,
            views: viewCount,
            description
        });

    } catch (error) {
        console.error('Error fetching YouTube data:', error);
        return NextResponse.json({ error: 'Failed to fetch video data' }, { status: 500 });
    }
}

function formatDuration(iso8601: string): string {
    const match = iso8601.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return '';

    const hours = parseInt(match[1] || '0');
    const minutes = parseInt(match[2] || '0');
    const seconds = parseInt(match[3] || '0');

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatViews(views: number): string {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1).replace('.0', '') + 'M';
    }
    if (views >= 1000) {
        return (views / 1000).toFixed(1).replace('.0', '') + 'K';
    }
    return views.toString();
}
