import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Channel from '@/app/models/Channel';

export async function GET() {
  try {
    await connectToDatabase();
    const channels = await Channel.find({});
    return NextResponse.json({ success: true, data: channels });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const channel = await Channel.create(body);
    return NextResponse.json({ success: true, data: channel }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create channel' },
      { status: 500 }
    );
  }
}