import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Post from '@/app/models/Post';

export async function GET(
  request: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    await connectToDatabase();
    const posts = await Post.find({ channelId: params.channelId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch channel posts' },
      { status: 500 }
    );
  }
}