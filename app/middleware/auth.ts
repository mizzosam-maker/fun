// app/middleware/auth.ts
import { NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/jwt';

export async function authenticate(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { error: 'Unauthorized', status: 401 };
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  
  if (!payload) {
    return { error: 'Invalid token', status: 401 };
  }

  return { user: payload };
}