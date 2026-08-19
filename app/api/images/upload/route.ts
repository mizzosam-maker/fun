// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/app/lib/mongodb';
// import Image from '@/app/models/Image';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export async function POST(request: Request) {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file') as File;
//     const userId = formData.get('userId') as string;

//     if (!file || !userId) {
//       return NextResponse.json(
//         { error: 'Missing required fields: file and userId' },
//         { status: 400 }
//       );
//     }

//     // Convert file to buffer
//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // Upload to Cloudinary
//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader.upload_stream(
//         {
//           folder: 'fireupnow',
//           resource_type: 'image',
//         },
//         (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//       ).end(buffer);
//     });

//     const result = uploadResult as any;

//     await connectToDatabase();

//     // Save to database
//     const image = await Image.create({
//       userId,
//       cloudinaryUrl: result.secure_url,
//       cloudinaryPublicId: result.public_id,
//     });

//     return NextResponse.json({
//       success: true,
//       image: {
//         id: image._id,
//         url: image.cloudinaryUrl,
//         createdAt: image.createdAt,
//       },
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     return NextResponse.json(
//       { error: 'Failed to upload image' },
//       { status: 500 }
//     );
//   }
// }

// app/api/images/upload/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import Image from '@/app/models/Image';
import { v2 as cloudinary } from 'cloudinary';
import { authenticate } from '@/app/middleware/auth';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    // Authenticate user
    const auth = await authenticate(request);
    if ('error' in auth) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = auth.user.userId; // Get userId from authenticated user

    if (!file) {
      return NextResponse.json(
        { error: 'Missing required field: file' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, GIF, and WEBP are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary with proper options
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'channelos/posts',
          resource_type: 'image',
          transformation: [
            { quality: 'auto:good' },
            { fetch_format: 'auto' }
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const result = uploadResult as any;

    await connectToDatabase();

    // Save to database with string userId
    const image = await Image.create({
      userId: userId, // Now this will work with string IDs
      cloudinaryUrl: result.secure_url,
      cloudinaryPublicId: result.public_id,
    });

    return NextResponse.json({
      success: true,
      image: {
        id: image._id,
        url: image.cloudinaryUrl,
        publicId: image.cloudinaryPublicId,
        createdAt: image.createdAt,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image: ' + (error as Error).message },
      { status: 500 }
    );
  }
}