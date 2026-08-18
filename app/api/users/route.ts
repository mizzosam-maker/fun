// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';
// import User from '@/app/models/User';

// export async function GET() {
//   try {
//     await connectToDatabase();
//     const users = await User.find({});
//     return NextResponse.json({ success: true, data: users });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch users' },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     await connectToDatabase();
//     const user = await User.create(body);
//     return NextResponse.json({ success: true, data: user }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to create user' },
//       { status: 500 }
//     );
//   }
// }

// app/api/users/route.ts (Updated)
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/User';
import { verifyToken } from '@/app/lib/jwt';

export async function GET(request: Request) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const users = await User.find({}).select('-password');
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Only allow admin or internal users to create users
    // For now, we'll keep it open but you should add admin check
    
    await connectToDatabase();
    const user = await User.create(body);
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({ success: true, data: userResponse }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}