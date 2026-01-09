import { NextResponse } from 'next/server';
import youtubedl from 'yt-dlp-exec';

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url || !url.includes('http')) {
      return NextResponse.json({ error: 'Please provide a valid social media link.' }, { status: 400 });
    }

    // Advanced options to mimic a real browser and avoid bot detection
    const options = {
      dumpSingleJson: true,
      noCheckCertificates: true,
      noWarnings: true,
      preferFreeFormats: true,
      addHeader: [
        'User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Accept-Language:en-US,en;q=0.9',
      ],
    };

    const output = await youtubedl(url, options);

    // Format the response for the frontend
    return NextResponse.json({
      title: output.title || 'Video Download',
      thumbnail: output.thumbnail || output.thumbnails?.[0]?.url,
      duration: output.duration_string || 'N/A',
      url: output.url, // Direct high-quality link
      formats: output.formats
        ?.filter(f => f.vcodec !== 'none' && f.ext === 'mp4') // Only MP4 with video
        .map(f => ({
          quality: f.format_note || f.resolution,
          downloadUrl: f.url,
          ext: f.ext
        })).reverse().slice(0, 3), // Return top 3 qualities
      source: output.extractor_key
    });

  } catch (error) {
    console.error('Extraction Error:', error);
    return NextResponse.json({ error: 'Video is private or platform is temporarily blocked.' }, { status: 500 });
  }
}
