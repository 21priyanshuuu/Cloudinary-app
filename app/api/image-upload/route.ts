import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

interface CloudinaryUploadResult {
    public_id: string;
    [key: string]: unknown; 
}

export async function POST(request: NextRequest) {
    const { userId } = await auth();

    // Check if the user is authenticated
    if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        // Check if a file was provided
        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 });
        }

        // Validate that the file is an image
        const fileType = file.type.split('/')[0];
        if (fileType !== 'image') {
            return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload the image to Cloudinary
        const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: `next-cloudinary-uploads/${userId}` },  // Store images in a user-specific folder
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result as CloudinaryUploadResult);
                }
            );
            uploadStream.end(buffer);
        });

        // Return the uploaded image's public ID
        return NextResponse.json(
            {
                publicId: result.public_id
            },
            {
                status: 200
            }
        );

    } catch (error) {
        console.error("Upload image failed", error);
        return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
    }
}
