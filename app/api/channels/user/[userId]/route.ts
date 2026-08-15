import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Channel from '@/app/models/Channel';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();
    const channels = await Channel.find({ ownerId: params.userId });
    return NextResponse.json({ success: true, data: channels });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user channels' },
      { status: 500 }
    );
  }
}