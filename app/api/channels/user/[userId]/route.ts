import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Channel from '@/app/models/Channel';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    await connectToDatabase();

    const { userId } = await params;

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