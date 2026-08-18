// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';
// import Post from '@/app/models/Post';

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const posts = await Post.find({}).sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, data: posts });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch posts' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     await connectToDatabase();
//     const post = await Post.create(body);
//     return NextResponse.json({ success: true, data: post }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to create post' },
//       { status: 500 }
//     );
//   }
// }


// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Post from '@/app/models/Post';
import Channel from '@/app/models/Channel';
import { authenticate } from '@/app/middleware/auth';

export async function GET(request: Request) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if ('error' in auth) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    await connectToDatabase();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if ('error' in auth) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    const body = await request.json();
    await connectToDatabase();

    // Validate required fields
    const requiredFields = ['id', 'channelId', 'content'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Verify the user is a member of the channel
    const channel = await Channel.findOne({ id: body.channelId });
    if (!channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    // Check if user is a member
    if (!channel.memberIds.includes(auth.user.userId)) {
      return NextResponse.json(
        { error: 'You must be a member of this channel to post' },
        { status: 403 }
      );
    }

    // Create post
    const postData = {
      ...body,
      authorId: auth.user.userId,
      likes: 0,
      likedBy: [],
      comments: 0,
      shares: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const post = await Post.create(postData);

    // Update channel's post count
    await Channel.findOneAndUpdate(
      { id: body.channelId },
      { $inc: { postCount: 1 } }
    );

    return NextResponse.json(
      { success: true, data: post },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create post:', error);
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    );
  }
}