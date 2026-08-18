// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';
// import Channel from '@/app/models/Channel';

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const channels = await Channel.find({});
//     return NextResponse.json({ success: true, data: channels });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch channels' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     await connectToDatabase();
//     const channel = await Channel.create(body);
//     return NextResponse.json({ success: true, data: channel }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to create channel' },
//       { status: 500 }
//     );
//   }
// }

// app/api/channels/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Channel from '@/app/models/Channel';
import { authenticate } from '@/app/middleware/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const channels = await Channel.find({});
    return NextResponse.json({ success: true, data: channels });
  } catch (error) {
    console.error('Failed to fetch channels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
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
    const requiredFields = ['id', 'name', 'handle', 'category', 'ownerId'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if channel handle already exists
    const existingChannel = await Channel.findOne({ handle: body.handle });
    if (existingChannel) {
      return NextResponse.json(
        { error: 'Channel handle already taken' },
        { status: 400 }
      );
    }

    // Verify the ownerId matches the authenticated user
    if (body.ownerId !== auth.user.userId) {
      return NextResponse.json(
        { error: 'You can only create channels for yourself' },
        { status: 403 }
      );
    }

    // Create channel with default values if not provided
    const channelData = {
      ...body,
      adminIds: body.adminIds || [body.ownerId],
      memberIds: body.memberIds || [body.ownerId],
      memberCount: body.memberCount || 1,
      postCount: 0,
      views: 0,
      engagement: 0,
      isPublic: body.isPublic !== undefined ? body.isPublic : true,
      createdAt: body.createdAt || new Date().toISOString(),
    };

    const channel = await Channel.create(channelData);

    return NextResponse.json(
      { success: true, data: channel },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to create channel:', error);
    return NextResponse.json(
      { error: 'Failed to create channel' },
      { status: 500 }
    );
  }
}