import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { cookies } from 'next/headers';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session?.value) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Check if file is MDX
    if (!file.name.endsWith('.mdx')) {
      return NextResponse.json(
        { error: 'Only .mdx files are allowed. Please rename your .md file to .mdx' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create content/reports directory if it doesn't exist
    const reportsDir = path.join(process.cwd(), 'content', 'reports');
    await mkdir(reportsDir, { recursive: true });

    // Generate filename from original name (sanitize)
    const sanitizedName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9.-]/g, '-')
      .replace(/-+/g, '-');

    const filePath = path.join(reportsDir, sanitizedName);

    // Save the file
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      filename: sanitizedName,
      path: `/content/reports/${sanitizedName}`,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
