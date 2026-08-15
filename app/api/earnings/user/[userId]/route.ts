import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Earnings from '@/app/models/Earnings';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    await connectToDatabase();
    const earnings = await Earnings.findOne({ userId: params.userId });
    if (!earnings) {
      return NextResponse.json(
        { error: 'Earnings not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: earnings });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch earnings' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await request.json();
    await connectToDatabase();
    const earnings = await Earnings.findOneAndUpdate(
      { userId: params.userId },
      body,
      { new: true, upsert: true }
    );
    return NextResponse.json({ success: true, data: earnings });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update earnings' },
      { status: 500 }
    );
  }
}