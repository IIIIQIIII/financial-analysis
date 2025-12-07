import { NextRequest, NextResponse } from 'next/server';
import { readdir, unlink, readFile } from 'fs/promises';
import { cookies } from 'next/headers';
import path from 'path';

// GET - List all reports (public, no auth needed)
export async function GET() {
  try {
    const reportsDir = path.join(process.cwd(), 'content', 'reports');

    try {
      const files = await readdir(reportsDir);
      const mdFiles = files.filter((file) => file.endsWith('.mdx'));

      // Read metadata from each file
      const reports = await Promise.all(
        mdFiles.map(async (filename) => {
          const filePath = path.join(reportsDir, filename);
          const content = await readFile(filePath, 'utf-8');

          // Extract frontmatter if exists
          const frontmatterMatch = content.match(/^export const metadata = ({[\s\S]*?})/m);
          let metadata = {};

          if (frontmatterMatch) {
            try {
              // Extract metadata object
              const metadataStr = frontmatterMatch[1];
              metadata = eval('(' + metadataStr + ')');
            } catch (e) {
              console.error('Error parsing metadata:', e);
            }
          }

          return {
            filename,
            slug: filename.replace(/\.mdx$/, ''),
            metadata,
            uploadedAt: new Date().toISOString(), // In production, use file stats
          };
        })
      );

      return NextResponse.json({ reports });
    } catch (error) {
      // Directory doesn't exist yet
      return NextResponse.json({ reports: [] });
    }
  } catch (error) {
    console.error('Error listing reports:', error);
    return NextResponse.json(
      { error: 'Failed to list reports' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a report (requires authentication)
export async function DELETE(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      );
    }

    // Security: only allow .mdx files
    if (!filename.endsWith('.mdx')) {
      return NextResponse.json(
        { error: 'Invalid file type' },
        { status: 400 }
      );
    }

    const filePath = path.join(
      process.cwd(),
      'content',
      'reports',
      filename
    );

    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: `${filename} deleted successfully`,
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
