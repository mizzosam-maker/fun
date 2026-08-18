import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Notification from '@/app/models/Notification';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    await connectToDatabase();

    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    console.error('Failed to fetch notifications:', error);

    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    await connectToDatabase();

    await Notification.updateMany(
      { userId },
      { isRead: true }
    );

    return NextResponse.json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    console.error('Failed to mark notifications as read:', error);

    return NextResponse.json(
      { error: 'Failed to mark notifications as read' },
      { status: 500 }
    );
  }
}