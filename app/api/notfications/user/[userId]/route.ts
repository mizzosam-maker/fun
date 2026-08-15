import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Notification from '@/app/models/Notification';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();
    const notifications = await Notification.find({ userId: params.userId })
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: notifications });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();
    await Notification.updateMany(
      { userId: params.userId },
      { isRead: true }
    );
    return NextResponse.json({ success: true, message: 'All notifications marked as read' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to mark notifications as read' },
      { status: 500 }
    );
  }
}