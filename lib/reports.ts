import { readdir, stat } from 'fs/promises';
import path from 'path';

export interface ReportMetadata {
  title: string;
  company: string;
  ticker: string;
  period: string;
  date: string;
  icon: string;
  description?: string;
  highlights?: string[];
}

export interface Report {
  slug: string;
  filename: string;
  metadata: ReportMetadata;
  modifiedTime?: number;
}

export async function getReports(): Promise<Report[]> {
  try {
    const reportsDir = path.join(process.cwd(), 'content', 'reports');
    const files = await readdir(reportsDir);

    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const reports = await Promise.all(
      mdxFiles.map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, '');
        const filePath = path.join(reportsDir, filename);

        // Get file stats for modification time
        let modifiedTime = 0;
        try {
          const stats = await stat(filePath);
          modifiedTime = stats.mtimeMs;
        } catch (error) {
          console.error(`Error getting file stats for ${filename}:`, error);
        }

        // Dynamically import the MDX file to get metadata
        try {
          const module = await import(`@/content/reports/${filename}`);
          return {
            slug,
            filename,
            metadata: module.metadata || {},
            modifiedTime,
          };
        } catch (error) {
          console.error(`Error importing ${filename}:`, error);
          return {
            slug,
            filename,
            metadata: {
              title: filename,
              company: 'Unknown',
              ticker: '',
              period: '',
              date: '',
              icon: '📊',
            },
            modifiedTime,
          };
        }
      })
    );

    // Sort by modification time (newest first)
    reports.sort((a, b) => (b.modifiedTime || 0) - (a.modifiedTime || 0));

    return reports;
  } catch (error) {
    console.error('Error reading reports directory:', error);
    return [];
  }
}

export async function getReportSlugs(): Promise<string[]> {
  const reports = await getReports();
  return reports.map((report) => report.slug);
}
