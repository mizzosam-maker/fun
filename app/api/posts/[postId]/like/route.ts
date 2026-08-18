import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Post from '@/app/models/Post';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  try {
    const { postId } = await params;
    const { userId, like } = await request.json();

    await connectToDatabase();

    const post = await Post.findOne({ id: postId });
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Update likes (simplified - would need a likes array in production)
    post.likes = like ? post.likes + 1 : Math.max(0, post.likes - 1);
    await post.save();

    return NextResponse.json({
      success: true,
      message: like ? 'Post liked' : 'Post unliked',
      data: post,
    });
  } catch (error) {
    console.error('Failed to update like status:', error);
    return NextResponse.json(
      { error: 'Failed to update like status' },
      { status: 500 }
    );
  }
}