// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';
// import Channel from '@/app/models/Channel';

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ userId: string }> }
// ) {
//   try {
//     await connectToDatabase();

//     const { userId } = await params;

//     const channels = await Channel.find({ ownerId: userId });

//     return NextResponse.json({
//       success: true,
//       data: channels,
//     });
//   } catch (error) {
//     console.error('Failed to fetch user channels:', error);

//     return NextResponse.json(
//       { error: 'Failed to fetch user channels' },
//       { status: 500 }
//     );
//   }
// }

// app/api/channels/user/[userId]/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Channel from '@/app/models/Channel';
import { authenticate } from '@/app/middleware/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
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

    const { userId } = await params;

    // Verify the user is requesting their own channels
    if (userId !== auth.user.userId) {
      return NextResponse.json(
        { error: 'You can only view your own channels' },
        { status: 403 }
      );
    }

    await connectToDatabase();

    const channels = await Channel.find({ ownerId: userId });

    return NextResponse.json({
      success: true,
      data: channels,
    });
  } catch (error) {
    console.error('Failed to fetch user channels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user channels' },
      { status: 500 }
    );
  }
}