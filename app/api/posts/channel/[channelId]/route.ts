import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Post from '@/app/models/Post';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    const { channelId } = await params;

    await connectToDatabase();

    const posts = await Post.find({ channelId })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error('Failed to fetch channel posts:', error);

    return NextResponse.json(
      { error: 'Failed to fetch channel posts' },
      { status: 500 }
    );
  }
}