// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';
// import Channel from '@/app/models/Channel';

// export async function POST(
//   request: Request,
//   { params }: { params: Promise<{ channelId: string }> }
// ) {
//   try {
//     const { channelId } = await params;
//     const { userId, follow } = await request.json();

//     await connectToDatabase();

//     const channel = await Channel.findOne({ id: channelId });
//     if (!channel) {
//       return NextResponse.json(
//         { error: 'Channel not found' },
//         { status: 404 }
//       );
//     }

//     if (follow) {
//       // Follow the channel
//       if (!channel.memberIds.includes(userId)) {
//         channel.memberIds.push(userId);
//         channel.memberCount += 1;
//       }
//     } else {
//       // Unfollow the channel
//       channel.memberIds = channel.memberIds.filter((id: string) => id !== userId);
//       channel.memberCount = Math.max(0, channel.memberCount - 1);
//     }

//     await channel.save();

//     return NextResponse.json({
//       success: true,
//       message: follow ? 'Channel followed' : 'Channel unfollowed',
//       data: channel,
//     });
//   } catch (error) {
//     console.error('Failed to update follow status:', error);
//     return NextResponse.json(
//       { error: 'Failed to update follow status' },
//       { status: 500 }
//     );
//   }
// }

// app/api/channels/[channelId]/follow/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Channel from '@/app/models/Channel';
import { authenticate } from '@/app/middleware/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ channelId: string }> }
) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if ('error' in auth) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    const { channelId } = await params;
    const { follow } = await request.json();

    if (follow === undefined) {
      return NextResponse.json(
        { error: 'Follow status is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const channel = await Channel.findOne({ id: channelId });
    if (!channel) {
      return NextResponse.json(
        { error: 'Channel not found' },
        { status: 404 }
      );
    }

    const userId = auth.user.userId;

    if (follow) {
      // Follow the channel
      if (!channel.memberIds.includes(userId)) {
        channel.memberIds.push(userId);
        channel.memberCount += 1;
      }
    } else {
      // Unfollow the channel
      channel.memberIds = channel.memberIds.filter((id: string) => id !== userId);
      channel.memberCount = Math.max(0, channel.memberCount - 1);
    }

    await channel.save();

    return NextResponse.json({
      success: true,
      message: follow ? 'Channel followed' : 'Channel unfollowed',
      data: channel,
    });
  } catch (error) {
    console.error('Failed to update follow status:', error);
    return NextResponse.json(
      { error: 'Failed to update follow status' },
      { status: 500 }
    );
  }
}